import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, PresentationControls } from '@react-three/drei';
import { useRef, Suspense, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
// Mapping setiap section ke model ekspresi + posisi target
const SECTION_CONFIG = [
  // 0: Home (Hero)
  { model: '/3d/ChibiPoo.glb', scale: 2.5, position: [-2.6, -1.5, 0], rotationY: -1.2 },
  // 1: Problems - Disesuaikan agar tidak terlalu intrusif, posisi di kanan atas konten
  { model: '/3d/ChibiPoo_shocked.glb', scale: 2.2, position: [-2.8, -0.7, 0], rotationY: -1.0 },
  // 2: Services
  { model: '/3d/ChibiPoo_cheeky.glb', scale: 2.5, position: [3.5, -0.3, 0.9], rotationY: -2.7 },
  // 3: Pricing
  { model: '/3d/ChibiPoo.glb', scale: 2.5, position: [-3.0, -0.8, -0.5], rotationY: -1.0 },
  // 4: Studio
  { model: '/3d/ChibiPoo.glb', scale: 1.0, position: [0, 0, -1.0], rotationY: 0 },
  // 5: Why Us
  { model: '/3d/ChibiPoo.glb', scale: 4.0, position: [5.0, -1.2, -1.0], rotationY: -2.6 },
  // 6: Contact
  { model: '/3d/ChibiPoo.glb', scale: 4.0, position: [-2.5, -2.0, -1.0], rotationY: -1.4 },
];

// Preload semua model agar transisi tidak lag
const MODEL_PATHS = [
  '/3d/ChibiPoo.glb',
  '/3d/ChibiPoo_cheeky.glb',
  '/3d/ChibiPoo_shocked.glb',
  '/3d/ChibiPoo_cry.glb',
];

function ChibiPooModel({ activeSlide, isMobile }: { activeSlide: number; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetGroupRef = useRef<THREE.Group>(null);
  const modelsRef = useRef<THREE.Group>(null);

  // State machine untuk transisi pop
  const transitionState = useRef<'idle' | 'popping-out' | 'popping-in'>('idle');
  const transitionProgress = useRef(0);
  const prevSlideRef = useRef(activeSlide);
  const currentModelIndex = useRef(activeSlide);
  const targetModelIndex = useRef(activeSlide);
  const transitionScale = useRef(1.0);

  // Deteksi perubahan slide
  useEffect(() => {
    if (activeSlide !== prevSlideRef.current) {
      const newConfig = SECTION_CONFIG[activeSlide] || SECTION_CONFIG[0];
      const oldConfig = SECTION_CONFIG[prevSlideRef.current] || SECTION_CONFIG[0];

      // Berikan putaran penuh dengan arah yang membelakangi layar (melewati -PI / bagian belakang)
      if (groupRef.current) {
        if (prevSlideRef.current === 1 && activeSlide === 2) {
          groupRef.current.rotation.y -= Math.PI * 2; // Berputar melewati belakang
        } else if (prevSlideRef.current === 2 && activeSlide === 1) {
          groupRef.current.rotation.y += Math.PI * 2; // Berputar melewati belakang arah sebaliknya
        }
      }

      // Jika model berubah, mulai transisi pop
      if (newConfig.model !== oldConfig.model) {
        transitionState.current = 'popping-out';
        transitionProgress.current = 0;
        targetModelIndex.current = activeSlide;
      } else {
        // Model sama, langsung pindah posisi
        currentModelIndex.current = activeSlide;
      }

      prevSlideRef.current = activeSlide;
    }
  }, [activeSlide]);

  useFrame((state, delta) => {
    if (!groupRef.current || !targetGroupRef.current) return;

    const config = SECTION_CONFIG[activeSlide] || SECTION_CONFIG[0];

    // === TRANSISI POP (Scale down -> Swap -> Scale up) ===
    const popSpeed = 5.0; // Kecepatan pop

    if (transitionState.current === 'popping-out') {
      transitionProgress.current += delta * popSpeed;
      transitionScale.current = Math.max(1.0 - transitionProgress.current, 0.0);

      // Di titik 0 scale, swap model
      if (transitionProgress.current >= 1.0) {
        currentModelIndex.current = targetModelIndex.current;
        transitionState.current = 'popping-in';
        transitionProgress.current = 0;
      }
    } else if (transitionState.current === 'popping-in') {
      transitionProgress.current += delta * popSpeed;
      
      // Overshoot scale up (bouncy effect)
      const t = Math.min(transitionProgress.current, 1.0);
      const c4 = (2 * Math.PI) / 3;
      const bouncyScale = t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
      
      transitionScale.current = bouncyScale;

      if (transitionProgress.current >= 1.0) {
        transitionState.current = 'idle';
        transitionScale.current = 1.0;
      }
    }

    // === POSISI & SKALA ===
    const targetGlobalScale = (isMobile && activeSlide > 0) ? 0 : 1;
    
    const finalScale = (isMobile && activeSlide === 0) ? 2.5 : config.scale;
    const finalX = (isMobile && activeSlide === 0) ? 0.2 : config.position[0];
    const finalY = (isMobile && activeSlide === 0) ? -1.0 : config.position[1];
    const finalZ = (isMobile && activeSlide === 0) ? -0.5 : config.position[2];
    const finalRotY = config.rotationY;

    // Lerp global scale (hide/show on mobile)
    targetGroupRef.current.scale.lerp(
      new THREE.Vector3(targetGlobalScale, targetGlobalScale, targetGlobalScale),
      4 * delta
    );

    // Lerp posisi dan skala base model
    const currentBaseScale = finalScale * transitionScale.current;
    groupRef.current.scale.lerp(
      new THREE.Vector3(currentBaseScale, currentBaseScale, currentBaseScale),
      6 * delta // Sedikit lebih cepat agar sinkron dengan pop
    );
    groupRef.current.position.lerp(
      new THREE.Vector3(finalX, finalY, finalZ),
      4 * delta
    );

    // Rotasi diperlambat agar putaran 360 derajat terlihat lebih jelas dan elegan
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      finalRotY,
      2 * delta
    );

    // === STUDIO SPECIAL EFFECT ===
    const isStudio = currentModelIndex.current === 4;
    const time = state.clock.getElapsedTime();

    if (modelsRef.current) {
      const activeConfig = SECTION_CONFIG[currentModelIndex.current] || SECTION_CONFIG[0];
      
      modelsRef.current.children.forEach((child, index) => {
        const modelChild = child as THREE.Group & { userData: { modelPath?: string } };
        
        if (isStudio) {
          modelChild.visible = true;
          
          // Spread them out into a chaotic "electron cloud" orbit that avoids the center
          const rx = isMobile ? 1.6 : 4.5;
          const ry = isMobile ? 2.8 : 2.0;
          
          // Setiap model punya karakteristik unik berdasarkan index-nya
          const orbitDir = index % 2 === 0 ? 1 : -1; // Sebagian searah jarum jam, sebagian berlawanan
          const orbitSpeed = 0.2 + (index * 0.05);   // Kecepatan orbit berbeda-beda tiap model
          const angle = (Math.PI / 2) * index + (time * orbitSpeed * orbitDir);
          
          // Wobble agar lintasannya tidak kaku (terasa organik/acak)
          const wobbleX = Math.cos(time * 0.5 + index * 3) * 0.8;
          const wobbleY = Math.sin(time * 0.6 + index * 2) * 0.8;
          
          // Target posisi, selalu berada di kisaran pinggiran (menjauhi tengah)
          const targetX = Math.cos(angle) * (rx + wobbleX);
          const targetY = Math.sin(angle) * (ry + wobbleY);
          const targetZ = Math.sin(time * 0.4 + index * 5) * 2.0; // Pergerakan maju-mundur di sumbu Z yang dalam
          
          modelChild.position.set(targetX, targetY, targetZ);
          
          let splitScale = isMobile ? 0.85 : 1.15;
          if (modelChild.userData.modelPath === '/3d/ChibiPoo_cry.glb') {
            splitScale = isMobile ? 0.65 : 0.9;
          }
          modelChild.scale.set(splitScale, splitScale, splitScale);
          
          const baseFacing = -1.8;
          const maxSwing = Math.PI / 4;
          modelChild.rotation.y = baseFacing + Math.sin(time * 0.6 + index) * maxSwing;
          modelChild.rotation.x = Math.sin(time * 0.2 + index) * 0.2;

        } else {
          // Di section normal, HANYA model aktif yang terlihat dan posisinya dipatenkan di tengah
          if (modelChild.userData.modelPath === activeConfig.model) {
            modelChild.visible = true;
            modelChild.position.set(0, 0, 0);
            modelChild.scale.set(1, 1, 1);
            modelChild.rotation.y = 0;
            modelChild.rotation.x = 0;
          } else {
            // Sembunyikan model lain sepenuhnya
            modelChild.visible = false;
          }
        }
      });
    }
  });

  return (
    <group ref={targetGroupRef} dispose={null}>
      <group ref={groupRef}>
        <group ref={modelsRef}>
          {MODEL_PATHS.map((path) => (
            <ModelSlot key={path} path={path} initialVisible={path === SECTION_CONFIG[activeSlide]?.model} />
          ))}
        </group>
      </group>
    </group>
  );
}

// Slot untuk setiap model — userData menyimpan path untuk identifikasi
function ModelSlot({ path, initialVisible }: { path: string; initialVisible: boolean }) {
  const { scene } = useGLTF(path, true);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.userData.modelPath = path;
      groupRef.current.visible = initialVisible;
    }
  }, [path, initialVisible]);

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  );
}

export default function ChibiPooScene({ activeSlide }: { activeSlide: number }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full pointer-events-none">
      <Suspense fallback={<div className="flex items-center justify-center w-full h-full text-[#6B7280]">Loading 3D Model...</div>}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
          <directionalLight position={[-10, 10, -10]} intensity={1} color="#FF3CAC" />
          <directionalLight position={[0, -10, 10]} intensity={1} color="#2BD2FF" />
          
          <PresentationControls
            global
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <Float
              speed={1} 
              rotationIntensity={0.3} 
              floatIntensity={0.5} 
              floatingRange={[-0.05, 0.05]} 
            >
              <ChibiPooModel activeSlide={activeSlide} isMobile={isMobile} />
            </Float>
          </PresentationControls>
        </Canvas>
      </Suspense>
    </div>
  );
}
