import {
  CSS2DObject
} from 'three/examples/jsm/renderers/CSS2DRenderer'
import {
  layers
} from '../../Camera'

export function createMachineCoreInfoMesh() {
  const coreLabelElement = document.querySelector('#machine-core-label-hook')
  const coreHtmlObject = new CSS2DObject(coreLabelElement)
  coreHtmlObject.name = 'machineCoreInfo'
  coreHtmlObject.layers.set(layers.DISASSEMBLE)

  return coreHtmlObject
}

export function createMachineShellInfoMesh() {
  const shellLabelElement = document.querySelector('#machine-shell-label-hook')
  const shellHtmlObject = new CSS2DObject(shellLabelElement)
  shellHtmlObject.name = 'machineShellInfo'
  shellHtmlObject.layers.set(layers.DISASSEMBLE)

  return shellHtmlObject
}

export function createMachineBaseInfoMesh() {
  const baseLabelElement = document.querySelector('#machine-base-label-hook')
  const baseHtmlObject = new CSS2DObject(baseLabelElement)
  baseHtmlObject.name = 'machineBaseInfo'
  baseHtmlObject.layers.set(layers.DISASSEMBLE)

  return baseHtmlObject
}