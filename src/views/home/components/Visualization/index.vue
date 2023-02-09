<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

import load from './ThreeDimensional/resources/index'
import ThreeDimensional from './ThreeDimensional'
import { cameraType } from './ThreeDimensional/Camera'

let threeDimensional = null
let world = null
const viewType = {
  defaultView: 'defaultView',
  groundFloorView: 'groundFloorView',
  secondView: 'secondView',
  thirdView: 'thirdView',
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

      <div class="left-container">
        <div class="content">假装有数据</div>
      </div>
      <div class="right-container">
        <div class="content">假装有数据</div>
      </div>

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
                :class="{ active: viewType.secondView === currentType }"
                @click="handlerChangeView(viewType.secondView)"
              >
                <div class="icon"></div>
                <div class="text">二层楼</div>
              </div>
            </li>
            <li class="item">
              <div class="item-wrapper"
                :class="{ active: viewType.thirdView === currentType }"
                @click="handlerChangeView(viewType.thirdView)"
              >
                <div class="icon"></div>
                <div class="text">三层楼</div>
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
    </div>

    <!-- loading -->
    <div class="loading-3d" :class="{ close: !isLoading }" id="loading-3d">资源加载中...</div>
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

    .left-container {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 16%;
      height: calc(94vh);
      color: rgb(179, 203, 235);

      background-image: url(./images/left.png);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;

      .content {
        padding: 30px 0;
        text-align: center;
      }
    }

    .right-container{
      position: fixed;
      right: 0;
      bottom: 0;
      width: 16%;
      height: calc(94vh);
      color: rgb(179, 203, 235);

      background-image: url(./images/right.png);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;

      .content {
        padding: 30px 0;
        text-align: center;
      }
    }

    .bottom-buttons{
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
  }
}
</style>
