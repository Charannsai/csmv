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

            if (scroll < 0.1) {
                // Hero: Centered, lower, and slightly smaller
                targetX = 0;
                targetY = -1.2;
                targetScale = 1;
                targetRotationZ = 0;
            } else if (scroll >= 0.1 && scroll < 0.2) {
                // Transition to Statement 1
                const t = (scroll - 0.1) / 0.1;
                targetX = THREE.MathUtils.lerp(0, 3.5, t);
                targetY = 0;
                targetScale = THREE.MathUtils.lerp(1.2, 0.9, t);
                targetRotationZ = THREE.MathUtils.lerp(0, Math.PI / 2, t);
            } else if (scroll >= 0.2 && scroll < 0.28) {
                // Steady at Statement 1 (Text is on left, diamond on right)
                targetX = 3.5;
                targetY = 0;
                targetScale = 0.9;
                targetRotationZ = Math.PI / 2;
            } else if (scroll >= 0.28 && scroll < 0.38) {
                // Transition to Statement 2 (Diamond sweeps perfectly across before next text is opaque)
                const t = (scroll - 0.28) / 0.1;
                targetX = THREE.MathUtils.lerp(3.5, -3.5, t);
                targetY = 0;
                targetScale = 0.9;
                targetRotationZ = THREE.MathUtils.lerp(Math.PI / 2, Math.PI, t);
            } else if (scroll >= 0.38 && scroll < 0.52) {
                // Steady at Statement 2 (Text is on right, diamond on left)
                targetX = -3.5;
                targetY = 0;
                targetScale = 0.9;
                targetRotationZ = Math.PI;
            } else {
                // Bento Box section: Diamond moves up and away as we scroll past it
                const t = Math.min((scroll - 0.52) / 0.15, 1);
                targetX = THREE.MathUtils.lerp(-3.5, 0, t);
                targetY = THREE.MathUtils.lerp(0, 5, t); // Fly upwards
                targetScale = THREE.MathUtils.lerp(0.9, 0.5, t);
                targetRotationZ = THREE.MathUtils.lerp(Math.PI, Math.PI * 1.5, t);
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
            <ambientLight intensity={0.6} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#FFFFFF" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#94A3B8" />

            {/* Group to control global position/scale via scroll */}
            <group ref={groupRef}>
                <PresentationControls
                    global
                    rotation={[0, 0.3, 0]}
                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                >
                    <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
                        <mesh ref={meshRef} castShadow receiveShadow>
                            <icosahedronGeometry args={[2, 0]} />
                            <MeshTransmissionMaterial
                                backside
                                samples={16}
                                resolution={1024}
                                transmission={1}
                                roughness={0.15}
                                thickness={0.5}
                                ior={1.3}
                                chromaticAberration={0.05}
                                anisotropy={0.5}
                                distortion={0.2}
                                distortionScale={0.5}
                                temporalDistortion={0.05}
                                color="#FFFFFF"
                            />
                        </mesh>
                        <mesh castShadow receiveShadow scale={0.9}>
                            <icosahedronGeometry args={[2, 1]} />
                            <meshStandardMaterial color="#FFFFFF" wireframe wireframeLinewidth={1} transparent opacity={0.1} />
                        </mesh>
                    </Float>
                </PresentationControls>
                <ContactShadows position={[0, -3.5, 0]} opacity={0.5} scale={15} blur={2.5} far={4.5} color="#6366F1" />
            </group>

            <Environment preset="city" />
        </>
    );
}
