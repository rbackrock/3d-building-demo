import sourceType from './sourceType'

export const sources = {
  environmentMapTexture: 'environmentMapTexture'
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
  // {
  //   name: 'gltfModel',
  //   type: sourceType.GLTFMODEL,
  //   path: [
  //     // '/factory-demo-1/models/factory-area.glb'
  //     'http://cdn.rback.fun/factory-demo-1/factory-area.glb'
  //   ]
  // },
  // {
  //   name: 'fireImage',
  //   type: sourceType.TEXTURE,
  //   path: [
  //     // '/factory-demo-1/images/fire.png'
  //     'http://cdn.rback.fun/factory-demo-1/fire.png'
  //   ]
  // }
]