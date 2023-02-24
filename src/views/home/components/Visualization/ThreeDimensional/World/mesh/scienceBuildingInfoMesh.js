import {  CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js'

export default function(position) {
  const size = 0.016
  const css3Object = new CSS3DObject(document.querySelector('#science-building-css-render-hook'))
  css3Object.scale.set(size, size, size)
  css3Object.position.copy(position)
  // css3Object.rotateX(180 / Math.PI * -45)
  css3Object.rotateY(0.1)
  // css3Object.position.set(0, 1, 0)

  return css3Object
}