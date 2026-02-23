"use client";

import { useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, PresentationControls, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export function Scene() {
    const groupRef = useRef<THREE.Group>(null);
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        // Calculate precise scroll progress (0 to 1)
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scroll = maxScroll > 0 ? scrollY / maxScroll : 0;

        if (groupRef.current) {
            // Base rotation for the diamond
            groupRef.current.rotation.y += 0.003;
            if (meshRef.current) {
                meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime / 4) * 0.2;
            }

            // --- CHOREOGRAPHY OF THE DIAMOND ALONG SCROLL ---
            // We interpolate the target position and scale based on scroll percentage.
            let targetX = 0;
            let targetY = 0;
            let targetScale = 1;
            let targetRotationZ = 0;

            if (scroll < 0.25) {
                // Section 1: Hero (Diamond on the Right)
                targetX = 2.5;
                targetY = 0;
                targetScale = 1.2;
            } else if (scroll >= 0.25 && scroll < 0.6) {
                // Section 2: Stacking Cards (Diamond Top Center, smaller, spinning)
                // Lerp transition
                const t = (scroll - 0.25) / 0.35;
                targetX = THREE.MathUtils.lerp(2.5, 0, t);
                targetY = THREE.MathUtils.lerp(0, 2, t);
                targetScale = THREE.MathUtils.lerp(1.2, 0.7, t);
                targetRotationZ = THREE.MathUtils.lerp(0, Math.PI, t);
            } else {
                // Section 3: Interactive Glow Cards - specifically landing in the 3rd Card area (Left Side)
                const t = Math.min((scroll - 0.6) / 0.2, 1);
                targetX = THREE.MathUtils.lerp(0, -2.5, t);
                targetY = THREE.MathUtils.lerp(2, -0.2, t);
                targetScale = THREE.MathUtils.lerp(0.7, 1.4, t);
                targetRotationZ = THREE.MathUtils.lerp(Math.PI, Math.PI * 2, t);
            }

            // Smoothly Damp towards the targets using framerate-independent easing
            groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 5, delta);
            groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 5, delta);
            groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 5, delta));
            groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetRotationZ, 5, delta);
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} color="#A855F7" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#38BDF8" />

            {/* Group to control global position/scale via scroll */}
            <group ref={groupRef}>
                <PresentationControls
                    global
                    rotation={[0, 0.3, 0]}
                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                >
                    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
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
                <ContactShadows position={[0, -3.5, 0]} opacity={0.5} scale={15} blur={2.5} far={4.5} color="#6366F1" />
            </group>

            <Environment preset="city" />
        </>
    );
}
