'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Transform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const _init = () => {
    // Scene
    const scene = new THREE.Scene();
    /**
     * Objects
     */

    // Red cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    /**
     * Multiple ways to express a color
     * - 0xff0000
     * - #ff0000
     * - 'red'
     * - Color
     */
    const material = new THREE.MeshBasicMaterial({ color: '0xff0000' });
    // Instantiate the Mesh with the geometry and the material
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 1;
    scene.add(mesh);

    /**
     * Sizes
     */
    const sizes = {
      width: 800,
      height: 600,
    };

    /**
     * Camera
     * - Not visible
     * - Serve as point of view when doing a render
     * - Can have multiple and switch between them
     * - Different types
     * - We are goint to use PerspectiveCamera
     */

    /**
     * THE ASPECT RATIO
     * The width of the render divided by the height of the render
     * We don't have a render yet, but we can decide on a size now
     * Create a sizes object containing temporary values
     */
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    // Move the camera backward before doing the render
    camera.position.z = 3;
    scene.add(camera);

    /**
     * RENDERER
     * Render the scene from the camera point of view
     * Result drawn into a canvas
     * A canvas is a HTML element in which you can draw stuff
     * Three.js will use WebGL to draw the render inside this canvas
     * You can create it or you can let Three.js do it
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current as HTMLCanvasElement,
    });

    /**
     * Use the setSize(...) method to update the size of the renderer
     */
    renderer.setSize(sizes.width, sizes.height);

    /**
     * First Render
     * Call the render(...) method on the renderer with scene
     * and the camera as parameters.
     */
    renderer.render(scene, camera);
  };

  useEffect(() => {
    if (canvasRef.current) {
      _init();
    }
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}
