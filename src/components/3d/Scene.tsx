"use client";

import { useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, PresentationControls } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

export function Scene() {
    const groupRef = useRef<THREE.Group>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    const matRef = useRef<any>(null);
    const innerMatRef = useRef<THREE.MeshStandardMaterial>(null);

    // Caching section heights to avoid layout thrashing
    const sectionHeights = useRef<number[]>([0, 0, 0, 0, 0]);

    useEffect(() => {
        const updateHeights = () => {
            const s1 = document.getElementById("section-hero");
            const s2 = document.getElementById("section-bento");
            const s3 = document.getElementById("section-hologram");
            const s4 = document.getElementById("section-vault");
            const s5 = document.getElementById("section-footer");
            if (s1 && s2 && s3 && s4 && s5) {
                sectionHeights.current = [
                    s1.offsetTop,
                    s2.offsetTop,
                    s3.offsetTop,
                    s4.offsetTop,
                    s5.offsetTop
                ];
            }
        };
        // Initial call + slight delay to ensure fonts/layout settled
        updateHeights();
        setTimeout(updateHeights, 100);
        setTimeout(updateHeights, 500);

        window.addEventListener('resize', updateHeights);
        return () => {
            window.removeEventListener('resize', updateHeights);
        };
    }, []);

    // Creates an authentic brilliant-cut diamond profile
    const diamondPoints = useMemo(() => [
        new THREE.Vector2(0, -1.2),    // Culet (bottom point)
        new THREE.Vector2(1.2, 0),     // Girdle (widest edge)
        new THREE.Vector2(0.7, 0.5),   // Table edge (top angled cut)
        new THREE.Vector2(0, 0.5)      // Table center (flat top)
    ], []);

    useFrame((state, delta) => {
        let scrollVH = window.scrollY / window.innerHeight;

        const wh = window.innerHeight;
        const scrollY = window.scrollY;
        const [, h2, h3, h4, h5] = sectionHeights.current;

        if (h2 > 0) {
            const r2_top = h2 - scrollY;
            const r3_top = h3 - scrollY;
            const r4_top = h4 - scrollY;
            const r5_top = h5 - scrollY;

            if (r2_top > 0) {
                scrollVH = 2.5 - (r2_top / wh);
            } else if (r3_top > wh) {
                scrollVH = 2.5;
            } else if (r3_top > 0) {
                scrollVH = 3.5 - (r3_top / wh);
            } else if (r4_top > wh) {
                scrollVH = 3.5;
            } else if (r4_top > 0) {
                scrollVH = 4.5 - (r4_top / wh);
            } else if (r5_top > wh) {
                scrollVH = 4.5;
            } else {
                scrollVH = 5.5 - (r5_top / wh);
            }
        }

        if (groupRef.current) {
            groupRef.current.rotation.y += 0.003;

            let targetX = 0;
            let targetY = 0;
            let targetScale = 1;
            let targetRotationZ = 0;

            const isMobile = window.innerWidth < 768;

            let targetRoughness = 0.05;
            let targetMetalness = 1.0;
            let targetInnerOpacity = 0.1;
            let targetOpacity = 1;
            const targetColor = new THREE.Color("#050505");
            const targetInnerColor = new THREE.Color("#FFFFFF");

            if (scrollVH < 0.3) {
                // Hero
                targetX = isMobile ? 0 : 3.5;
                targetY = isMobile ? 1.0 : 0;
                targetScale = isMobile ? 0.8 : 0.9;
                targetRotationZ = 0;
            } else if (scrollVH >= 0.3 && scrollVH < 0.45) {
                // Transition to Statement 1
                const t = (scrollVH - 0.3) / 0.15;
                targetX = isMobile ? 0 : THREE.MathUtils.lerp(3.5, -3.5, t);
                targetY = isMobile ? THREE.MathUtils.lerp(1.0, -2.5, t) : 0;
                targetScale = isMobile ? THREE.MathUtils.lerp(0.8, 0.5, t) : THREE.MathUtils.lerp(0.9, 0.7, t);
                targetRotationZ = THREE.MathUtils.lerp(0, Math.PI / 2, t);
            } else if (scrollVH >= 0.45 && scrollVH < 0.75) {
                // Statement 1 (Hold Left/Top)
                targetX = isMobile ? 0 : -3.5;
                targetY = isMobile ? -2.5 : 0;
                targetScale = isMobile ? 0.5 : 0.7;
                targetRotationZ = Math.PI / 2;
            } else if (scrollVH >= 0.75 && scrollVH < 0.9) {
                // Transition to Statement 2
                const t = (scrollVH - 0.75) / 0.15;
                targetX = isMobile ? 0 : THREE.MathUtils.lerp(-3.5, 3.5, t);
                targetY = isMobile ? THREE.MathUtils.lerp(-2.5, -2.5, t) : 0;
                targetScale = isMobile ? 0.5 : 0.7;
                targetRotationZ = THREE.MathUtils.lerp(Math.PI / 2, Math.PI, t);
            } else if (scrollVH >= 0.9 && scrollVH < 1.5) {
                // Statement 2 (Hold Right/Top)
                targetX = isMobile ? 0 : 3.5;
                targetY = isMobile ? -2.5 : 0;
                targetScale = isMobile ? 0.5 : 0.7;
                targetRotationZ = Math.PI;
            } else if (scrollVH >= 1.5 && scrollVH < 2.5) {
                // Bento Grid
                const t = Math.min((scrollVH - 1.5) / 0.5, 1);
                targetX = isMobile ? 0 : THREE.MathUtils.lerp(3.5, 0, t);
                targetY = isMobile ? THREE.MathUtils.lerp(-2.5, 2.5, t) : THREE.MathUtils.lerp(0, 3.5, t);
                targetScale = isMobile ? THREE.MathUtils.lerp(0.5, 0.3, t) : THREE.MathUtils.lerp(0.7, 0.4, t);
                targetRotationZ = THREE.MathUtils.lerp(Math.PI, Math.PI * 1.5, t);
            } else if (scrollVH >= 2.5 && scrollVH < 3.5) {
                // The Hologram Core (Solid Silver Mode)
                const t = Math.min((scrollVH - 2.5) / 0.5, 1);
                targetX = isMobile ? 0 : THREE.MathUtils.lerp(0, 3.5, t);
                targetY = isMobile ? THREE.MathUtils.lerp(2.5, -2, t) : THREE.MathUtils.lerp(3.5, 0, t);
                targetScale = isMobile ? THREE.MathUtils.lerp(0.3, 0.8, t) : THREE.MathUtils.lerp(0.4, 1.4, t);
                targetRotationZ = THREE.MathUtils.lerp(Math.PI * 1.5, Math.PI * 2, t);
            } else if (scrollVH >= 3.5 && scrollVH < 4.5) {
                // The Vault (Monolith Mode)
                const t = Math.min((scrollVH - 3.5) / 0.5, 1);
                targetX = isMobile ? 0 : THREE.MathUtils.lerp(3.5, -3.5, t);
                targetY = isMobile ? -2 : 0;
                targetScale = isMobile ? 0.8 : 1.4;
                targetRotationZ = THREE.MathUtils.lerp(Math.PI * 2, Math.PI * 2.5, t);
            } else if (scrollVH >= 4.5) {
                // Footer CTA (Massive Crystal)
                const t = Math.min((scrollVH - 4.5) / 0.5, 1);
                targetX = isMobile ? 0 : THREE.MathUtils.lerp(-3.5, 0, t);
                targetY = 0;
                targetScale = isMobile ? THREE.MathUtils.lerp(0.8, 1.5, t) : THREE.MathUtils.lerp(1.4, 2.8, t);
                targetRotationZ = THREE.MathUtils.lerp(Math.PI * 2.5, Math.PI * 3.5, t);
                targetInnerOpacity = 0.0;
            }

            // Apply transformations
            groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 5, delta);
            groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 5, delta);
            groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta));
            groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetRotationZ, 4, delta);

            // Apply Material Morphing
            if (matRef.current) {
                matRef.current.roughness = THREE.MathUtils.damp(matRef.current.roughness, targetRoughness, 4, delta);
                matRef.current.metalness = THREE.MathUtils.damp(matRef.current.metalness, targetMetalness, 4, delta);
                matRef.current.opacity = THREE.MathUtils.damp(matRef.current.opacity, targetOpacity, 4, delta);
                matRef.current.color.lerp(targetColor, delta * 4);
            }
            if (innerMatRef.current) {
                innerMatRef.current.opacity = THREE.MathUtils.damp(innerMatRef.current.opacity, targetInnerOpacity, 4, delta);
                innerMatRef.current.color.lerp(targetInnerColor, delta * 4);
            }
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
                            <meshStandardMaterial
                                ref={matRef}
                                metalness={1.0}
                                roughness={0.05}
                                color="#050505"
                                flatShading={true}
                                envMapIntensity={1.5}
                                transparent={true}
                            />
                        </mesh>
                        <mesh scale={0.95}>
                            <icosahedronGeometry args={[2, 1]} />
                            <meshStandardMaterial ref={innerMatRef} color="#FFFFFF" wireframe transparent opacity={0.1} depthWrite={false} />
                        </mesh>
                    </Float>
                </PresentationControls>
                <ContactShadows position={[0, -3.5, 0]} opacity={0.5} scale={15} blur={2.5} far={4.5} color="#FFFFFF" />
            </group>

            <Environment preset="city" />
        </>
    );
}
