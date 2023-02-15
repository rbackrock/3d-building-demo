import {
  reactive, ref
} from 'vue'

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

export const store = {
  // state

  // 加载提示
  isLoading: ref(true),
  // 当前查看视图
  currentViewType: ref(viewType.defaultView),

  // method

  // 设置加载状态
  setIsloading(is) {
    this.isLoading.value = is
  },

  // 设置当前观看视图
  setCurrentViewType(type) {
    this.currentViewType.value = type
  }
}
