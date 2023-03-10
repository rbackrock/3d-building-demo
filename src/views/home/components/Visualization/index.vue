<script setup>
import { storeToRefs } from 'pinia'
import {
  onMounted,
  onBeforeUnmount,
  watch
} from 'vue'

import useVisualizationStore, {
  viewType
} from '@/store/visualization'

import DefaultViewStatistics from './components/DefaultViewStatistics/index.vue'
import GroundFloorViewStatistics from './components/GroundFloorViewStatistics/index.vue'
import SecondFloorViewStatistics from './components/SecondFloorViewStatistics/index.vue'
import ThirdFloorViewStatistics from './components/ThirdFloorViewStatistics/index.vue'
import FourFloorViewStatistics from './components/FourFloorViewStatistics/index.vue'

import Machinelabel from './components3d/Machinelabel/index.vue'
import ScienceBuilding from './components3d/ScienceBuilding/index.vue'

import load from './ThreeDimensional/resources/index'
import ThreeDimensional from './ThreeDimensional'

const store = useVisualizationStore()
const {
  currentViewType,
  selectedOutlinePassMeshId
} = storeToRefs(store)
let threeDimensional = null
let world = null

onMounted(async () => {
  const resources = await load()
  threeDimensional = new ThreeDimensional(document.querySelector('canvas.webgl'), resources)
  world = threeDimensional.wolrd
  store.setIsloading(false)

  world.setActiveDefaultView()
})

onBeforeUnmount(() => {
  if (threeDimensional) {
    threeDimensional.destroy()
  }
})

watch(selectedOutlinePassMeshId, newSelectedMeshId => {
  if (viewType.groundFloorView === currentViewType.value) {
    world.controls.groundFloor.addOutlinePass(newSelectedMeshId)
  } else if (viewType.secondFloorView === currentViewType.value) {
    world.controls.secondFloor.addOutlinePass(newSelectedMeshId)
  } else if (viewType.thirdFloorView === currentViewType.value) {
    world.controls.thirdFloor.addOutlinePass(newSelectedMeshId)
  } else if (viewType.fourFloorView === currentViewType.value) {
    world.controls.fourFloor.addOutlinePass(newSelectedMeshId)
  }
})

function handlerChangeView(type) {
  if (world) {
    store.setCurrentViewType(type)
    world.restoreFloor()

    if (type === viewType.disassembleView) {
      world.setActiveMachineView()
    } else if (type === viewType.defaultView) {
      world.setActiveDefaultView()
    } else if (type === viewType.groundFloorView) {
      world.setActiveGroundFloorView()
      world.controls.groundFloor.setEffect()
    } else if (type === viewType.secondFloorView) {
      world.setActiveSecondFloorView()
      world.controls.secondFloor.setEffect()
    } else if (type === viewType.thirdFloorView) {
      world.setActiveThirdFloorView()
      world.controls.thirdFloor.setEffect()
    } else if (type === viewType.fourFloorView) {
      world.setActiveFourFloorView()
      world.controls.fourFloor.setEffect()
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
        <div class="text">???????????????</div>
      </div>

      <!-- ?????? -->
      <DefaultViewStatistics
        :is-view="store.currentViewType === viewType.defaultView"
      />

      <!-- ????????? -->
      <GroundFloorViewStatistics
        :is-view="store.currentViewType === viewType.groundFloorView"
      />

      <!-- ????????? -->
      <SecondFloorViewStatistics
        :is-view="store.currentViewType === viewType.secondFloorView"
      />

      <!-- ????????? -->
      <ThirdFloorViewStatistics
        :is-view="store.currentViewType === viewType.thirdFloorView"
      />

      <!-- ????????? -->
      <FourFloorViewStatistics
        :is-view="store.currentViewType === viewType.fourFloorView"
      />

      <!-- ???????????? -->
      <div class="bottom-buttons">
        <div class="buttons-wrapper">
          <ul class="list">
            <li class="item">
              <div class="item-wrapper"
                :class="{ active: viewType.defaultView === store.currentViewType }"
                @click="handlerChangeView(viewType.defaultView)"
              >
                <div class="icon"></div>
                <div class="text">????????????</div>
              </div>
            </li>
            <li class="item">
              <div class="item-wrapper"
                :class="{ active: viewType.groundFloorView === store.currentViewType }"
                @click="handlerChangeView(viewType.groundFloorView)"
              >
                <div class="icon"></div>
                <div class="text">?????????</div>
              </div>
            </li>
            <li class="item">
              <div class="item-wrapper"
                :class="{ active: viewType.secondFloorView === store.currentViewType }"
                @click="handlerChangeView(viewType.secondFloorView)"
              >
                <div class="icon"></div>
                <div class="text">?????????</div>
              </div>
            </li>
            <li class="item">
              <div class="item-wrapper"
                :class="{ active: viewType.thirdFloorView === store.currentViewType }"
                @click="handlerChangeView(viewType.thirdFloorView)"
              >
                <div class="icon"></div>
                <div class="text">?????????</div>
              </div>
            </li>
            <li class="item">
              <div class="item-wrapper"
                :class="{ active: viewType.fourFloorView === store.currentViewType }"
                @click="handlerChangeView(viewType.fourFloorView)"
              >
                <div class="icon"></div>
                <div class="text">?????????</div>
              </div>
            </li>
            <li class="item">
              <div class="item-wrapper"
                :class="{ active: viewType.disassembleView === store.currentViewType }"
                @click="handlerChangeView(viewType.disassembleView)"
              >
                <div class="icon"></div>
                <div class="text">????????????</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- ??????????????? -->
      <div v-show="viewType.disassembleView === store.currentViewType" class="bottom-buttons-disassemble">
        <div class="buttons-wrapper">
          <ul class="list">
            <li class="item">
              <div class="item-wrapper"
                @click="handlerChangeDisassemble(true)"
              >
                <div class="icon"></div>
                <div class="text">??????</div>
              </div>
            </li>
            <li class="item">
              <div class="item-wrapper"
                @click="handlerChangeDisassemble(false)"
              >
                <div class="icon"></div>
                <div class="text">??????</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- loading -->
    <div class="loading-3d" :class="{ close: !store.isLoading }" id="loading-3d">???????????????...</div>

    <!-- main building info css3 render -->
    <ScienceBuilding />

    <!-- machine css3 render -->
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
