<script setup>
  import {
    defineProps
  } from 'vue'

  const props = defineProps({
    isView: {
      type: Boolean,
      required: true,
      default: true
    }
  })

</script>

<template>
  <div v-show="props.isView" id="ground-floor-info-list-hook" class="view-container">
    <div class="view-container-wrapper">
      <table class="list-container">
        <thead>
          <tr>
            <th class="w-50">编号</th>
            <th class="w-50">类型</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="w-50">S001</td>
            <td class="w-50">烟感器</td>
          </tr>
          <tr>
            <td class="w-50">FB001</td>
            <td class="w-50">消防箱</td>
          </tr>
          <tr class="active">
            <td class="w-50">FC001</td>
            <td class="w-50">消防柜</td>
          </tr>
        </tbody>
      </table>
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

    .view-container-wrapper {
      padding: 5px;
      width: 100%;
      height: 100%;

      .list-container {
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

        tbody {
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

  .w-50 {
    width: 50%;
  }
</style>
