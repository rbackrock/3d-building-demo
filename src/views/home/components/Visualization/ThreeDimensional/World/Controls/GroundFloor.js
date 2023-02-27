import {
  setLayerByMesh,
  cameraLayers
} from '../../Camera'

export default class GroundFloor {
  constructor(meshList) {

    // 设置 layer
    setLayerByMesh(meshList, cameraLayers.DISASSEMBLE)
    for (let i = 0; i < this.meshList.length; i++) {
      this.meshList[i]
    }
  }
}
