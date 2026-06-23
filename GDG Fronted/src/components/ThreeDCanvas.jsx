import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, 
      alpha: true, 
      powerPreference: "high-performance",
      precision: "mediump"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mountRef.current.appendChild(renderer.domElement);

    // Particle Setup configurations
    const count = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const googleColors = [
        new THREE.Color('#4285F4'), // Blue
        new THREE.Color('#EA4335'), // Red
        new THREE.Color('#FBBC05'), // Yellow
        new THREE.Color('#34A853')  // Green
    ];

    for(let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 12;     
        positions[i+1] = (Math.random() - 0.5) * 12;   
        positions[i+2] = (Math.random() - 0.5) * 12;   

        const randomColor = googleColors[Math.floor(Math.random() * googleColors.length)];
        colors[i] = randomColor.r;
        colors[i+1] = randomColor.g;
        colors[i+2] = randomColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleTexture = (() => {
        const size = 128;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.3, 'rgba(255,255,255,0.9)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    })();

    const material = new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        map: particleTexture,
        alphaTest: 0.1,
        sizeAttenuation: true,
        depthWrite: false
    });

    const particleMesh = new THREE.Points(geometry, material);
    scene.add(particleMesh);

    camera.position.z = 4;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
        mouseX = (event.clientX / window.innerWidth) - 0.5;
        mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        particleMesh.rotation.y = elapsedTime * 0.05;
        particleMesh.rotation.x = elapsedTime * 0.02;

        scene.rotation.y += (mouseX * 0.5 - scene.rotation.y) * 0.05;
        scene.rotation.x += (-mouseY * 0.5 - scene.rotation.x) * 0.05;

        renderer.render(scene, camera);
        animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        window.cancelAnimationFrame(animationFrameId);
        if (mountRef.current) {
            mountRef.current.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        particleTexture.dispose();
        renderer.dispose();
    };
  }, []);

  return (
    <div id="canvas-container" className="fixed top-0 left-0 w-full h-full z-1 pointer-events-none" ref={mountRef}></div>
  );
};

export default ThreeDCanvas;
