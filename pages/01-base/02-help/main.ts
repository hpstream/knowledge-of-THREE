import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from "three";
import { GUI } from "dat.gui";

import Stats from "three/examples/jsm/libs/Stats.module";

let clock = new THREE.Clock();
// 1. 场景Scene。
// 2. 相机(Camera)。
// 3. 物体(Mesh)。
// 4. 渲染器(Renderer)

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let state: Stats;
let mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;
let rotate = 0;
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
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0)
  scene.add(camera)

  // 定义渲染
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  renderer.setSize(width, height)
  document.body.appendChild(renderer.domElement)
}

function initGeometry() {
  mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
      color: 0xffffff
    })
  )
  mesh.position.set(0, 0, 0);
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

  // gui
  let gui = new GUI();
  gui.add(mesh, 'visible').name('是否显示');
  let pos = gui.addFolder('位置参数')
  pos.open();
  let object = {
    y: 0,
    color: 0xffffff,
    fn: () => {
      console.log(1)
    }
  }
  pos.add(mesh.position, 'x').min(-5).max(5).step(0.1)

  pos.add(object, 'y').min(-5).max(5).step(0.1).onChange(() => {
    mesh.position.y = object.y;
  })

  pos.addColor(object, 'y').onChange(() => {
    mesh.material.color.set(object.y);
  })
  pos.add(object, 'fn').name('函数')

}


function render() {
  // 返回的是自上一帧渲染以来经过的时间，1000/60
  clock.getDelta()
  // 返回自有代码开始执行之后经过的时间。
  clock.getElapsedTime()
  // rotate = 0.01;
  mesh.rotateX(0.01)
  state.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render)
}


