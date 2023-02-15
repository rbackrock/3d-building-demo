<script setup>
import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount
} from 'vue'

import DefaultViewStatistics from './components/DefaultViewStatistics/index.vue'
import GroundFloorViewStatistics from './components/GroundFloorViewStatistics/index.vue'
import SecondFloorViewStatistics from './components/SecondFloorViewStatistics/index.vue'
import ThirdFloorViewStatistics from './components/ThirdFloorViewStatistics/index.vue'
import FourFloorViewStatistics from './components/FourFloorViewStatistics/index.vue'
import Machinelabel from './componentsForCssRender/Machinelabel/index.vue'

import load from './ThreeDimensional/resources/index'
import ThreeDimensional from './ThreeDimensional'
import { cameraType } from './ThreeDimensional/Camera'

let threeDimensional = null
let world = null
const viewType = {
  defaultView: 'defaultView',
  groundFloorView: 'groundFloorView',
  secondFloorView: 'secondView',
  thirdFloorView: 'thirdView',
  fourFloorView: 'fourView',
  disassembleView: 'disassembleView'
}

const isLoading = ref(true)
const currentType = ref(viewType.defaultView)

onMounted(async () => {
  const resources = await load()
  threeDimensional = new ThreeDimensional(document.querySelector('canvas.webgl'), resources)
  world = threeDimensional.wolrd
  isLoading.value = false
})

onBeforeUnmount(() => {
  if (threeDimensional) {
    threeDimensional.destroy()
  }
})

function handlerChangeView(type) {
  if (world) {
    currentType.value = type

    if (type === viewType.disassembleView) {
      world.camera.setActiveCamera(cameraType.DISASSEMBLE)
    } else {
      world.camera.setActiveCamera(cameraType.STANDARD)
    }
  }
}

function handlerChangeDisassemble(isDisassemble) {
  if (isDisassemble) {
    world.controls.machine.disassemble()
  } else {
    world.controls.machine.combine()
  }
}
</script>

<template>
  <div class="main-container">
    <!-- 3d -->
    <div class="canvas-3d-container">
      <canvas class="webgl"></canvas>
    </div>

    <!-- ui -->
    <div class="ui-container">
      <div class="header">
        <div class="text">假装有标题</div>
      </div>

      <!-- 默认 -->
      <DefaultViewStatistics
        :is-view="currentType === viewType.defaultView"
      />

      <!-- 一层楼 -->
      <GroundFloorViewStatistics
      :is-view="currentType === viewType.groundFloorView"
      />

      <!-- 二层楼 -->
      <SecondFloorViewStatistics
        :is-view="currentType === viewType.secondFloorView"
      />

      <!-- 三层楼 -->
      <ThirdFloorViewStatistics
        :is-view="currentType === viewType.thirdFloorView"
      />

      <!-- 四层楼 -->
      <FourFloorViewStatistics
        :is-view="currentType === viewType.fourFloorView"
      />

      <!-- 底部按钮 -->
      <div class="bottom-buttons">
        <div class="buttons-wrapper">
          <ul class="list">
            <li class="item">
              <div class="item-wrapper"
                :class="{ active: viewType.defaultView === currentType }"
                @click="handlerChangeView(viewType.defaultView)"
              >
                <div class="icon"></div>
                <div class="text">默认视角</div>
              </div>
            </li>
            <li class="item">
              <div class="item-wrapper"
                :class="{ active: viewType.groundFloorView === currentType }"
                @click="handlerChangeView(viewType.groundFloorView)"
              >
                <div class="icon"></div>
                <div class="text">一层楼</div>
              </div>
            </li>
            <li class="item">
              <div class="item-wrapper"
                :class="{ active: viewType.secondFloorView === currentType }"
                @click="handlerChangeView(viewType.secondFloorView)"
              >
                <div class="icon"></div>
                <div class="text">二层楼</div>
              </div>
            </li>
            <li class="item">
              <div class="item-wrapper"
                :class="{ active: viewType.thirdFloorView === currentType }"
                @click="handlerChangeView(viewType.thirdFloorView)"
              >
                <div class="icon"></div>
                <div class="text">三层楼</div>
              </div>
            </li>
            <li class="item">
              <div class="item-wrapper"
                :class="{ active: viewType.fourFloorView === currentType }"
                @click="handlerChangeView(viewType.fourFloorView)"
              >
                <div class="icon"></div>
                <div class="text">四层楼</div>
              </div>
            </li>
            <li class="item">
              <div class="item-wrapper"
                :class="{ active: viewType.disassembleView === currentType }"
                @click="handlerChangeView(viewType.disassembleView)"
              >
                <div class="icon"></div>
                <div class="text">拆解场景</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 拆建按钮组 -->
      <div v-show="viewType.disassembleView === currentType" class="bottom-buttons-disassemble">
        <div class="buttons-wrapper">
          <ul class="list">
            <li class="item">
              <div class="item-wrapper"
                @click="handlerChangeDisassemble(true)"
              >
                <div class="icon"></div>
                <div class="text">拆解</div>
              </div>
            </li>
            <li class="item">
              <div class="item-wrapper"
                @click="handlerChangeDisassemble(false)"
              >
                <div class="icon"></div>
                <div class="text">合并</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- loading -->
    <div class="loading-3d" :class="{ close: !isLoading }" id="loading-3d">资源加载中...</div>

    <!-- machine-label -->
    <Machinelabel />
  </div>
</template>

<style lang="less" scoped>
@media (min-width: 1300px) {
  .main-container {
    font-size: 14px
  }
}

@media (min-width: 1900px) {
  .main-container {
    font-size: 16px
  }
}

@keyframes fan-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.main-container {
  width: 100%;
  height: 100%;
  position: relative;

  .loading-3d {
    // display: none;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    padding: 10px 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;

    &.close {
      display: none;
    }
  }

  .canvas-3d-container {
    position: relative;
    width: 100%;
    height: 100%;

    .webgl {
      display: block;
    }
  }

  .ui-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;

    .header {
      width:100%;
      height: 6vh;
      background-image: url(./images/top.png);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;

      .text {
        height: 100%;
        line-height: 6vh;
        text-align: center;
        color: #fff;
        font-size: 2em;
      }
    }

    .bottom-buttons {
      position: fixed;
      bottom: 3vh;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(0deg, #1e202a 0%, #0d1013 100%);
      border: 1px solid #505050;
      border-radius: 4px;
      opacity: 0.7;
      border-radius: 4px;

      .buttons-wrapper {
        padding: 5px;

        .list {
          display: flex;
          align-items: center;
          justify-content: center;

          .item {
            padding: 5px;
            width: 82px;
            height: 82px;

            .item-wrapper {
              padding: 10px 0;
              border: 1px solid #313642;
              cursor: pointer;

              &.active {
                border: 1px solid #ff762a;
              }

              .icon {
                width: 26px;
                height: 26px;
                margin: 0 auto;
                background-image: url(./images/bottom-buttons/01.png);
                background-repeat: no-repeat;
                background-position: center center;
                background-size: 100% 100%;
              }

              .text {
                padding: 5px 0 0 0;
                font-weight: 400;
                color: #fbfbfb;
                text-align: center;
                font-size: 0.8em;
              }
            }
          }
        }
      }
    }

    .bottom-buttons-disassemble {
      position: fixed;
      bottom: 16vh;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(0deg, #1e202a 0%, #0d1013 100%);
      border: 1px solid #505050;
      border-radius: 4px;
      opacity: 0.7;
      border-radius: 4px;

      .buttons-wrapper {
        padding: 5px;

        .list {
          display: flex;
          align-items: center;
          justify-content: center;

          .item {
            padding: 5px;
            width: 82px;
            height: 82px;

            .item-wrapper {
              padding: 10px 0;
              border: 1px solid #313642;
              cursor: pointer;

              &.active {
                border: 1px solid #ff762a;
              }

              .icon {
                width: 26px;
                height: 26px;
                margin: 0 auto;
                background-image: url(./images/bottom-buttons/01.png);
                background-repeat: no-repeat;
                background-position: center center;
                background-size: 100% 100%;
              }

              .text {
                padding: 5px 0 0 0;
                font-weight: 400;
                color: #fbfbfb;
                text-align: center;
                font-size: 0.8em;
              }
            }
          }
        }
      }
    }
  }
}
</style>
