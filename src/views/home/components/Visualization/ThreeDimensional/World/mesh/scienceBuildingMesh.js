import * as THREE from 'three'
import {  CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js'
import {  CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import {
  layers
} from '../../Camera'

// 科技楼信息网格
export function createBuildingInfoMesh (markerMesh) {
  const markerPosition = new THREE.Vector3()
  const size = 0.016
  const css3Object = new CSS3DObject(document.querySelector('#science-building-css-render-hook'))

  markerPosition.copy(markerMesh.position)
  css3Object.name = 'scienceBuildingInfo'
  css3Object.position.copy(markerPosition)
  css3Object.scale.set(size, size, size)
  css3Object.rotateY(0.1)
  css3Object.layers.set(layers.STANDARD)

  return css3Object
}
