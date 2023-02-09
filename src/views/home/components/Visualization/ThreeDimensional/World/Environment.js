import * as THREE from 'three'

import ThreeDimensional from '../index'
import {
  sources
} from '../resources/sources'

class Environment {
  constructor() {
    this.threeDimensional = new ThreeDimensional()
    this.scene = this.threeDimensional.scene
    this.resources = this.threeDimensional.resources

    this.setEnvironmentMap()
  }

  setEnvironmentMap() {
    const environmentMap = this.resources[sources.environmentMapTexture]
    environmentMap.encoding = THREE.sRGBEncoding

    this.scene.background = environmentMap
    this.scene.environment = environmentMap
  }
}

export default Environment
