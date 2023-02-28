import * as THREE from 'three'
import {  CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js'
import gsap from 'gsap'

import {
  layers
} from '../../Camera'

export default class ScienceBuildingInfo {
  constructor(infoMesh) {
    this.infoMesh = infoMesh

    const animation = {
      value: -0.09
    }

    this.rotateAnimation = gsap.to(animation, {
      value: 0.09,
      duration: 1,
      yoyo: true,
      repeat: -1,
      onUpdate: () => {
        this.infoMesh.rotation.set(0, animation.value, 0)
      }
    })
  }

  destroy() {
    if (this.rotateAnimation) {
      this.rotateAnimation.kill()
      this.rotateAnimation = null
    }
  }
}