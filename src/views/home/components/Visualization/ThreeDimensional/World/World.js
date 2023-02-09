import * as THREE from 'three'

import EventEmitter from '../Utils/EventEmitter'
import gsap from 'gsap'
import ThreeDimensional from '..'
import Environment from './Environment'
import {
  hasIncludeImportMeshName,
  importMeshLastName
} from '../Utils/index'
import {
  sources
} from '../resources/sources'
import {
  cameraLayers
} from '../Camera'

import createBoxMesh from './mesh/box'

export default class World extends EventEmitter {
  constructor() {
    super()

    this.threeDimensional = new ThreeDimensional()
    this.canvas = this.threeDimensional.canvas
    this.camera = this.threeDimensional.camera
    this.scene = this.threeDimensional.scene
    this.sizes = this.threeDimensional.sizes
    this.outlinePass = this.threeDimensional.outlinePass 
    this.resources = this.threeDimensional.resources

    // 准备需要控制的 object3d 对象
    this.controls = {
    }

    this.createNormalScene()
    this.createMachineScene()

    // 绑定事件
    this.bindEvent()

    // 接收 destroy 事件
    this.on('destroy', () => {
      this.destroy()
    })
  }

  createNormalScene() {
    this.environment = new Environment()

    const boxMesh = createBoxMesh()
    this.camera.setLayerByMesh([boxMesh], cameraLayers.STANDARD)
    this.scene.add(boxMesh)
  }

  createMachineScene() {
    const gltf = this.resources[sources.machineGltf]
    const meshList = []
    gltf.scene.traverse(child => {
      if (hasIncludeImportMeshName(child.name, 'machine-layer')) {
        meshList.push(child)
      }
    })

    this.camera.setLayerByMesh(meshList, cameraLayers.DISASSEMBLE)
    for (const mesh of meshList) {
      this.scene.add(mesh)
    }
  }

  bindEvent() {}

  removeEvent() {}

  destroy() {
    this.removeEvent()

    // 删除并且置空控制物体的 gsap 动画对象让垃圾回收，或者其他事件对象
    // ES 类规范没有接口特性，需要清除 gsap 动画需要自己记得实现 destroy 方法
    for (const wolrdControlsKey in this.controls) {
      this.controls[wolrdControlsKey].destroy && this.controls[wolrdControlsKey].destroy()
    }
  }
}
