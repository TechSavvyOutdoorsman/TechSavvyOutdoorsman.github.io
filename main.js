
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

/*
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

*/

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Bram Square

const bramTexture = new THREE.TextureLoader().load('bram_bear.JPG');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const bram = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: bramTexture,
    normalMap: normalTexture
  }
));

scene.add(bram);

// SweatsBets Sphere

const sweatTexture = new THREE.TextureLoader().load('SBLOGO.jpg');

const sweat = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32), 
  new THREE.MeshStandardMaterial({ 
    map: sweatTexture,
    normalMap: normalTexture
  }
));

scene.add(sweat);


// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpeg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2, 24, 24),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

// Mars 

const marsTexture = new THREE.TextureLoader().load('mars.jpeg');

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(6, 48, 48),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: normalTexture,
  })
);

scene.add(mars);

// Floating Text

// Objects positions 

moon.position.z = 30;
moon.position.x = -10;

bram.position.z = -5;
bram.position.x = 2;

sweat.position.z = 10;
sweat.position.x = -10;

mars.position.z = 50;
mars.position.x = -10;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  bram.rotation.x += 0.01;
  bram.rotation.y += 0.01;
  bram.rotation.z += 0.01;

  sweat.rotation.y += 0.01;
  sweat.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  moon.rotation.x += 0.005;

  bram.rotation.x += 0.05;
  bram.rotation.y += 0.05;
 
  sweat.rotation.y += 0.05;
  sweat.rotation.z += 0.05;

  mars.rotation.x += 0.005;
  mars.rotation.y += 0.01;

  // controls.update();

  renderer.render(scene, camera);
}

animate();