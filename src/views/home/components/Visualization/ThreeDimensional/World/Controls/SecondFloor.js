import * as THREE from 'three'
import {
  hasIncludeImportMeshName
} from '../../Utils/index'
import ThreeDimensional from '../../index'

export default class SecondFloor {
  constructor(meshList) {
    this.threeDimensional = new ThreeDimensional()
    this.meshList = meshList
    // 需要透明的物体列表
    this.effectMeshList = []
    // 需要控制的物体列表
    this.controlsMeshList = []
    this.isTransparent = false

    this.filterMesh()
  }

  filterMesh() {
    for (const mesh of this.meshList) {
      if (
        !hasIncludeImportMeshName(mesh.name, 'fireFightingBoxF2') &&
        !hasIncludeImportMeshName(mesh.name, 'fireFightingCupboardF2') &&
        !hasIncludeImportMeshName(mesh.name, 'smogResponseF2')
      ) {
        if (mesh.type === 'Mesh') {
          mesh.material.transparent = true
          this.effectMeshList.push(mesh)
        }
      } else {
        this.controlsMeshList.push(mesh)
      }
    }
  }

  setEffect() {
    // 设置透明
    const opacity = 0.16
    this.isTransparent = true
    for (const mesh of this.effectMeshList) {
      mesh.material.opacity = opacity
    }
  }

  addOutlinePass(meshId) {
    for (const mesh of this.controlsMeshList) {
      if (mesh.name === meshId) {
        this.threeDimensional.outlinePass.selectedObjects = [mesh]
        break
      }
    }
  }

  restore() {
    if (this.isTransparent) {
      this.isTransparent = true
      for (const mesh of this.effectMeshList) {
        mesh.material.opacity = 1
      }
    }

    this.threeDimensional.outlinePass.selectedObjects = []
  }
}
