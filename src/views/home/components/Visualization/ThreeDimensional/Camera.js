import * as THREE from 'three'
import ThreeDimensional from '.'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

// 相机类型
const cameraType = {
  DEFAULT_CAMERA: 'default_camera'
}

// 视角类型
export const angleViewType = {
  STANDARD: 'standard_angle_view',
  GROUND_FLOOR: 'ground_floor_angle_view',
  DISASSEMBLE: 'disassemble_angle_view',
}

// 各个场景中相机 layer 值
export const layers = {
  STANDARD: 0,
  GROUND_FLOOR: 1,
  DISASSEMBLE: 2,
}

// 设置物体 layer
export function setMeshLayerBatch(meshList, layerId) {
  for (const mesh of meshList) {
    mesh.layers.set(layerId)
  }
}

// 各个相机默认下的相机位置
export const viewPostion = {
  STANDARD: {
    x: -26.725648056562967,
    y: 12.403608633953866,
    z: 30.757085614756576
  },
  GROUND_FLOOR: {
    x: -12.94722127215085,
    y: 15.13070191561742,
    z: 23.398423346195166
  },
  DISASSEMBLE: {
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
    // this.addDisassembleCamera()
    // this.addGroundFloor()
    this.setActiveCamera(cameraType.DEFAULT_CAMERA)

    this.changeViewPosition = this.changeViewPosition.bind(this)
  }

  addDefaultCamera() {
    const camera = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.001,
      10000
    )
    camera.position.set(viewPostion.STANDARD.x, viewPostion.STANDARD.y, viewPostion.STANDARD.z)
    camera.name = cameraType.DEFAULT_CAMERA
    this.scene.add(camera)

    // 默认相机拥有的控制器
    const controls = new OrbitControls(camera, this.canvas)
    controls.maxPolarAngle = Math.PI / 180 * 90

    this.cameraList[cameraType.DEFAULT_CAMERA] = {
      camera,
      controls
    }
  }

  setLayerBatchByMesh(meshList, layerId) {
    for (const mesh of meshList) {
      mesh.layers.set(layerId)
    }
  }

  /**
   * 设置活动摄像机
   * @param {String} cameraName 摄像机名称
   */
  setActiveCamera(cameraTypeValue = cameraTypeValue.DEFAULT_CAMERA, layersValue = layers.STANDARD, viewPostionValue = viewPostion.STANDARD, controlTarget = new THREE.Vector3()) {
    const currentCameraObject = this.cameraList[cameraTypeValue]
    
    const currentActiveCamera = currentCameraObject.camera
    currentActiveCamera.layers.set(layersValue)
    currentActiveCamera.position.set(viewPostionValue.x, viewPostionValue.y, viewPostionValue.z)
    currentActiveCamera.updateProjectionMatrix()

    const currentActiveControls = currentCameraObject.controls
    currentActiveControls.target = controlTarget

    this.activeCamera = currentActiveCamera
    this.activeControls = currentActiveControls
  }

  setAngleView(layersValue, viewPositionValue, controlTarget = new THREE.Vector3()) {
    const currentActiveCamera = this.activeCamera
    const currentActiveControl = this.activeControls

    currentActiveCamera.layers.set(layersValue)
    currentActiveControl.target = controlTarget

    this.changeViewPosition(viewPositionValue)
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

  changeViewPosition(viewPositionValue) {
    const start = {
      x: this.activeCamera.position.x,
      y: this.activeCamera.position.y,
      z: this.activeCamera.position.z,
    }
    let end = {
      x: viewPositionValue.x,
      y: viewPositionValue.y,
      z: viewPositionValue.z,
    }
    
    let animation = gsap.to(start, {
      ...end,
      duration: 0.6,
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