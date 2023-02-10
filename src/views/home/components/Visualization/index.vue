<script setup>
import {
  ref,
  reactive,
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
  fourView: 'fourView',
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
      <div>
        <div
          class="left-container"
          :class="{ show: currentType === viewType.defaultView, hide: currentType !== viewType.defaultView }"
        >
          <div class="content">默认-假装有数据</div>
        </div>
        <div
          class="right-container"
          :class="{ show: currentType === viewType.defaultView, hide: currentType !== viewType.defaultView }"
        >
          <div class="content">默认-假装有数据</div>
        </div>
      </div>

      <!-- 一层楼 -->
      <div>
        <div
          class="left-container"
          :class="{ show: currentType === viewType.groundFloorView, hide: currentType !== viewType.groundFloorView }"
        >
          <div class="content">默认-假装有数据</div>
        </div>
        <div
          class="right-container"
          :class="{ show: currentType === viewType.groundFloorView, hide: currentType !== viewType.groundFloorView }"
        >
          <div class="content">默认-假装有数据</div>
        </div>
      </div>

      <!-- 二层楼 -->
      <div>
        <div
          class="left-container"
          :class="{ show: currentType === viewType.secondView, hide: currentType !== viewType.secondView }"
        >
          <div class="content">二层楼-假装有数据</div>
        </div>
        <div
          class="right-container"
          :class="{ show: currentType === viewType.secondView, hide: currentType !== viewType.secondView }"
        >
          <div class="content">二层楼-假装有数据</div>
        </div>
      </div>

      <!-- 三层楼 -->
      <div>
        <div
          class="left-container"
          :class="{ show: currentType === viewType.thirdView, hide: currentType !== viewType.thirdView }"
        >
          <div class="content">三层楼-假装有数据</div>
        </div>
        <div
          class="right-container"
          :class="{ show: currentType === viewType.thirdView, hide: currentType !== viewType.thirdView }"
        >
          <div class="content">三层楼-假装有数据</div>
        </div>
      </div>

      <!-- 四层楼 -->
      <div>
        <div
          class="left-container"
          :class="{ show: currentType === viewType.fourView, hide: currentType !== viewType.fourView }"
        >
          <div class="content">四层楼-假装有数据</div>
        </div>
        <div
          class="right-container"
          :class="{ show: currentType === viewType.fourView, hide: currentType !== viewType.fourView }"
        >
          <div class="content">四层楼-假装有数据</div>
        </div>
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
                :class="{ active: viewType.fourView === currentType }"
                @click="handlerChangeView(viewType.fourView)"
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
    <div id="machine-core-label-hook" class="machine-label-container">
      <div class="three-label-container-wrapper">
        <div class="title-container">
          <div class="title-container-wrapper">
            <div class="room-id"># 机器</div>
            <div class="room-name">核心</div>
          </div>
        </div>
        <div class="icon-container">
          <div class="icon-container-wrapper">
            <div class="fan-container">
              <div class="fan-part1"></div>
              <div class="fan-part2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="machine-shell-label-hook" class="machine-label-container">
      <div class="three-label-container-wrapper">
        <div class="title-container">
          <div class="title-container-wrapper">
            <div class="room-id"># 机器</div>
            <div class="room-name">外壳</div>
          </div>
        </div>
        <div class="icon-container">
          <div class="icon-container-wrapper">
            <div class="fan-container">
              <div class="fan-part1"></div>
              <div class="fan-part2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="machine-base-label-hook" class="machine-label-container">
      <div class="three-label-container-wrapper">
        <div class="title-container">
          <div class="title-container-wrapper">
            <div class="room-id"># 机器</div>
            <div class="room-name">基座</div>
          </div>
        </div>
        <div class="icon-container">
          <div class="icon-container-wrapper">
            <div class="fan-container">
              <div class="fan-part1"></div>
              <div class="fan-part2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

    .left-container {
      position: fixed;
      bottom: 0;
      width: 18%;
      height: calc(94vh);
      color: rgb(179, 203, 235);

      background-image: url(./images/left.png);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;

      transition: all 0.6s;

      &.show {
        left: 0;
        opacity: 1;
      }

      &.hide {
        left: -18%;
        opacity: 0;
      }

      .content {
        padding: 30px 0;
        text-align: center;
      }
    }

    .right-container{
      position: fixed;
      right: 0;
      bottom: 0;
      width: 18%;
      height: calc(94vh);
      color: rgb(179, 203, 235);

      background-image: url(./images/right.png);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;

      transition: all 0.6s;

      &.show {
        right: 0;
        opacity: 1;
      }

      &.hide {
        right: -18%;
        opacity: 0;
      }

      .content {
        padding: 30px 0;
        text-align: center;
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

.machine-label-container {
  width: 200px;
  // height: 100%;
  color: #00deff;
  display: none;

  &.visible {
    display: block;
  }

  .three-label-container-wrapper {
    width: 100%;
    height: 100%;

    .title-container {
      background-image: url('/3d/images/label/text-box.svg#svgView(preserveAspectRatio(none))');
      background-repeat: no-repeat;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;

      .title-container-wrapper {
        text-align: center;
        pointer-events: all;
        cursor: pointer;

        .room-id {
          padding: 2% 0 0 0;
          font-size: 1.4em;
        }

        .room-name {
          font-size: 1.2em;
          padding: 2% 0 5% 0;
        }
      }
    }

    .icon-container {
      .icon-container-wrapper {
        position: relative;

        .fan-container {
          .fan-part1 {
            width: 60px;
            height: 60px;
            margin: 0 auto;
            background-image: url('/3d/images/label/fan-part1.svg#svgView(preserveAspectRatio(none))');
            background-repeat: no-repeat;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
            animation: fan-rotate 1.3s infinite;
            animation-fill-mode: forwards;
            animation-timing-function: linear;
          }
        }

        .cctv-container {
          position: absolute;
          top: 0;
          right: 0;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: flex-start;

          .cctv-wrapper {
            width: 40px;
            height: 40px;
            // margin: 0 auto;
            background-image: url('/3d/images/label/cctv.svg#svgView(preserveAspectRatio(none))');
            background-repeat: no-repeat;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
            pointer-events: all;
            cursor: pointer;
          }
          
        }
      }
    }
  }
}
</style>
