import {
  hasIncludeImportMeshName
} from '../../Utils/index'

export default class GroundFloor {
  constructor(principalMesh) {
    this.mesh = principalMesh
    this.transparentMeshList = []

    this.setTransparent()
  }

  setTransparent() {
    const opacity = 0.16

    this.mesh.traverse(child => {
      if (
        !hasIncludeImportMeshName(child.name, 'fireFightingBoxF1') &&
        !hasIncludeImportMeshName(child.name, 'fireFightingCupboardF1') &&
        !hasIncludeImportMeshName(child.name, 'smogResponseF1')
      ) {
        if (child.type === 'Mesh') {
          this.transparentMeshList.push(child)
        }
      }
    })

    for (const mesh of this.transparentMeshList) {
      mesh.material.transparent = true
      mesh.material.opacity = opacity
    }
  }

  restore() {
    for (const mesh of transparentMeshList) {
      mesh.material.transparent = true
      mesh.material.opacity = 1
    }
  }
}
