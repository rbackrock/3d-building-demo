import * as THREE from 'three'
import {
  CSS2DObject
} from 'three/examples/jsm/renderers/CSS2DRenderer'
import gsap from 'gsap'

import {
  importMeshLastName
} from '../../Utils'
import ThreeDimensional from '../../index'

export default class Machine {
  constructor(mesh) {
    this.threeDimensional = new ThreeDimensional()
    this.mesh = mesh
    this.machine = {
    }

    this.mesh.traverse(child => {
      if (importMeshLastName(child.name) === 'core') {
        this.machine.core = {
          mesh: child,
          originPosition: child.position.clone()
        }
      } else if (importMeshLastName(child.name) === 'shell') {
        this.machine.shell = {
          mesh: child,
          originPosition: child.position.clone()
        }
      } else if (importMeshLastName(child.name) === 'base') {
        this.machine.base = {
          mesh: child,
          originPosition: child.position.clone()
        }
      }
    })

    // animation
    this.shellMeshDisassembleAnimation = null
    this.baseMeshDisassembleAnimation = null
    this.shellMeshCombineAnimation = null
    this.baseMeshCombineAnimation = null

    // 设置标签
    // this.setLabel()

    // 是否已经展开
    this.isDisassemble = false
  }

  // setLabel() {
  //   const coreLabelElement = document.querySelector('#machine-core-label-hook')
  //   const coreHtmlObject = new CSS2DObject(coreLabelElement)
  //   coreHtmlObject.layers.set(layers.DISASSEMBLE)
  //   this.machine.core.mesh.add(coreHtmlObject)
    
  //   const shellLabelElement = document.querySelector('#machine-shell-label-hook')
  //   const shellHtmlObject = new CSS2DObject(shellLabelElement)
  //   shellHtmlObject.layers.set(layers.DISASSEMBLE)
  //   this.machine.shell.mesh.add(shellHtmlObject)

  //   const baseLabelElement = document.querySelector('#machine-base-label-hook')
  //   const baseHtmlObject = new CSS2DObject(baseLabelElement)
  //   baseHtmlObject.layers.set(layers.DISASSEMBLE)
  //   this.machine.base.mesh.add(baseHtmlObject)
  // }

  // 拆解
  disassemble() {
    if (this.isDisassemble === false) {
      const {
        shell,
        base
      } = this.machine
      const shellEndPosition = new THREE.Vector3(shell.mesh.position.x, shell.mesh.position.y + 3, shell.mesh.position.z)
      const baseEndPosition = new THREE.Vector3(base.mesh.position.x, base.mesh.position.y - 2, base.mesh.position.z)
  
      this.shellMeshDisassembleAnimation = gsap.to(shell.mesh.position, {
        x: shellEndPosition.x,
        y: shellEndPosition.y,
        z: shellEndPosition.z,
        duration: 0.6,
        onComplete() {
          document.querySelector('#machine-core-label-hook').classList.add('visible')
          document.querySelector('#machine-shell-label-hook').classList.add('visible')
        }
      })
  
      this.baseMeshDisassembleAnimation = gsap.to(base.mesh.position, {
        x: baseEndPosition.x,
        y: baseEndPosition.y,
        z: baseEndPosition.z,
        duration: 0.6,
        onComplete() {
          document.querySelector('#machine-base-label-hook').classList.add('visible')
        }
      })

      this.isDisassemble = true
    }
  }

  // 合并
  combine() {
    const {
      shell,
      base
    } = this.machine

    document.querySelector('#machine-core-label-hook').classList.remove('visible')
    document.querySelector('#machine-shell-label-hook').classList.remove('visible')
    document.querySelector('#machine-base-label-hook').classList.remove('visible')

    this.shellMeshCombineAnimation = gsap.to(shell.mesh.position, {
      x: shell.originPosition.x,
      y: shell.originPosition.y,
      z: shell.originPosition.z,
      duration: 0.6,
      onComplete() {
      }
    })

    this.baseMeshCombineAnimation = gsap.to(base.mesh.position, {
      x: base.originPosition.x,
      y: base.originPosition.y,
      z: base.originPosition.z,
      duration: 0.6,
      onComplete() {
      }
    })

    this.isDisassemble = false
  }

  destroy() {
    if (this.shellMeshDisassembleAnimation) {
      this.shellMeshDisassembleAnimation.kill()
      this.shellMeshDisassembleAnimation = null
    }

    if (this.baseMeshDisassembleAnimation) {
      this.baseMeshDisassembleAnimation.kill()
      this.baseMeshDisassembleAnimation = null
    }

    if (this.shellMeshCombineAnimation) {
      this.shellMeshCombineAnimation.kill()
      this.shellMeshCombineAnimation = null
    }

    if (this.baseMeshCombineAnimation) {
      this.baseMeshCombineAnimation.kill()
      this.baseMeshCombineAnimation = null
    }

    document.querySelector('#machine-shell-label-hook').classList.remove('visible')
    document.querySelector('#machine-base-label-hook').classList.remove('visible')
  }
}