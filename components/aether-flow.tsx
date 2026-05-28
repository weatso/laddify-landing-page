'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

function FluidMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = e.clientX / window.innerWidth;
      targetMouse.current.y = 1.0 - (e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uColor1: { value: new THREE.Color('#FF3CAC') },
      uColor2: { value: new THREE.Color('#2BD2FF') },
      uColor3: { value: new THREE.Color('#7B2FBE') },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.15;
      
      // Kunci 1: Kirim ukuran layar asli ke Shader untuk rasio aspek kursor
      materialRef.current.uniforms.uResolution.value.set(state.size.width, state.size.height);
      
      // Kunci 2: LERP (Interpolasi) dipercepat sedikit agar lebih responsif
      mouse.current.lerp(targetMouse.current, 0.1);
      materialRef.current.uniforms.uMouse.value.copy(mouse.current);
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
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    
    varying vec2 vUv;

    // Simplex Noise Math (Mesin Utama Fluida)
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
      vec2 uv = vUv;
      
      // Kunci 3: Menghitung jarak kursor dengan rasio aspek layar yang benar
      vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
      float mouseDist = distance(uv * aspect, uMouse * aspect);
      
      // Kunci 4: Radius distorsi diperbesar menjadi 0.4, kekuatan tarikan 0.2
      float warpStrength = smoothstep(0.4, 0.0, mouseDist);
      vec2 warpedUv = uv + (uv - uMouse) * warpStrength * 0.2;
      
      // Render cairan menggunakan koordinat yang sudah didistorsi
      float noise1 = snoise(vec3(warpedUv * 1.5, uTime));
      float noise2 = snoise(vec3(warpedUv * 2.5 + 3.0, uTime * 1.2));
      float noise3 = snoise(vec3(warpedUv * 1.8 + 7.0, uTime * 0.8));
      
      vec3 color = mix(uColor1, uColor2, smoothstep(-0.3, 0.6, noise1));
      color = mix(color, uColor3, smoothstep(0.1, 0.8, noise2) * 0.4);
      
      // Kunci 5: Menambahkan efek Glow putih yang sangat tegas tepat di bawah kursor
      float mouseGlow = smoothstep(0.15, 0.0, mouseDist) * 0.3;
      color += vec3(mouseGlow); // Injeksi cahaya murni
      
      // Blender dengan Light Lavender khas Laddify
      vec3 baseColor = vec3(0.941, 0.941, 0.969); // #F0F0F7
      color = mix(baseColor, color, 0.3 + 0.15 * noise3);
      
      // Vignette pelindung
      float vignette = 1.0 - length((uv - 0.5) * 1.2);
      vignette = smoothstep(0.0, 0.7, vignette);
      color = mix(baseColor * 0.95, color, vignette);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  return (
    <mesh ref={meshRef}>
      {/* Menggunakan plane dengan ukuran pasti 2x2 (menutupi seluruh OrthographicCamera) */}
      <planeGeometry args={[2, 2]} />
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
        orthographic // WAJIB untuk menyesuaikan ukuran plane dengan layar
        camera={{ position: [0, 0, 1], left: -1, right: 1, top: 1, bottom: -1, zoom: 1 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <FluidMesh />
      </Canvas>
    </div>
  );
}