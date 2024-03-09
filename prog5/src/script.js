import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
/**
 * Models
 */

const gltfLoader = new GLTFLoader();
gltfLoader.load("/models/Earth/Earth1.glb", (gltf) => {
  scene.add(gltf.scene.children[0]);
});

const gltfLoader2 = new GLTFLoader();
gltfLoader2.load("/models/Earth/moon.glb", (gltf) => {
  gltf.scene.scale.set(0.002, 0.002, 0.002);
  scene.add(gltf.scene.children[0]);
});

/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#444444",
    metalness: 0,
    roughness: 0.5,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;

//scene.add(floor);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
THREE.PCFSoftShadowMap;
directionalLight.castShadow = true;
gltfLoader.castShadow = true;
gltfLoader.receiveShadow = true;
gltfLoader2.castShadow = true;
gltfLoader2.receiveShadow = true;
directionalLight.position.set(15, 15, 15);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.4);
directionalLight2.position.set(-15, -15, -15);
scene.add(directionalLight2);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(2, 2, 2);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setRenderTarget;

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Update controls
  controls.update();

  // Render

  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
