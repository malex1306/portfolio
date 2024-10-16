'use client'

import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as THREE from 'three';

const StarBackground = (props: any) => {
    const ref: any = useRef();

    // Generate random points within a sphere using Three.js MathUtils
    const sphere = new Float32Array(5000);
    for (let i = 0; i < 5000; i += 3) {
        const point = new THREE.Vector3().randomDirection().multiplyScalar(1.2);
        sphere[i] = point.x;
        sphere[i + 1] = point.y;
        sphere[i + 2] = point.z;
    }

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points
                ref={ref}
                positions={sphere}
                stride={3}
                frustumCulled
                {...props}
            >
                <PointMaterial
                    transparent
                    color="#fff"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const StarCanvas = () => (
    <div className="w-full h-auto fixed inset-0 z-[20]">
        <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
                <StarBackground />
            </Suspense>
            <Preload all /> {/* Preload all textures and models */}
        </Canvas>
    </div>
);

export default StarCanvas;