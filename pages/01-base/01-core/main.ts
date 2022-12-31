import * as THREE from "three";

// 1. 场景Scene。
// 2. 相机(Camera)。
// 3. 物体(Mesh)。
// 4. 渲染器(Renderer)

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

init();
initGeometry();
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
  renderer = new THREE.WebGLRenderer({});

  renderer.setSize(width, height)
  document.body.appendChild(renderer.domElement)
}

function initGeometry() {
  let mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
      color: 0xffffff
    })
  )
  mesh.position.set(0, 0, 0);
  scene.add(mesh)
}



function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render)
}


