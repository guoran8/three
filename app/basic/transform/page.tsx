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
     *
     * You can put objects inside groups and use postion, rotation(or quaternion),
     * and scale on those groups
     * To do that, use the Group class.
     */
    const group = new THREE.Group();
    group.position.y = 1;
    group.scale.y = 0.5;
    group.rotation.y = 1;
    scene.add(group);

    const cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    );

    group.add(cube1);

    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    );
    cube2.position.x = -2;
    group.add(cube2);

    const cube3 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    );
    cube3.position.x = 2;
    group.add(cube3);

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
    scene.add(mesh);

    // Position
    // mesh.position.x = 1;
    // mesh.position.y = -0.6;
    // mesh.position.z = 1;
    mesh.position.set(0.7, -0.6, 1);

    // Scale
    // mesh.scale.x = 2;
    // mesh.scale.y = 0.5;
    // mesh.scale.z = 0.5;
    mesh.scale.set(2, 0.5, 0.5);

    // Rotation
    /**
     * Thre value of these axes is expressed in radians
     * Half a rotation is something like 3.14159... but you can use Math.PI
     *
     * Be careful, when you rotate on an axis, you might also rotate the other
     * axis.
     * The rotation goes by default in the x,y and z order and you can get strange
     * result like an axis not working anymore. This is called gimbal lock.
     * You can change this order by using the reorder(...) method: object.rotation.reorder('yxz')
     * Do it before changing the rotation.
     */
    mesh.rotation.y = Math.PI / 2;

    // Axes helper
    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper);

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
     * Object3D instances have a lookAt(...) method which rotates the object so
     * that its -z faces the target you provided.
     * The target must be a Vector3
     */
    camera.lookAt(mesh.position);

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
