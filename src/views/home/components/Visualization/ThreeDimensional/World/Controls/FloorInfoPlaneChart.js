import gsap from 'gsap'

export default class FloorInfoPlaneChart {
  constructor(mesh) {
    this.mesh = mesh

    const animation = {
      value: -0.09
    }

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

  destroy() {
    if (this.rotateAnimation) {
      this.rotateAnimation.kill()
      this.rotateAnimation = null
    }
  }
}