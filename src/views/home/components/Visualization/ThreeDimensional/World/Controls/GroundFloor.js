import {
  setLayerByMesh,
  cameraType,
  cameraLayers
} from '../../Camera'

export default class GroundFloor {
  constructor(meshList) {

    // 设置 layer
    setLayerByMesh(meshList, cameraLayers[cameraType.GROUND_FLOOR])
    // for (let i = 0; i < meshList.length; i++) {
    //   console.log(meshList[i])
    // }
  }
}
