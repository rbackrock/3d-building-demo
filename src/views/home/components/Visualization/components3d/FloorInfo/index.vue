<script setup>
  import * as echarts from 'echarts'
  import {
    onMounted,
    onBeforeUnmount,
    watch,
    nextTick
  } from 'vue'
  import {
    store
  } from '../../sotre'

  let chart1 = null
  let chart2 = null

  watch(store.isLoading, async (newIsLoadingValue, oldIsLoadingValue) => {
    if (newIsLoadingValue === false) {
      initChart1()
      initChart2()

      await nextTick()
      chart1.resize()
      chart2.resize()
    }
  })

  function initChart1() {
    chart1 = echarts.init(document.getElementById('chart-1-hook'))
    chart1.setOption({
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      grid: {
        top: '9%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: '#ffffff'
          },
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            color: '#ffffff'
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: 'Line 1',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [140, 232, 101, 264, 90, 340, 250]
        },
        {
          name: 'Line 2',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(0, 221, 255)'
              },
              {
                offset: 1,
                color: 'rgb(77, 119, 255)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 282, 111, 234, 220, 340, 310]
        },
        {
          name: 'Line 3',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)'
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 132, 201, 334, 190, 130, 220]
        },
        {
          name: 'Line 4',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 0, 135)'
              },
              {
                offset: 1,
                color: 'rgb(135, 0, 157)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 402, 231, 134, 190, 230, 120]
        },
        {
          name: 'Line 5',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 191, 0)'
              },
              {
                offset: 1,
                color: 'rgb(224, 62, 76)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 302, 181, 234, 210, 290, 150]
        }
      ]
    })
  }

  function initChart2() {
    chart2 = echarts.init(document.getElementById('chart-2-hook'))
    chart2.setOption({
      // title: {
      //   text: 'Customized Pie',
      //   left: 'center',
      //   top: 20,
      //   textStyle: {
      //     color: '#ccc'
      //   }
      // },
      // tooltip: {
      //   trigger: 'item'
      // },
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
            { value: 335, name: 'Direct' },
            { value: 310, name: 'Email' },
            { value: 274, name: 'Union Ads' },
            { value: 235, name: 'Video Ads' },
            { value: 400, name: 'Search Engine' }
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

  onMounted(() => {
  })

  onBeforeUnmount(() => {
    if (chart1 && chart1.isDisposed) {
      chart1.dispose()
    }

    if (chart2 && chart2.isDisposed) {
      chart2.dispose()
    }
  })
</script>

<template>
  <div id="floor-info-container-list-hook" class="floor-info-container" :class="{ hide: store.isLoading.value === true }">
    <div class="floor-info-container-wrapper">
      <table class="list-container">
        <tr>
          <th>型号</th>
          <th>类型</th>
          <th>类型1</th>
          <th>类型2</th>
          <th>类型3</th>
        </tr>
        <tbody>
          <tr>
            <td>NO-1</td>
            <td>消防</td>
            <td>value1</td>
            <td>value2</td>
            <td>value3</td>
          </tr>
          <tr>
            <td>NO-2</td>
            <td>消防</td>
            <td>value1</td>
            <td>value2</td>
            <td>value3</td>
          </tr>
          <tr>
            <td>NO-3</td>
            <td>烟感</td>
            <td>value1</td>
            <td>value2</td>
            <td>value3</td>
          </tr>
        </tbody>
      </table>

      <!-- echart -->
      <div id="chart-1-hook" class="chart-1" />
      <div id="chart-2-hook" class="chart-2" />
    </div>
  </div>
</template>

<style lang="less" scoped>
  .floor-info-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    height: 520px;
    font-size: 12px;
    color: #ffffff;
    // border: 1px solid #ff0000;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 3px;
    z-index: 1;

    &.hide {
      display: none;
    }

    .floor-info-container-wrapper {
      padding: 5px;
      width: 100%;
      height: 100%;
      
      .list-container {
        width: 100%;
        text-align: center;

        tbody {
          tr td {
            padding: 2px 0;
            text-shadow: -4px -4px 9px #ffffff;
          }

          tr:hover {
            color: #ffffff;
            cursor: pointer;
            background: #ff0000;
            transform: scale(1.1);
          }
        }
      }

      .chart-1 {
        width: 100%;
        height: 200px;
      }

      .chart-2 {
        width: 100%;
        height: 200px;
      }
    }
  }
</style>
