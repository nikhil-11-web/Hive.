import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
// 1. REMOVE 'Fog' FROM THIS IMPORT LINE
import { Float, Environment, Icosahedron } from '@react-three/drei'; 
import * as THREE from 'three';

// Individual floating geometric cell
const HiveCell = ({ position, rotation, scale, color }) => {
  const meshRef = useRef(null);

  // Subtle slow rotation for each cell
  useFrame((state, delta) => {
    if (meshRef.current) {
        meshRef.current.rotation.x += delta * 0.1;
        meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2} floatingRange={[0.1, 0.5]}>
      <Icosahedron ref={meshRef} args={[1, 0]} position={position} rotation={rotation} scale={scale}>
        {/* Premium Material: Shiny, metallic, dark with orange tint reflections */}
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.1}
          envMapIntensity={1.5}
        />
      </Icosahedron>
    </Float>
  );
};

const Hive3DBackground = ({ theme }) => {
  // Colors optimized for dark premium look
  const mainColor = "#FF4F18"; // Hive Orange
  const secondaryColor = "#1a1a1a"; // Dark Charcoal
  const bgColor = "#050505"; // Deep black background

  // Generate random positions for the background cells
  const cellData = Array.from({ length: 40 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 30, // Spread X
      (Math.random() - 0.5) * 30, // Spread Y
      (Math.random() - 0.5) * 15 - 5 // Spread Z (push back slightly)
    ],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
    scale: Math.random() * 0.8 + 0.4, // Varying sizes
    color: Math.random() > 0.8 ? mainColor : secondaryColor, // Mostly dark, some orange accents
  }));

  return (
    <div className="absolute inset-0 -z-10 bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        
        {/* 2. USE NATIVE FOG ELEMENT (No import needed) */}
        <fog attach="fog" args={[bgColor, 10, 35]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color={mainColor} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="white" />
        
        {/* Environment reflections for shiny material */}
        <Environment preset="city" />

        {/* Render the floating hive cells */}
        {cellData.map((data, i) => (
          <HiveCell key={i} {...data} />
        ))}
      </Canvas>
       {/* Subtle gradient overlay to ensure text readability */}
       <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50 pointer-events-none"></div>
    </div>
  );
};

export default Hive3DBackground;