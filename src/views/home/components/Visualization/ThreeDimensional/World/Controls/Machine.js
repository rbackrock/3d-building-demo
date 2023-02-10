import {
  importMeshLastName
} from '../../Utils'

export default class Machine {
  constructor(mesh) {
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
  }

  disassemble() {
    const {
      core,
      shell,
      base
    } = this.machine

    core.mesh.position.set(core.mesh.position.x, core.mesh.position.y, core.mesh.position.z)
    shell.mesh.position.set(shell.mesh.position.x, shell.mesh.position.y + 2, shell.mesh.position.z)
    base.mesh.position.set(base.mesh.position.x, base.mesh.position.y - 2, base.mesh.position.z)
  }

  combine() {
    const {
      core,
      shell,
      base
    } = this.machine

    core.mesh.position.copy(core.originPosition)
    shell.mesh.position.copy(shell.originPosition)
    base.mesh.position.copy(base.originPosition)
  }
}