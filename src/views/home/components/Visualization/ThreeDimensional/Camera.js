import * as THREE from 'three'
import ThreeDimensional from '.'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

// 相机类型
export const cameraType = {
  STANDARD: 'standard_camera',
  GROUND_FLOOR: 'ground_floor_camera',
  DISASSEMBLE: 'disassemble_camera',
}

// 各个场景中相机 layer 值
export const cameraLayers = {
  [cameraType.STANDARD]: 0,
  [cameraType.GROUND_FLOOR]: 2,
  [cameraType.DISASSEMBLE]: 1,
}

// 各个相机默认下的相机位置
const viewPostion = {
  [cameraType.STANDARD]: {
    x: -26.725648056562967,
    y: 12.403608633953866,
    z: 30.757085614756576
  },
  [cameraType.GROUND_FLOOR]: {
    x: -26.725648056562967,
    y: 12.403608633953866,
    z: 30.757085614756576
  },
  [cameraType.DISASSEMBLE]: {
    x: 0.233,
    y: 11.731,
    z: -18.266
  }
}

export default class Camera {
  constructor() {
    this.threeDimensional = new ThreeDimensional()
    this.sizes = this.threeDimensional.sizes
    this.scene = this.threeDimensional.scene
    this.canvas = this.threeDimensional.canvas
    // 当前活动摄像机
    this.activeCamera = null
    this.activeCameraType = cameraType.STANDARD
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
    this.addDefaultCamera()
    this.addDisassembleCamera()
    this.setActiveCamera(cameraType.STANDARD)
  }

  addDefaultCamera() {
    const defaultCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.001,
      10000
    )
    defaultCamera.position.set(viewPostion[cameraType.STANDARD].x, viewPostion[cameraType.STANDARD].y, viewPostion[cameraType.STANDARD].z)
    defaultCamera.name = cameraType.STANDARD
    this.scene.add(defaultCamera)

    // 默认相机拥有的控制器
    const controls = new OrbitControls(defaultCamera, this.canvas)
    controls.maxPolarAngle = Math.PI / 180 * 90

    this.cameraList[cameraType.STANDARD] = {
      camera: defaultCamera,
      controls
    }
  }

  // 拆解使用得相机
  addDisassembleCamera() {
    const camera = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      10000
    )
    camera.position.set(viewPostion[cameraType.DISASSEMBLE].x, viewPostion[cameraType.DISASSEMBLE].y, viewPostion[cameraType.DISASSEMBLE].z)
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
    const currentActiveCamera = this.cameraList[type].camera
    currentActiveCamera.layers.set(cameraLayers[type])
    currentActiveCamera.position.set(viewPostion[type].x, viewPostion[type].y, viewPostion[type].z)
    currentActiveCamera.updateProjectionMatrix()

    this.activeCamera = this.cameraList[type].camera
    this.activeControls = this.cameraList[type].controls
    this.activeControls.update()
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

    if (type === cameraType.STANDARD) {
      end = {
        x: viewPostion.STANDARD.x,
        y: viewPostion.STANDARD.y,
        z: viewPostion.STANDARD.z,
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
    // console.log(this.activeCamera.position)
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