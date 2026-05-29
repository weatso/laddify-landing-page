'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, PresentationControls } from '@react-three/drei';
import { Suspense, useEffect, useState, useRef } from 'react';
import * as THREE from 'three';

function ChibiPooCryModel({ isMobile }: { isMobile: boolean }) {
  // Load the crying ChibiPoo model
  const { scene } = useGLTF('/3d/ChibiPoo_cry.glb', true);
  const groupRef = useRef<THREE.Group>(null);

  // Set position and scale based on mobile or desktop
  const scale = isMobile ? 2.5 : 3.8;
  const position: [number, number, number] = isMobile ? [0, -1.5, 0] : [0, -2, 0];

  useEffect(() => {
    if (groupRef.current) {
      // Start facing slightly away (-1) instead of fully backwards
      groupRef.current.rotation.y = -1;
    }
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slowly rotate to facing the camera (-2)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, -2, 1.5 * delta);
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} scale={scale} position={position} />
    </group>
  );
}

export default function ChibiPooCryScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full pointer-events-none absolute inset-0 z-0">
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
              <ChibiPooCryModel isMobile={isMobile} />
            </Float>
          </PresentationControls>
        </Canvas>
      </Suspense>
    </div>
  );
}
