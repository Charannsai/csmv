"use client";

import { useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, PresentationControls, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export function Scene() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime / 4) * 0.2;
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#A855F7" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#38BDF8" />

            <PresentationControls
                global
                config={{ mass: 2, tension: 500 }}
                snap={{ mass: 4, tension: 1500 }}
                rotation={[0, 0.3, 0]}
                polar={[-Math.PI / 3, Math.PI / 3]}
                azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
                <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
                    <mesh ref={meshRef} castShadow receiveShadow>
                        <icosahedronGeometry args={[2, 0]} />
                        <MeshTransmissionMaterial
                            backside
                            samples={16}
                            resolution={1024}
                            transmission={1}
                            roughness={0.05}
                            thickness={0.5}
                            ior={1.5}
                            chromaticAberration={0.1}
                            anisotropy={1}
                            distortion={0.5}
                            distortionScale={1}
                            temporalDistortion={0.2}
                            color="#6366F1"
                        />
                    </mesh>
                    <mesh castShadow receiveShadow scale={0.9}>
                        <icosahedronGeometry args={[2, 1]} />
                        <meshStandardMaterial color="#0A0A0F" wireframe wireframeLinewidth={2} transparent opacity={0.3} />
                    </mesh>
                </Float>
            </PresentationControls>

            <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={20} blur={2} far={4.5} color="#6366F1" />
            <Environment preset="city" />
        </>
    );
}
