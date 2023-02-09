import sourceType from './sourceType'

export const sources = {
  environmentMapTexture: 'environmentMapTexture',
  machineGltf: 'machineGltf'
}

export default [
  {
    name: sources.environmentMapTexture,
    type: sourceType.CUBE_TEXTURE,
    path:[
      '/3d/images/sky-box/daytime/posx.jpg',
      '/3d/images/sky-box/daytime/negx.jpg',
      '/3d/images/sky-box/daytime/posy.jpg',
      '/3d/images/sky-box/daytime/negy.jpg',
      '/3d/images/sky-box/daytime/posz.jpg',
      '/3d/images/sky-box/daytime/negz.jpg',
    ]
  },
  {
    name: sources.machineGltf,
    type: sourceType.GLTFMODEL,
    path: [
      '/3d/models/machine.glb'
    ]
  },
  // {
  //   name: 'fireImage',
  //   type: sourceType.TEXTURE,
  //   path: [
  //     // '/factory-demo-1/images/fire.png'
  //     'http://cdn.rback.fun/factory-demo-1/fire.png'
  //   ]
  // }
]