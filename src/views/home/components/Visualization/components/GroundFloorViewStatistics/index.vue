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
  <div>
    <div
      class="left-container"
      :class="{ show: props.isView === true, hide: props.isView !== true }"
    >
      <div class="content">一层楼-假装有数据</div>
    </div>
    <div
      class="right-container"
      :class="{ show: props.isView === true, hide: props.isView !== true }"
    >
      <div class="content">一层楼-假装有数据</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @container-width: 18%;

  .left-container {
    position: fixed;
    bottom: 0;
    width: @container-width;
    height: calc(94vh);
    color: rgb(179, 203, 235);

    background-image: url(../../images/left.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;

    transition: all 0.6s;

    &.show {
      left: 0;
      opacity: 1;
    }

    &.hide {
      left: -@container-width;
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

    background-image: url(../../images/right.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;

    transition: all 0.6s;

    &.show {
      right: 0;
      opacity: 1;
    }

    &.hide {
      right: -@container-width;
      opacity: 0;
    }

    .content {
      padding: 30px 0;
      text-align: center;
    }
  }
</style>
