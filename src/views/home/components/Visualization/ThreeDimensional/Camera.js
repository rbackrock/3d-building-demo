import * as THREE from 'three'
import ThreeDimensional from '.'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

export const cameraType = {
  STANDARD: 'standard_camera',
  DISASSEMBLE: 'disassemble_camera'
}

export const viewType = {
  STANDARD: 'standard_view',
  DISASSEMBLE: 'disassemble_view'
}

export const cameraLayers = {
  STANDARD: 0,
  DISASSEMBLE: 1
}

export default class Camera {
  constructor() {
    this.threeDimensional = new ThreeDimensional()
    this.sizes = this.threeDimensional.sizes
    this.scene = this.threeDimensional.scene
    this.canvas = this.threeDimensional.canvas
    // 当前活动摄像机
    this.activeCamera = null
    // 当前活动摄像机的控制器，如果有的话
    this.activeControls = null
    this.cameraList = {
      // 默认结构格式如下
      // [typeName]: {
      //   camera: camera,
      //   controls: controls
      // }
    }

    // 当前活动摄像机
    this.setDefaultCamera()
    this.setDisassembleCamera()
    this.setActiveCamera(cameraType.STANDARD)

    // 默认相机的相机位置
    this.viewPostionList = {
      [viewType.STANDARD]: {
        x: this.activeCamera.position.x,
        y: this.activeCamera.position.y,
        z: this.activeCamera.position.z,
      }
    }
  }

  setDefaultCamera() {
    const defaultCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.01,
      10000
    )
    defaultCamera.position.set(-213.125, 62.492, 4.971)
    defaultCamera.name = cameraType.STANDARD
    this.scene.add(defaultCamera)

    // 默认相机拥有的控制器
    const controls = new OrbitControls(defaultCamera, this.canvas)
    controls.enableDamping = true
    // controls.maxPolarAngle = Math.PI / 180 * 75
    controls.maxPolarAngle = Math.PI / 180 * 90

    this.cameraList[cameraType.STANDARD] = {
      camera: defaultCamera,
      controls
    }
  }

  // 拆解使用得相机
  setDisassembleCamera() {
    const camera = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.01,
      10000
    )
    camera.position.set(0.32, 6.81, -12.67)
    camera.name = cameraType.DISASSEMBLE
    this.scene.add(camera)

    // 默认相机拥有的控制器
    const controls = new OrbitControls(camera, this.canvas)
    controls.enableDamping = true

    this.cameraList[cameraType.DISASSEMBLE] = {
      camera,
      controls
    }
  }

  setLayerByMesh(meshList, layerId) {
    for (const mesh of meshList) {
      mesh.layers.set(layerId)
    }
  }

  /**
   * 设置活动摄像机
   * @param {String} cameraName 摄像机名称
   */
  setActiveCamera(type) {
    this.activeCamera = this.cameraList[type].camera
    this.activeControls = this.cameraList[type].controls

    if (type === cameraType.STANDARD) {
      this.activeCamera.layers.set(cameraLayers.STANDARD)
    } else if (type === cameraType.DISASSEMBLE) {
      this.activeCamera.layers.set(cameraLayers.DISASSEMBLE)
    }
  }

  /**
   * 添加额外摄像机，额外指比如 Blender 添加的摄像机
   * @param {String} cameraType 摄像机类型名称
   * @param {Object} camera 摄像机 Object3d 对象
   * @param {Object} controls 对用相机控制器对象
   */
  addExtraCamera(cameraType, camera, controls = null) {
    camera.aspect = this.sizes.width / this.sizes.height
    camera.updateProjectionMatrix()
    this.cameraList[cameraType] = {
      camera: camera,
      controls
    }
  }

  changeViewPosition(type) {
    const start = {
      x: this.activeCamera.position.x,
      y: this.activeCamera.position.y,
      z: this.activeCamera.position.z,
    }
    let end = {}

    if (type === viewType.STANDARD) {
      end = {
        x: this.viewPostionList[viewType.STANDARD].x,
        y: this.viewPostionList[viewType.STANDARD].y,
        z: this.viewPostionList[viewType.STANDARD].z,
      }
    }
    
    let animation = gsap.to(start, {
      ...end,
      duration: 0.9,
      ease: 'none',
      // repeat: 1,
      onUpdate: () => {
        this.activeCamera.position.set(start.x, start.y, start.z)
      },
      onComplete: () => {
        animation.kill()
        animation = null
      }
    })
  }

  resize() {
    for (const cameraKey in this.cameraList) {
      const currentCamera = this.cameraList[cameraKey]
      currentCamera.camera.aspect = this.sizes.width / this.sizes.height
      currentCamera.camera.updateProjectionMatrix()
    }
  }

  update() {
    if (this.activeControls) {
      this.activeControls.update()
    }
  }

  destroy() {
    for (const cameraKey in this.cameraList) {
      const currentCamera = this.cameraList[cameraKey]
      if (currentCamera.controls) {
        currentCamera.controls.dispose()
      }
    }
  }
}