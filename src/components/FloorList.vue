<script setup>
  import {
    ref,
    reactive,
    onMounted,
    onBeforeUnmount,
    watch,
    nextTick
  } from 'vue'
  import BScroll from '@better-scroll/core'
  import MouseWheel from '@better-scroll/mouse-wheel'
  import useVisualizationStore from '@/store/visualization'

  BScroll.use(MouseWheel)

  const store = useVisualizationStore()
  const showDetail = ref(false)
  const currentRecordNumber = ref('')
  let currentDetail = reactive({})
  const scrollBodyRef = ref(null)
  const props = defineProps({
    isView: {
      type: Boolean,
      required: true,
      default: true
    },
    list: {
      type: Array,
      required: true,
      default: []
    }
  })

  let bs = null

  onMounted(() => {
    bs = new BScroll('.list-content-container', {
      mouseWheel: {
        speed: 20,
        invert: false,
        easeTime: 300
      }
    })
  })

  onBeforeUnmount(() => {
    if (bs) {
      bs.destroy()
    }
  })

  watch(props, async (newProps) => {
    await nextTick()
    if (bs && newProps.isView) {
      bs.refresh()
    }

    if (newProps.isView === false) {
      currentRecordNumber.value = ''
      showDetail.value = false
    }
  })

  function handleShowDetail(row) {
    currentDetail = row.detail
    currentRecordNumber.value = row.number
    showDetail.value = true

    // 设置物体高亮
    store.setSelectedOutlinePassMeshId(row.meshId)
  }

  function handleCloseDetail() {
    showDetail.value = false
    store.setSelectedOutlinePassMeshId('')
  }
</script>

<template>
  <div v-show="props.isView" class="view-container" :class="{ 'fade-out': showDetail }">
    <div class="title">一层楼</div>
    <div class="view-container-wrapper">
      <table class="list-title-container">
        <thead>
          <tr>
            <th class="w-50">设备编号</th>
            <th class="w-50">设备类型</th>
          </tr>
        </thead>
      </table>
      <div ref="scrollBodyRef" class="list-content-container">
        <table  class="list-content">
          <tbody>
            <tr
              v-for="(item, index) in list"
              :key="index"
              :class="{ active: currentRecordNumber === item.number }"
              @click="handleShowDetail(item)"
            >
              <td class="w-50">{{ item.number }}</td>
              <td class="w-50">{{ item.typeName }}</td>
            </tr>

            <tr
              v-for="(item, index) in list"
              :key="index"
              :class="{ active: currentRecordNumber === item.number }"
              @click="handleShowDetail(item)"
            >
              <td class="w-50">{{ item.number }}</td>
              <td class="w-50">{{ item.typeName }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div v-show="props.isView" class="detail-container" :class="{ show: showDetail }">
    <div class="close-container">
      <div class="close-btn" @click="handleCloseDetail">关闭</div>
    </div>
    <div class="detail-container-wrapper">
      <div class="device-info">
        <div class="title">设备状态信息</div>
        <div class="content-container">
          <div class="row">
            <div class="item">
              <div class="name">检测时间：</div>
              <div class="value">{{ currentDetail.lastCheck }}</div>
            </div>
            <div class="item">
              <div class="name">设备状态：</div>
              <div class="value">{{ currentDetail.status }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="check-person">
        <div class="title">巡检人员</div>
        <div class="content-container">
          <div class="avatar" />
          <div class="desc">
            <div class="desc-wrapper">
              <div class="row">
                <div class="item">
                  <div class="name">姓名：</div>
                  <div class="val">{{ currentDetail.userName }}</div>
                </div>
                <div class="item">
                  <div class="name">性别：</div>
                  <div class="val">{{ currentDetail.gender }}</div>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <div class="name">职位：</div>
                  <div class="val">{{ currentDetail.postName }}</div>
                </div>
                <div class="item">
                  <div class="name">部门：</div>
                  <div class="val">{{ currentDetail.department }}</div>
                </div>
              </div>
              <div class="row">
                <!-- <div class="item">
                  <div class="name">性别：</div>
                  <div class="val">男</div>
                </div> -->
                <div class="item">
                  <div class="name">联系电话：</div>
                  <div class="val">{{ currentDetail.phone }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .view-container {
    position: fixed;
    left: 0;
    top: 18%;
    width: 500px;
    height: 620px;
    font-size: 12px;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    transform: translateZ(0) matrix3d(0.754844, -0.19101, -0.627475, 0, 0, -0.956657, 0.291217, 0, 0.655904, 0.219823, -0.277873, 0, 0, 0, -42.5923, 1) translate(0, 0) rotateX(180deg);
    font-size: 18px;
    opacity: 1;

    &.fade-out {
      opacity: 0.3;
    }

    .title {
      padding: 10px 0;
      text-align: center;
      font-size: 26px;
      text-shadow: -4px -4px 9px #fff;
    }

    .view-container-wrapper {
      padding: 5px;
      width: 100%;
      height: calc(100% - 56.5px);

      .list-title-container {
        width: 100%;

        thead {
          tr {
            th {
              padding: 2px 0;
              text-shadow: -4px -4px 9px #fff;
              text-align: center;
            }
          }
        }
      }

      .list-content-container {
        width: 100%;
        height: calc(100% - 33px);
        position: relative;
        overflow: hidden;

        .list-content {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;

          tbody {
            width: 100%;
            position: relative;

            tr {
              td {
                padding: 2px 0;
                text-shadow: -4px -4px 9px #fff;
                text-align: center;
              }

              &:hover {
                color: #fff;
                cursor: pointer;
                background: #ff0000;
                transform: scale(1.1);
              }

              &.active {
                color: #fff;
                cursor: pointer;
                background: #ff0000;
                transform: scale(1.1);
              }
            }
          }
        }
      }
    }
  }

  .detail-container {
    position: fixed;
    left: 0%;
    top: 18%;
    width: 500px;
    height: 620px;
    font-size: 12px;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 6px;
    transform: translateZ(0) matrix3d(0.754844, -0.19101, -0.627475, 0, 0, -0.956657, 0.291217, 0, 0.655904, 0.219823, -0.277873, 0, 0, 0, -42.5923, 1) translate(0, 0) rotateX(180deg);
    font-size: 18px;
    text-shadow: -4px -4px 9px #fff;
    opacity: 0;
    transition: all 0.3s linear;
    visibility: hidden;

    &.show {
      left: 6%;
      opacity: 1;
      visibility: visible;
    }

    .close-container {
      position: relative;
      text-align: right;

      .close-btn {
        display: inline-block;
        position: relative;
        padding: 20px 10px;
        right: 20px;
        font-size: 26px;
        cursor: pointer;
        color: #ff0000;
        text-shadow: -4px -4px 9px #ff0000;
      }
    }
    
    .detail-container-wrapper {
      .device-info {
        .title {
          padding: 0 20px 20px 20px;
          text-align: center;
          font-size: 20px;
        }

        .content-container {
          .row {
            display: flex;
            justify-content: space-around;
            align-items: stretch;

            .item {
              display: flex;
              justify-content: flex-start;
              align-items: stretch;

              .name {
                width: 100px;
                text-align: right;
              }

              .value {
                text-align: center;
              }
            }
          }
        }
      }

      .check-person {
        .title {
          padding: 10px;
          text-align: center;
          font-size: 20px;
        }

        .content-container {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 10px 30px;

          .avatar {
            width: 160px;
            height: 160px;
            background-image: url(./avatar.jpg);
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
          }

          .desc{
            flex: 0 0 calc(100% - 200px);
            padding: 0 20px;

            .desc-wrapper {
              .row {
                .item {
                  flex: 0 0 50%;
                  display: flex;
                  justify-content: flex-start;
                  align-items: stretch;

                  .name {
                    width: 100px;
                    text-align: right;
                  }

                  .val {}
                }
              }
            }
          }
        }
      }
    }
  }

  .w-50 {
    width: 50%;
  }
</style>
