import * as THREE from 'three'

import EventEmitter from '../Utils/EventEmitter'
import ThreeDimensional from '..'
import Environment from './Environment'
import {
  hasIncludeImportMeshName,
  
} from '../Utils/index'
import {
  sources
} from '../resources/sources'
import {
  cameraType,
  cameraLayers
} from '../Camera'

// controls
import Machine from './Controls/Machine'
import ScienceBuildingInfo from './Controls/ScienceBuildingInfo'

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
    this.environment = new Environment()

    // 准备需要控制的 object3d 对象
    this.controls = {
      machine: null,
      scienceBuildingInfo: null
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
    const gltf = this.resources[sources.sceneGltf]
    // pick up
    let scienceBuildingMarkerMesh = null
    const groundFloorMeshList  = []

    gltf.scene.traverse(child => {
      if (child.name === 'scienceBuildingMarker') {
        scienceBuildingMarkerMesh = child
      }
    })
    this.scene.add(gltf.scene)

    // 控制科技楼外部信息图表
    const scienceBuildingInfoMesh = new ScienceBuildingInfo(scienceBuildingMarkerMesh)
    this.controls.scienceBuildingInfo = scienceBuildingInfoMesh
    this.scene.add(scienceBuildingInfoMesh.getScienceBuildingMesh())
  }

  createMachineScene() {
    const gltf = this.resources[sources.machineGltf]
    const meshListForScene = []
    const meshListForLayers = []
    gltf.scene.traverse(child => {
      // 父
      if (hasIncludeImportMeshName(child.name, 'machine-main')) {
        this.controls.machine = new Machine(child)
        meshListForScene.push(child)
      }

      // 子
      if (hasIncludeImportMeshName(child.name, 'machine-main') ||
          hasIncludeImportMeshName(child.name, 'machine-part')
      ) {
        meshListForLayers.push(child)
      }
    })

    this.camera.setLayerByMesh(meshListForLayers, cameraLayers[cameraType.DISASSEMBLE])
    for (const mesh of meshListForScene) {
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
