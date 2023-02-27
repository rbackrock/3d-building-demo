import * as THREE from 'three'
import {  CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js'
import gsap from 'gsap'

export default class ScienceBuildingInfo {
  constructor(chartMarkerMesh) {
    this.chartMarkerMesh = chartMarkerMesh

    const animation = {
      value: -0.09
    }

    // 设置位置
    const scienceBuildingMarkerPosition = new THREE.Vector3()
    scienceBuildingMarkerPosition.copy(this.chartMarkerMesh.position)
    this.mesh = this.createScienceBuildingMesh(scienceBuildingMarkerPosition)

    this.rotateAnimation = gsap.to(animation, {
      value: 0.09,
      duration: 1,
      yoyo: true,
      repeat: -1,
      onUpdate: () => {
        this.mesh.rotation.set(0, animation.value, 0)
      }
    })
  }

  createScienceBuildingMesh(position) {
    const size = 0.016
    const css3Object = new CSS3DObject(document.querySelector('#science-building-css-render-hook'))
    css3Object.scale.set(size, size, size)
    css3Object.position.copy(position)
    css3Object.rotateY(0.1)

    return css3Object
  }

  getScienceBuildingMesh() {
    return this.mesh
  }

  destroy() {
    if (this.rotateAnimation) {
      this.rotateAnimation.kill()
      this.rotateAnimation = null
    }
  }
}