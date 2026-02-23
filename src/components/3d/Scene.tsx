"use client";

import { useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, PresentationControls, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

export function Scene() {
    const groupRef = useRef<THREE.Group>(null);
    const meshRef = useRef<THREE.Mesh>(null);

    // Creates an authentic brilliant-cut diamond profile
    const diamondPoints = useMemo(() => [
        new THREE.Vector2(0, -1.2),    // Culet (bottom point)
        new THREE.Vector2(1.2, 0),     // Girdle (widest edge)
        new THREE.Vector2(0.7, 0.5),   // Table edge (top angled cut)
        new THREE.Vector2(0, 0.5)      // Table center (flat top)
    ], []);

    useFrame((state, delta) => {
        // Calculate precise scroll progress via window inner height
        const scrollVH = window.scrollY / window.innerHeight;

        if (groupRef.current) {
            // Base rotation for the diamond
            groupRef.current.rotation.y += 0.003;
            if (meshRef.current) {
                meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime / 4) * 0.2;
            }

            // --- CHOREOGRAPHY OF THE DIAMOND ALONG SCROLL ---
            let targetX = 0;
            let targetY = 0;
            let targetScale = 1;
            let targetRotationZ = 0;

            if (scrollVH < 0.5) {
                // Hero: Diamond cleanly on the right
                targetX = 3.5;
                targetY = 0;
                targetScale = 0.9;
                targetRotationZ = 0;
            } else if (scrollVH >= 0.5 && scrollVH < 1.0) {
                // Transition to Statement 1 (Text Right, Diamond Left)
                const t = (scrollVH - 0.5) / 0.5;
                targetX = THREE.MathUtils.lerp(3.5, -3.5, t);
                targetY = 0;
                targetScale = THREE.MathUtils.lerp(0.9, 0.7, t);
                targetRotationZ = THREE.MathUtils.lerp(0, Math.PI / 2, t);
            } else if (scrollVH >= 1.0 && scrollVH < 1.5) {
                // Steady at Statement 1: Diamond on LEFT
                targetX = -3.5;
                targetY = 0;
                targetScale = 0.7;
                targetRotationZ = Math.PI / 2;
            } else if (scrollVH >= 1.5 && scrollVH < 2.0) {
                // Transition to Statement 2 (Text Left, Diamond Right)
                const t = (scrollVH - 1.5) / 0.5;
                targetX = THREE.MathUtils.lerp(-3.5, 3.5, t);
                targetY = 0;
                targetScale = 0.7;
                targetRotationZ = THREE.MathUtils.lerp(Math.PI / 2, Math.PI, t);
            } else if (scrollVH >= 2.0 && scrollVH < 3.0) {
                // Steady at Statement 2: Diamond on RIGHT
                targetX = 3.5;
                targetY = 0;
                targetScale = 0.7;
                targetRotationZ = Math.PI;
            } else if (scrollVH >= 3.0 && scrollVH < 4.0) {
                // Bento Box Start: Fly up and shrink to overlook the grid like a guiding star
                const t = (scrollVH - 3.0) / 1.0;
                targetX = THREE.MathUtils.lerp(3.5, 0, t);
                targetY = THREE.MathUtils.lerp(0, 3.5, t);
                targetScale = THREE.MathUtils.lerp(0.7, 0.4, t);
                targetRotationZ = Math.PI;
            } else if (scrollVH >= 4.0 && scrollVH < 5.0) {
                // Steady over Bento Box
                targetX = 0;
                targetY = 3.5;
                targetScale = 0.4;
                targetRotationZ = Math.PI;
            } else if (scrollVH >= 5.0 && scrollVH < 5.5) {
                // Transition to Horizontal Panning Gallery: Fly down to intercept tracking cards
                const t = (scrollVH - 5.0) / 0.5;
                targetX = THREE.MathUtils.lerp(0, -3.2, t);
                targetY = THREE.MathUtils.lerp(3.5, 0, t);
                targetScale = THREE.MathUtils.lerp(0.4, 0.8, t);
                targetRotationZ = THREE.MathUtils.lerp(Math.PI, Math.PI * 1.5, t);
            } else if (scrollVH >= 5.5 && scrollVH < 8.0) {
                // Steady during Horizontal Panning: Sit confidently on the left as cards rush by
                targetX = -3.2;
                targetY = 0;
                targetScale = 0.8;
                targetRotationZ = Math.PI * 1.5;
            } else if (scrollVH >= 8.0 && scrollVH < 8.7) {
                // Transition to Accordion Area: Dive perfectly into the Right-Side Dark Dock Container
                const t = (scrollVH - 8.0) / 0.7;
                targetX = THREE.MathUtils.lerp(-3.2, 2.5, t);
                targetY = THREE.MathUtils.lerp(0, 0.5, t);
                targetScale = THREE.MathUtils.lerp(0.8, 0.55, t);
                targetRotationZ = THREE.MathUtils.lerp(Math.PI * 1.5, Math.PI * 2, t);
            } else if (scrollVH >= 8.7 && scrollVH < 9.5) {
                // Steady inside the Accordion Dock
                targetX = 2.5;
                targetY = 0.5;
                targetScale = 0.55;
                targetRotationZ = Math.PI * 2;
            } else if (scrollVH >= 9.5 && scrollVH < 10.2) {
                // Transition to Final Footer CTA: Expand massively as an end cap
                const t = (scrollVH - 9.5) / 0.7;
                targetX = THREE.MathUtils.lerp(2.5, 0, t);
                targetY = THREE.MathUtils.lerp(0.5, 0, t);
                targetScale = THREE.MathUtils.lerp(0.55, 2.5, t);
                targetRotationZ = THREE.MathUtils.lerp(Math.PI * 2, Math.PI * 2.5, t);
            } else {
                // Majestic massive steady state right behind "Start Building"
                targetX = 0;
                targetY = 0;
                targetScale = 2.5;
                targetRotationZ = Math.PI * 2.5;
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
                        <mesh ref={meshRef} castShadow receiveShadow scale={[0.8, 0.8, 0.8]}>
                            <latheGeometry
                                args={[diamondPoints, 8]}
                            />
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
                <ContactShadows position={[0, -3.5, 0]} opacity={0.5} scale={15} blur={2.5} far={4.5} color="#FFFFFF" />
            </group>

            <Environment preset="city" />
        </>
    );
}
