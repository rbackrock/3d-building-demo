import {  CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js'

export default function() {
  const css3Object = new CSS3DObject(document.querySelector('#floor-info-container-list-hook'))
  css3Object.scale.set(0.3, 0.3, 0.3)
  css3Object.position.set(-74, 0, 0)

  return css3Object
}