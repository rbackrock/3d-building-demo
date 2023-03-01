<script setup>
  import {
    ref,
    onMounted,
    onBeforeUnmount,
    watch,
    nextTick
  } from 'vue'
  import BScroll from '@better-scroll/core'
  import MouseWheel from '@better-scroll/mouse-wheel'

  BScroll.use(MouseWheel)

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
  })

</script>

<template>
  <div v-show="props.isView" class="view-container">
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
            <tr v-for="(item, index) in list" :key="index">
              <td class="w-50">{{ item.number }}</td>
              <td class="w-50">{{ item.typeName }}</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
            <tr>
              <td class="w-50">FB001</td>
              <td class="w-50">消防箱</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div v-show="props.isView" class="detail-container">
    <div class="close-box">
      <div class="close">x</div>
    </div>
    <div class="detail-container-wrapper">
      <div class="title">设备状态信息</div>
      <div class="content-container">
        <div class="desc">
          <div class="row">
            <div class="item">
              <div class="name">最后检测时间：</div>
              <div class="value">2023年3月1日</div>
            </div>
            <div class="item">
              <div class="name">设备状态：</div>
              <div class="value">完好</div>
            </div>
          </div>
        </div>
        <div class="check-persion">
          <div class="title">巡检人员</div>
          <div class="content-container">
            <div class="avatar" />
            <div class="desc">
              <div class="desc-wrapper">
                <div class="row">
                  <div class="item">
                    <div class="name">姓名：</div>
                    <div class="val">章三</div>
                  </div>
                  <div class="item">
                    <div class="name">性别：</div>
                    <div class="val">男</div>
                  </div>
                </div>
                <div class="row">
                  <div class="item">
                    <div class="name">姓名：</div>
                    <div class="val">张三</div>
                  </div>
                  <div class="item">
                    <div class="name">性别：</div>
                    <div class="val">男</div>
                  </div>
                </div>
                <div class="row">
                  <div class="item">
                    <div class="name">联系电话：</div>
                    <div class="val">18888888888</div>
                  </div>
                  <div class="item">
                    <div class="name">部门：</div>
                    <div class="val">后勤部</div>
                  </div>
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

    .view-container-wrapper {
      padding: 5px;
      width: 100%;
      height: 100%;

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
    left: 8%;
    top: 18%;
    width: 500px;
    height: 620px;
    font-size: 12px;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 6px;
    transform: translateZ(0) matrix3d(0.754844, -0.19101, -0.627475, 0, 0, -0.956657, 0.291217, 0, 0.655904, 0.219823, -0.277873, 0, 0, 0, -42.5923, 1) translate(0, 0) rotateX(180deg);
    font-size: 18px;
    opacity: 1;
  }

  .w-50 {
    width: 50%;
  }
</style>
