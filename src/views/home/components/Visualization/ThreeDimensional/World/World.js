import * as THREE from 'three'

import EventEmitter from '../Utils/EventEmitter'
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
  layers,
  viewPostion,
  setMeshLayerBatch
} from '../Camera'

// controls
import Machine from './Controls/Machine'
import ScienceBuildingInfo from './Controls/ScienceBuildingInfo'
import GroundFloor from './Controls/GroundFloor'

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

      if (
        hasIncludeImportMeshName(child.name, 'chairF1') || 
        hasIncludeImportMeshName(child.name, 'desktopF1') || 
        hasIncludeImportMeshName(child.name, 'fireFightingBoxF1') || 
        hasIncludeImportMeshName(child.name, 'fireFightingCupboardF1') || 
        hasIncludeImportMeshName(child.name, 'fragmentF1') || 
        hasIncludeImportMeshName(child.name, 'innerWallF1') || 
        hasIncludeImportMeshName(child.name, 'smogResponseF1') || 
        hasIncludeImportMeshName(child.name, 'windowF1') || 
        // ---
        (hasIncludeImportMeshName(child.name, 'floorPlane') && importMeshLastName(child.name) === '1') ||
        (hasIncludeImportMeshName(child.name, 'floorPlane') && importMeshLastName(child.name) === '2')
      ) {
        groundFloorMeshList.push(child)
      }
    })
    this.scene.add(gltf.scene)

    // 控制科技楼外部信息图表
    const scienceBuildingInfoMesh = new ScienceBuildingInfo(scienceBuildingMarkerMesh)
    this.controls.scienceBuildingInfo = scienceBuildingInfoMesh
    this.scene.add(scienceBuildingInfoMesh.getScienceBuildingMesh())

    // 一层楼
    this.controls.groundFloor = new GroundFloor(groundFloorMeshList)
  }

  createMachineScene() {
    const gltf = this.resources[sources.machineGltf]
    let machineMainMesh = null
    const machineMeshForLayer = []

    gltf.scene.traverse(child => {
      if (hasIncludeImportMeshName(child.name, 'machine-main')) {
        machineMainMesh = child
      }

      if (
        hasIncludeImportMeshName(child.name, 'machine-main') ||
        hasIncludeImportMeshName(child.name, 'machine-part')
      ) {
        machineMeshForLayer.push(child)
      }
    })

    // set controls
    this.controls.machine = new Machine(machineMainMesh)
    setMeshLayerBatch(machineMeshForLayer, layers.DISASSEMBLE)

    this.scene.add(machineMainMesh)
  }

  setActiveMachineView() {
    // this.camera.setActiveCamera(cameraType.DISASSEMBLE)
    this.camera.setAngleView(layers.DISASSEMBLE, viewPostion.DISASSEMBLE)
  }

  setActiveDefaultView() {
    this.scene.traverse(child => {
      if (
        hasIncludeImportMeshName(child.name, 'machine-main') === false &&
        hasIncludeImportMeshName(child.name, 'machine-part') === false
      ) {
        child.layers.set(layers.STANDARD)
      }
    })

    // this.camera.setActiveCamera(cameraType.STANDARD)
    this.camera.setAngleView(layers.STANDARD, viewPostion.STANDARD)
  }

  setActiveGroundFloor() {
    let controlsTarget = new THREE.Vector3()
    this.scene.traverse(child => {
      if (
        hasIncludeImportMeshName(child.name, 'machine-main') === false &&
        hasIncludeImportMeshName(child.name, 'machine-part') === false
      ) {

        if (
          hasIncludeImportMeshName(child.name, 'chairF1') || 
          hasIncludeImportMeshName(child.name, 'desktopF1') || 
          hasIncludeImportMeshName(child.name, 'fireFightingBoxF1') || 
          hasIncludeImportMeshName(child.name, 'fireFightingCupboardF1') || 
          hasIncludeImportMeshName(child.name, 'fragmentF1') || 
          hasIncludeImportMeshName(child.name, 'innerWallF1') || 
          hasIncludeImportMeshName(child.name, 'smogResponseF1') || 
          hasIncludeImportMeshName(child.name, 'windowF1') || 
          // ---
          (hasIncludeImportMeshName(child.name, 'floorPlane') && importMeshLastName(child.name) === '1') ||
          (hasIncludeImportMeshName(child.name, 'floorPlane') && importMeshLastName(child.name) === '2')
        ) {
          child.layers.set(layers.GROUND_FLOOR)
        }

        if (hasIncludeImportMeshName(child.name, 'fragmentF1')) {
          controlsTarget = child.position.clone()
        }
      }
    })

    // this.camera.setActiveCamera(cameraType.GROUND_FLOOR,controlsTarget)
    // this.camera.setActiveControlTarget(controlsTarget)
    this.camera.setAngleView(layers.GROUND_FLOOR, viewPostion.GROUND_FLOOR, controlsTarget)
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
