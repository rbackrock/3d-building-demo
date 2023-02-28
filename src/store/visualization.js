import {
  ref
} from 'vue'
import { defineStore } from 'pinia'

export const viewType = {
  // 默认实图
  defaultView: 'defaultView',
  // 一层楼视图
  groundFloorView: 'groundFloorView',
  // 二层楼视图
  secondFloorView: 'secondView',
  // 三层楼视图
  thirdFloorView: 'thirdView',
  // 四层楼视图
  fourFloorView: 'fourView',
  // 拆解视图
  disassembleView: 'disassembleView'
}

export default defineStore('visualization', () => {
  // 加载提示
  const isLoading = ref(true)
  // 当前查看视图
  const currentViewType = ref(viewType.defaultView)

  function setIsloading(is) {
    isLoading.value = is
  }

  function setCurrentViewType(type) {
    currentViewType.value = type
  }

  return {
    isLoading,
    currentViewType,
    setIsloading,
    setCurrentViewType
  }
})
