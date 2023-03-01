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

// mesh
import {
  createBuildingInfoMesh
} from './mesh/scienceBuildingMesh'
import {
  createMachineCoreInfoMesh,
  createMachineShellInfoMesh,
  createMachineBaseInfoMesh
} from './mesh/machineInfoMesh'

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
    // 科技楼信息
    let scienceBuildingInfoMesh = null
    // 第一层楼主体网格
    let groundFloorPrincipalMesh = []
    // 楼层之间的平面
    let firstFloorNum1 = null
    let firstFloorNum2 = null
    let firstFloorNum3 = null
    let firstFloorNum4 = null
    let firstFloorNum5 = null

    gltf.scene.traverse(child => {
      // 添加科技楼数据 mesh
      if (child.name === 'scienceBuildingMarker') {
        scienceBuildingInfoMesh = createBuildingInfoMesh(child)
        this.scene.add(scienceBuildingInfoMesh)
      }

      if (child.name === 'fragmentF1#1') {
        groundFloorPrincipalMesh = child
      }
    })
    this.scene.add(gltf.scene)

    // 科技楼信息 controls
    this.controls.scienceBuildingInfo = new ScienceBuildingInfo(scienceBuildingInfoMesh)
    // 一层楼 controls
    this.controls.groundFloor = new GroundFloor(groundFloorPrincipalMesh)
  }

  createMachineScene() {
    const gltf = this.resources[sources.machineGltf]
    let machineMainMesh = null
    const machineMeshForLayer = []

    gltf.scene.traverse(child => {
      if (hasIncludeImportMeshName(child.name, 'machine-main')) {
        machineMainMesh = child
        machineMeshForLayer.push(child)
      }

      if (importMeshLastName(child.name) === 'core') {
        child.add(createMachineCoreInfoMesh())
        machineMeshForLayer.push(child)
      }

      if (importMeshLastName(child.name) === 'shell') {
        child.add(createMachineShellInfoMesh())
        machineMeshForLayer.push(child)
      }

      if (importMeshLastName(child.name) === 'base') {
        child.add(createMachineBaseInfoMesh())
        machineMeshForLayer.push(child)
      }
    })

    setMeshLayerBatch(machineMeshForLayer, layers.DISASSEMBLE)
    this.scene.add(machineMainMesh)

    // set controls
    this.controls.machine = new Machine(machineMainMesh)
  }

  setActiveMachineView() {
    this.camera.setAngleView(layers.DISASSEMBLE, viewPostion.DISASSEMBLE)
  }

  setActiveDefaultView() {
    this.scene.traverse(child => {
      if (!this.hasMachineMesh(child)) {
        child.layers.set(layers.STANDARD)
      }
    })

    this.camera.setAngleView(layers.STANDARD, viewPostion.STANDARD)
  }

  setActiveGroundFloorView() {
    let controlsTarget = new THREE.Vector3()
    this.scene.traverse(child => {
      if (!this.hasMachineMesh(child)) {
        if (
          hasIncludeImportMeshName(child.name, 'chairF1') || 
          hasIncludeImportMeshName(child.name, 'desktopF1') || 
          hasIncludeImportMeshName(child.name, 'fireFightingBoxF1') || 
          hasIncludeImportMeshName(child.name, 'fireFightingCupboardF1') || 
          hasIncludeImportMeshName(child.name, 'fragmentF1') || 
          hasIncludeImportMeshName(child.name, 'innerWallF1') || 
          hasIncludeImportMeshName(child.name, 'smogResponseF1') || 
          hasIncludeImportMeshName(child.name, 'windowF1')
          // ---
          // (hasIncludeImportMeshName(child.name, 'floorPlane') && importMeshLastName(child.name) === '1') ||
          // (hasIncludeImportMeshName(child.name, 'floorPlane') && importMeshLastName(child.name) === '2')
        ) {
          child.layers.set(layers.GROUND_FLOOR)
        }

        if (hasIncludeImportMeshName(child.name, 'fragmentF1')) {
          controlsTarget = child.position.clone()
        }
      }
    })

    this.camera.setAngleView(layers.GROUND_FLOOR, viewPostion.GROUND_FLOOR, controlsTarget)
  }

  // 排除机器场景
  hasMachineMesh(mesh) {
    if (
      hasIncludeImportMeshName(mesh.name, 'machine-main') ||
      hasIncludeImportMeshName(mesh.name, 'machine-part') ||
      mesh.name === 'machineCoreInfo' ||
      mesh.name === 'machineShellInfo' ||
      mesh.name === 'machineBaseInfo'
    ) {
      return true
    }

    return false
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
