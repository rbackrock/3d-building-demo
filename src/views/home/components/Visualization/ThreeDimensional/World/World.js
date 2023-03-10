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
import SecondFloor from './Controls/SecondFloor'
import ThirdFloor from './Controls/ThirdFloor'
import FourFloor from './Controls/FourFloor'

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
      scienceBuildingInfo: null,
      groundFloor: null,
      secondFloor: null,
      thirdFloor: null,
      fourFloor: null
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
    const groundFloorMeshList = []
    // 第二层楼主体网格
    const secondFloorMeshList = []
    // 第三层楼主体网格
    const thirdFloorMeshList = []
    // 第四层楼主体网格
    const fourFloorMeshList = []

    gltf.scene.traverse(child => {
      // 添加科技楼数据 mesh
      if (child.name === 'scienceBuildingMarker') {
        scienceBuildingInfoMesh = createBuildingInfoMesh(child)
        this.scene.add(scienceBuildingInfoMesh)
      }

      if (
        child.name === 'fragmentF1' ||
        hasIncludeImportMeshName(child.name, 'chairF1') || 
        hasIncludeImportMeshName(child.name, 'desktopF1') || 
        hasIncludeImportMeshName(child.name, 'fireFightingBoxF1') || 
        hasIncludeImportMeshName(child.name, 'fireFightingCupboardF1') || 
        hasIncludeImportMeshName(child.name, 'fragmentF1') || 
        hasIncludeImportMeshName(child.name, 'innerWallF1') || 
        hasIncludeImportMeshName(child.name, 'smogResponseF1') || 
        hasIncludeImportMeshName(child.name, 'windowF1')
      ) {
        groundFloorMeshList.push(child)
      }

      if (
        child.name === 'fragmentF2' ||
        hasIncludeImportMeshName(child.name, 'chairF2') || 
        hasIncludeImportMeshName(child.name, 'desktopF2') || 
        hasIncludeImportMeshName(child.name, 'fireFightingBoxF2') || 
        hasIncludeImportMeshName(child.name, 'fireFightingCupboardF2') || 
        hasIncludeImportMeshName(child.name, 'fragmentF2') || 
        hasIncludeImportMeshName(child.name, 'innerWallF2') || 
        hasIncludeImportMeshName(child.name, 'smogResponseF2') || 
        hasIncludeImportMeshName(child.name, 'windowF2')
      ) {
        secondFloorMeshList.push(child)
      }

      if (
        child.name === 'fragmentF3' ||
        hasIncludeImportMeshName(child.name, 'chairF3') || 
        hasIncludeImportMeshName(child.name, 'desktopF3') || 
        hasIncludeImportMeshName(child.name, 'fireFightingBoxF3') || 
        hasIncludeImportMeshName(child.name, 'fireFightingCupboardF3') || 
        hasIncludeImportMeshName(child.name, 'fragmentF3') || 
        hasIncludeImportMeshName(child.name, 'innerWallF3') || 
        hasIncludeImportMeshName(child.name, 'smogResponseF3') || 
        hasIncludeImportMeshName(child.name, 'windowF3')
      ) {
        thirdFloorMeshList.push(child)
      }

      if (
        child.name === 'fragmentF4' ||
        hasIncludeImportMeshName(child.name, 'chairF4') || 
        hasIncludeImportMeshName(child.name, 'desktopF4') || 
        hasIncludeImportMeshName(child.name, 'fireFightingBoxF4') || 
        hasIncludeImportMeshName(child.name, 'fireFightingCupboardF4') || 
        hasIncludeImportMeshName(child.name, 'fragmentF4') || 
        hasIncludeImportMeshName(child.name, 'innerWallF4') || 
        hasIncludeImportMeshName(child.name, 'smogResponseF4') || 
        hasIncludeImportMeshName(child.name, 'windowF4')
      ) {
        fourFloorMeshList.push(child)
      }
    })
    this.scene.add(gltf.scene)

    // 科技楼信息 controls
    this.controls.scienceBuildingInfo = new ScienceBuildingInfo(scienceBuildingInfoMesh)
    // 一层楼 controls
    this.controls.groundFloor = new GroundFloor(groundFloorMeshList)
    // 二层楼 controls
    this.controls.secondFloor = new SecondFloor(secondFloorMeshList)
    // 三层楼 controls
    this.controls.thirdFloor = new ThirdFloor(thirdFloorMeshList)
    // 四层楼 controls
    this.controls.fourFloor = new FourFloor(fourFloorMeshList)
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

        if (hasIncludeImportMeshName(child.name, 'innerWallF1')) {
          controlsTarget = child.position.clone()
        }
      }
    })

    this.camera.setAngleView(layers.GROUND_FLOOR, viewPostion.GROUND_FLOOR, controlsTarget)
  }

  setActiveSecondFloorView() {
    let controlsTarget = new THREE.Vector3()
    this.scene.traverse(child => {
      if (!this.hasMachineMesh(child)) {
        if (
          hasIncludeImportMeshName(child.name, 'chairF2') || 
          hasIncludeImportMeshName(child.name, 'desktopF2') || 
          hasIncludeImportMeshName(child.name, 'fireFightingBoxF2') || 
          hasIncludeImportMeshName(child.name, 'fireFightingCupboardF2') || 
          hasIncludeImportMeshName(child.name, 'fragmentF2') || 
          hasIncludeImportMeshName(child.name, 'innerWallF2') || 
          hasIncludeImportMeshName(child.name, 'smogResponseF2') || 
          hasIncludeImportMeshName(child.name, 'windowF2')
          // ---
          // (hasIncludeImportMeshName(child.name, 'floorPlane') && importMeshLastName(child.name) === '1') ||
          // (hasIncludeImportMeshName(child.name, 'floorPlane') && importMeshLastName(child.name) === '2')
        ) {
          child.layers.set(layers.SECOND_FLOOR)
        }

        if (hasIncludeImportMeshName(child.name, 'innerWallF2')) {
          controlsTarget = child.position.clone()
        }
      }
    })

    this.camera.setAngleView(layers.SECOND_FLOOR, viewPostion.SECOND_FLOOR, controlsTarget)
  }

  setActiveThirdFloorView() {
    let controlsTarget = new THREE.Vector3()
    this.scene.traverse(child => {
      if (!this.hasMachineMesh(child)) {
        if (
          hasIncludeImportMeshName(child.name, 'chairF3') || 
          hasIncludeImportMeshName(child.name, 'desktopF3') || 
          hasIncludeImportMeshName(child.name, 'fireFightingBoxF3') || 
          hasIncludeImportMeshName(child.name, 'fireFightingCupboardF3') || 
          hasIncludeImportMeshName(child.name, 'fragmentF3') || 
          hasIncludeImportMeshName(child.name, 'innerWallF3') || 
          hasIncludeImportMeshName(child.name, 'smogResponseF3') || 
          hasIncludeImportMeshName(child.name, 'windowF3')
          // ---
          // (hasIncludeImportMeshName(child.name, 'floorPlane') && importMeshLastName(child.name) === '1') ||
          // (hasIncludeImportMeshName(child.name, 'floorPlane') && importMeshLastName(child.name) === '2')
        ) {
          child.layers.set(layers.THIRD_FLOOR)
        }

        if (hasIncludeImportMeshName(child.name, 'innerWallF3')) {
          controlsTarget = child.position.clone()
        }
      }
    })

    this.camera.setAngleView(layers.THIRD_FLOOR, viewPostion.THIRD_FLOOR, controlsTarget)
  }

  setActiveFourFloorView() {
    let controlsTarget = new THREE.Vector3()
    this.scene.traverse(child => {
      if (!this.hasMachineMesh(child)) {
        if (
          hasIncludeImportMeshName(child.name, 'chairF4') || 
          hasIncludeImportMeshName(child.name, 'desktopF4') || 
          hasIncludeImportMeshName(child.name, 'fireFightingBoxF4') || 
          hasIncludeImportMeshName(child.name, 'fireFightingCupboardF4') || 
          hasIncludeImportMeshName(child.name, 'fragmentF4') || 
          hasIncludeImportMeshName(child.name, 'innerWallF4') || 
          hasIncludeImportMeshName(child.name, 'smogResponseF4') || 
          hasIncludeImportMeshName(child.name, 'windowF4')
          // ---
          // (hasIncludeImportMeshName(child.name, 'floorPlane') && importMeshLastName(child.name) === '1') ||
          // (hasIncludeImportMeshName(child.name, 'floorPlane') && importMeshLastName(child.name) === '2')
        ) {
          child.layers.set(layers.FOUR_FLOOR)
        }

        if (hasIncludeImportMeshName(child.name, 'innerWallF4')) {
          controlsTarget = child.position.clone()
        }
      }
    })

    this.camera.setAngleView(layers.FOUR_FLOOR, viewPostion.FOUR_FLOOR, controlsTarget)
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

  // SFC 外部调用

  restoreFloor() {
    this.controls.groundFloor.restore()
    this.controls.secondFloor.restore()
    this.controls.thirdFloor.restore()
    this.controls.fourFloor.restore()
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
