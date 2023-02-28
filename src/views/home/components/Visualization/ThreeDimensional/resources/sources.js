import sourceType from './sourceType'

export const sources = {
  environmentMapTexture: 'environmentMapTexture',
  machineGltf: 'machineGltf',
  sceneGltf: 'sceneGltf'
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

      // 'http://cdn.rback.fun/building-demo/posx.jpg',
      // 'http://cdn.rback.fun/building-demo/negx.jpg',
      // 'http://cdn.rback.fun/building-demo/posy.jpg',
      // 'http://cdn.rback.fun/building-demo/negy.jpg',
      // 'http://cdn.rback.fun/building-demo/posz.jpg',
      // 'http://cdn.rback.fun/building-demo/negz.jpg',
    ]
  },
  {
    name: sources.machineGltf,
    type: sourceType.GLTFMODEL,
    path: [
      '/3d/models/machine.glb'
      // 'http://cdn.rback.fun/building-demo/machine.glb'
    ]
  },
  {
    name: sources.sceneGltf,
    type: sourceType.GLTFMODEL,
    path: [
      // '/3d/models/building.glb'
      // '/3d/models/build0004-yasuo-quan.glb'
      'http://cdn.rback.fun/building-demo/building.glb'
      // '/3d/models/building.glb'
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