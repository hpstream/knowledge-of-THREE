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

let mouse = new THREE.Vector2(-2, -2);
let raycaster = new THREE.Raycaster();
init();
initGeometry();
initHelp();
render();
Event();

function init() {

  let width = window.innerWidth;
  let height = window.innerHeight;
  // 场景
  scene = new THREE.Scene();
  // let urls = [
  //   '/static/textures/cube/pisa/px.png', //right
  //   '/static/textures/cube/pisa/nx.png', //left
  //   '/static/textures/cube/pisa/py.png', //top
  //   '/static/textures/cube/pisa/ny.png', //bottom
  //   '/static/textures/cube/pisa/pz.png', // front
  //   '/static/textures/cube/pisa/nz.png',  // back
  // ]

  // let texture = new THREE.CubeTextureLoader().load(urls)

  // scene.background = texture;
  // scene.environment = texture


  // 定义相机
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0.1, 0.1, 20);
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

  // const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1, 0xffffff);
  // scene.add(directionalLightHelper);
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

  // TextureLoader

  // let texture = new THREE.TextureLoader().load('/static/textures/cube/pisa/nx.png'
  // )

  // CubeTextureLoader

  // let urls = [
  //   '/static/textures/cube/pisa/px.png', //right
  //   '/static/textures/cube/pisa/nx.png', //left
  //   '/static/textures/cube/pisa/py.png', //top
  //   '/static/textures/cube/pisa/ny.png', //bottom
  //   '/static/textures/cube/pisa/nz.png', // front
  //   '/static/textures/cube/pisa/nz.png',  // back
  // ]

  // let texture = new THREE.CubeTextureLoader().load(urls)



  // let box = new THREE.BoxGeometry(1, 1, 1)

  // let mesh = new THREE.MeshLambertMaterial({
  //   // color: 0xfffffff,
  //   // map: texture,
  //   envMap: texture
  // })

  // scene.add(new THREE.Mesh(box, mesh))


  // const geometry = new THREE.SphereGeometry(1, 32, 32)

  // const material = new THREE.MeshStandardMaterial({
  //   metalness: 1, // 材质与金属的相似度。非金属材质，如木材或石材，使用0.0，金属使用1.0，通常没有中间值。 默认值为0.0。0.0到1.0之间的值可用于生锈金属的外观
  //   roughness: 0, // 材质的粗糙程度。0.0表示平滑的镜面反射，1.0表示完全漫反射。默认值为1.0
  // })

  // const mesh = new THREE.Mesh(geometry, material);

  // scene.add(mesh)

  // vr效果
  // let urls = [
  //   '/static/textures/cube/pisa/px.png', //right
  //   '/static/textures/cube/pisa/nx.png', //left
  //   '/static/textures/cube/pisa/py.png', //top
  //   '/static/textures/cube/pisa/ny.png', //bottom
  //   '/static/textures/cube/pisa/pz.png', // front
  //   '/static/textures/cube/pisa/nz.png',  // back
  // ]

  // let materials: THREE.MeshBasicMaterial[] = [];

  // for (let i = 0; i < urls.length; i++) {
  //   materials.push(new THREE.MeshBasicMaterial({
  //     map: new THREE.TextureLoader().load(urls[i]),
  //     // side: THREE.DoubleSide
  //   }));
  // }

  // let geometry = new THREE.BoxGeometry(5, 5, 5);


  // let mesh = new THREE.Mesh(geometry, materials);
  // mesh.geometry.scale(1, 1, -1)

  // scene.add(mesh)


  // ImageLoader


  const textures = getTextures('/static/textures/cube/sun_temple_stripe.jpg', 6);


  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const materials: THREE.MeshBasicMaterial[] = []
  for (let i = 0; i < textures.length; i++) {
    materials.push(new THREE.MeshBasicMaterial({
      map: textures[i]
    }))
  }

  let mesh = new THREE.Mesh(geometry, materials);
  // mesh.geometry.scale(-1, 1, 1)

  scene.add(mesh)




  function getTextures(url: string, count: number) {
    const textures: THREE.Texture[] = [];
    for (let i = 0; i < count; i++) {
      textures[i] = new THREE.Texture();
    }

    new THREE.ImageLoader().load(url, (image) => {
      let width = image.height;
      let height = image.height;
      // console.log(width, height)

      for (let i = 0; i < count; i++) {
        let canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = height;
        canvas.height = height;


        context?.drawImage(image, width * i, 0, width, width, 0, 0, width, width)
        textures[i].image = canvas;
        textures[i].needsUpdate = true;

      }
    })


    return textures;


  }

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

function Event() {
  document.addEventListener('mousemove', (event) => {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  })
}


