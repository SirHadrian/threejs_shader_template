import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import _FS from './shaders/fragment_shader.c?raw'
import _VS from './shaders/vertex_shader.c?raw'


const uniforms = {
  R: new THREE.Uniform(new THREE.Vector2(window.innerWidth, window.innerHeight)),
  T: { value: 1.0 },
}

const clock = new THREE.Clock()

class SceneSetup extends THREE.Scene {

  constructor() {

    super()

  }

}

class CameraSetup extends THREE.PerspectiveCamera {

  constructor(fov: number, aspectRatio: number, nearDistance: number, farDistance: number) {

    super(fov, aspectRatio, nearDistance, farDistance)

    this.position.set(0, 1, 20)
    this.lookAt(0, 0, 0)
  }
}

class RendererSetup extends THREE.WebGLRenderer {

  constructor(configs: object, camera: THREE.Camera) {

    super(configs)

    this.setSize(window.innerWidth, window.innerHeight)
    this.setPixelRatio(window.devicePixelRatio)
    this.outputEncoding = THREE.sRGBEncoding

    // Inject renderer to DOM
    const target = document.getElementById("app")
    target?.appendChild(this.domElement)

    // OrbitControls
    new OrbitControls(camera, this.domElement)
  }
}

class LightSetup extends THREE.DirectionalLight {

  constructor(scene: THREE.Scene, color: THREE.ColorRepresentation, intensity: number) {

    super(color, intensity)

    this.position.set(0, 10, 10)
    scene.add(this)
  }
}

function main() {

  //#region INIT
  // Create Scene
  const scene = new SceneSetup()

  // Create Camera
  const camera = new CameraSetup(
    50, // FOV
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near: distance objects apear on camera
    1000, // Far: distance objects disapear from camera
  )

  // Create Renderer
  const renderer = new RendererSetup({ antialiasing: true }, camera)
  renderer.shadowMap.enabled = true
  // Create light source
  const light = new LightSetup(
    scene,
    0xffffff,
    1
  )

  scene.add(light)
  //#endregion


  //#region PlayGround


  const g = new THREE.PlaneGeometry(10, 10)
  const m = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    vertexShader: _VS,
    fragmentShader: _FS,
  })
  const plane = new THREE.Mesh(g, m)



  scene.add(plane)


  //#endregion


  //#region Main loop and events

  // On window resize
  const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener("resize", resize, false)

  // Animation loop
  const animate = () => {

    uniforms.T.value = clock.getElapsedTime()

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }
  animate()

  //#endregion
}

main()
