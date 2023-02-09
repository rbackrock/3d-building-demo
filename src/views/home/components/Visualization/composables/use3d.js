import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import load from '../ThreeDimensional/resources/index'
import ThreeDimensional from '../ThreeDimensional'

export default function use3d() {
  let threeDimensional = null
  const isLoading = ref(true)

  onMounted(async () => {
    const resources = await load()
    threeDimensional = new ThreeDimensional(document.querySelector('canvas.webgl'), resources)
    isLoading.value = false
  })
  
  onBeforeUnmount(() => {
    if (threeDimensional) {
      threeDimensional.destroy()
    }
  })

  return {
    isLoading,
    threeDimensional
  }
}