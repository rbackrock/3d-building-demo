<script setup>
  import * as echarts from 'echarts'
  import {
    store
  } from '../../sotre'
  import {
    ref,
    watch,
    onMounted,
    onBeforeUnmount,
    nextTick
  } from 'vue'

  const scienceBuildingInfoCssRenderRef = ref(null)
  let chartInstance = null

  watch(store.isLoading, async (newIsLoadingValue, oldIsLoadingValue) => {
    await nextTick()
    initChart()
  })

  onMounted(() => {
  })

  onBeforeUnmount(() => {
    if (chartInstance) {
      chartInstance.dispose()
    }
  })

  function initChart() {
    chartInstance = echarts.init(scienceBuildingInfoCssRenderRef.value)
    chartInstance.setOption({
      title: {
        text: '科技楼设备占比统计',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
            { value: 335, name: '消防箱' },
            { value: 310, name: '消防柜' },
            { value: 274, name: '烟感器' },
          ].sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          label: {
            color: 'rgba(255, 255, 255, 1)'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 1)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    })
  }

</script>

<template>
  <div id="science-building-css-render-hook" class="view-container" :class="{ hide: store.isLoading.value === true }">
    <div ref="scienceBuildingInfoCssRenderRef" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<style lang="less" scoped>
  .view-container {
    width: 400px;
    height: 400px;
    font-size: 12px;
    color: #ffffff;
    background: rgba(80, 58, 159, 0.8);
    border-radius: 3px;

    &.hide {
      display: none;
    }
  }
</style>
