import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from "three";
import { GUI } from "dat.gui";

import Stats from "three/examples/jsm/libs/Stats.module";
import { DirectionalLight } from 'three';

let clock = new THREE.Clock();
// 设置渲染器开启阴影的计算 renderer.shadowMap.enabled = true;
// 设置光照投射阴影 directionalLight.castShadow = true;
// 设置物体投射阴影 sphere.castShadow = true;
// 设置物体接收阴影 plane.receiveShadow = true

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let state: Stats;
let mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;
let directionalLight: THREE.DirectionalLight;
let directionalLightHelper: THREE.DirectionalLightHelper;
let spotLight: THREE.SpotLight;
let spotLightHelper: THREE.CameraHelper;

init();
initGeometry();
initHelp();
render();

function init() {

  let width = window.innerWidth;
  let height = window.innerHeight;
  // 场景
  scene = new THREE.Scene();
  // 定义相机
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(20, 20, 20);
  camera.lookAt(0, 0, 0)
  scene.add(camera)

  // 灯光
  // 环境光
  let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight)
  // 平行光
  directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.castShadow = true;
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight)

  const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1, 0xffffff);
  scene.add(directionalLightHelper);
  // scene.add(new THREE.CameraHelper(directionalLight.shadow.camera))


  // 聚光灯

  // spotLight = new THREE.SpotLight(0xffffff, 1);
  // spotLight.castShadow = true;
  // spotLight.position.set(0, 5, 0)
  // spotLight.angle = Math.PI / 3;


  // scene.add(spotLight)
  // spotLight.shadow.camera.near = 1;
  // spotLight.shadow.camera.far = 30;
  // let spotLightHelper = new THREE.SpotLightHelper(spotLight);
  // scene.add(spotLightHelper);


  // spotLightHelper = new THREE.CameraHelper(spotLight.shadow.camera)
  // scene.add(spotLightHelper)



  // 定义渲染
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.shadowMap.enabled = true;

  renderer.setSize(width, height)
  document.body.appendChild(renderer.domElement)
}

function initGeometry() {

  let plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshLambertMaterial({
    color: 0xffffff,
    // side: THREE.DoubleSide
  }))
  plane.position.set(0, -1, 0)
  plane.rotation.x = -Math.PI / 2;
  plane.receiveShadow = true;

  scene.add(plane);
  mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({
      color: 0xff0000
    })
  )
  mesh.position.set(0, 0, 0);
  mesh.castShadow = true;
  scene.add(mesh)
}

function initHelp() {
  // AxesHelper
  // red x, green y, blue z;
  scene.add(new THREE.AxesHelper(10))


  // OrbitControls
  new OrbitControls(camera, renderer.domElement);

  state = Stats();
  document.body.appendChild(state.dom)



}


function render() {
  // 返回的是自上一帧渲染以来经过的时间，1000/60
  clock.getDelta()
  // 返回自有代码开始执行之后经过的时间。
  clock.getElapsedTime()

  state.update();

  renderer.render(scene, camera);
  requestAnimationFrame(render)
}


