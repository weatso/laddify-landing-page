'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

function FluidMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();

  // ─── ENGINE 1: 2D CANVAS TRAIL SYSTEM (PENGGANTI FBO YANG AMAN) ───
  const trailCanvas = useMemo(() => {
    if (typeof document !== 'undefined') {
      const canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      return canvas;
    }
    return null;
  }, []);

  const trailCtx = useMemo(() => trailCanvas?.getContext('2d'), [trailCanvas]);
  const trailTexture = useMemo(() => {
    if (trailCanvas) return new THREE.CanvasTexture(trailCanvas);
    return null;
  }, [trailCanvas]);

  const mouse = useRef({ x: -1000, y: -1000 });
  const lastMouse = useRef({ x: -1000, y: -1000 });
  const isDrawing = useRef(false);

  useEffect(() => {
    if (!trailCanvas) return;

    const handleResize = () => {
      trailCanvas.width = window.innerWidth;
      trailCanvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      isDrawing.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        mouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        isDrawing.current = true;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [trailCanvas]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uColor1: { value: new THREE.Color('#FF3CAC') }, // Pink
    uColor2: { value: new THREE.Color('#2BD2FF') }, // Cyan
    uColor3: { value: new THREE.Color('#7B2FBE') }, // Violet
    uTrailTexture: { value: trailTexture } // Mengirim kanvas 2D ke GPU WebGL
  }), [trailTexture]);

  useFrame((state) => {
    if (!trailCtx || !trailCanvas || !trailTexture) return;

    // 1. Evaporasi Jejak: Mengisi kanvas dengan warna hitam transparan (memudar pelan)
    trailCtx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    trailCtx.fillRect(0, 0, trailCanvas.width, trailCanvas.height);

    // 2. Menggambar Tinta Kursor
    if (isDrawing.current) {
      const dx = mouse.current.x - lastMouse.current.x;
      const dy = mouse.current.y - lastMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Hanya menggambar jika kursor bergeser, mencegah penumpukan di satu titik
      if (dist > 1.0) {
        const gradient = trailCtx.createRadialGradient(
          mouse.current.x, mouse.current.y, 0,
          mouse.current.x, mouse.current.y, 65 // Ukuran Kuas
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)'); // Inti terang
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)'); // Pinggiran halus

        trailCtx.fillStyle = gradient;
        trailCtx.beginPath();
        trailCtx.arc(mouse.current.x, mouse.current.y, 65, 0, Math.PI * 2);
        trailCtx.fill();

        lastMouse.current = { ...mouse.current };
      }
    }

    // 3. Memaksa GPU untuk memperbarui tekstur dari Kanvas 2D
    trailTexture.needsUpdate = true;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.15;
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec3 uColor1; 
    uniform vec3 uColor2; 
    uniform vec3 uColor3; 
    uniform sampler2D uTrailTexture;
    
    varying vec2 vUv;

    // --- MATH NOISE GLSL ---
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      // Koordinat Y HTML Canvas terbalik dibandingkan WebGL, kita harus membalikkannya
      vec2 texUv = vec2(vUv.x, 1.0 - vUv.y);
      
      // Membaca intensitas jejak dari tekstur Kanvas 2D (0.0 hingga 1.0)
      float trail = texture2D(uTrailTexture, texUv).r;

      float safeY = max(uResolution.y, 1.0);
      vec2 aspectUv = vUv * vec2(uResolution.x / safeY, 1.0);
      
      // ─── 1. TRAIL DISTORTION (VORTICITY) ───
      // Menggunakan jejak kursor untuk mendistorsi (memutar) ruang WebGL secara organik
      vec2 offset = vec2(
        snoise(vec3(aspectUv * 3.0, uTime * 1.5)),
        snoise(vec3(aspectUv * 3.0 + 10.0, uTime * 1.5))
      );
      vec2 warpedUv = aspectUv + offset * trail * 0.25; 
      
      // ─── 2. ENGINE CAIRAN BOLD ───
      float n1 = snoise(vec3(warpedUv * 1.2, uTime * 0.12));
      float n2 = snoise(vec3(warpedUv * 2.0 + n1, uTime * 0.15));
      float n3 = snoise(vec3(warpedUv * 1.5 - n2, uTime * 0.1));
      
      vec3 fluidColor = mix(uColor1, uColor2, smoothstep(-0.3, 0.3, n2));
      fluidColor = mix(fluidColor, uColor3, smoothstep(0.0, 0.5, n3));
      fluidColor = clamp(fluidColor * 1.25, 0.0, 1.0); 
      
      vec3 baseBg = vec3(0.941, 0.941, 0.969); // #F0F0F7
      float fluidAlpha = smoothstep(-0.6, 0.5, n1) * 0.85; 
      
      // ─── 3. TRAIL INJECTION & GLOW ───
      // Jejak kursor memaksa warna cairan menjadi 100% tebal dan menyala (Glow)
      fluidAlpha = clamp(fluidAlpha + trail * 1.5, 0.0, 1.0);
      fluidColor += uColor2 * trail * 0.7; // Pancaran Cyan di area kursor
      
      // Menambahkan inti cahaya putih murni tepat di bawah jarum kursor
      float core = smoothstep(0.6, 1.0, trail);
      fluidColor += vec3(1.0) * core * 0.8;
      
      vec3 finalColor = mix(baseBg, fluidColor, fluidAlpha);

      // Vignette
      float vignette = 1.0 - length((vUv - 0.5) * 1.3);
      finalColor = mix(baseBg * 0.85, finalColor, smoothstep(0.0, 1.0, vignette));
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function AetherFlow() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none', 
        background: '#F0F0F7',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <FluidMesh />
      </Canvas>
    </div>
  );
}