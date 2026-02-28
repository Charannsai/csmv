"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "@/components/3d/Scene";

export default function SceneBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed top-0 bottom-0 right-0 left-0 z-[0] pointer-events-none">
            <div className="w-full h-full opacity-40">
                <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
                    <Scene />
                </Canvas>
            </div>
        </div>
    );
}
