<script setup>
  import {
    reactive
  } from 'vue'
  import FloorList from '@/components/FloorList.vue'

  const props = defineProps({
    isView: {
      type: Boolean,
      required: true,
      default: true
    }
  })

  const list = [
    {
      number: 'B1',
      typeName: '消防箱',
      meshName: '',
      detail: {
        type: 'fireFightingBox',
        lastCheck: '2023年3月1日',
        status: '完好'
      }
    },
    {
      number: 'C1',
      typeName: '消防柜',
      meshName: '',
      detail: {
        type: 'fireFightingBox',
        lastCheck: '2023年3月1日',
        status: '完好'
      }
    },
    {
      number: 'S1',
      typeName: '烟感器',
      meshName: '',
      detail: {
        type: 'fireFightingBox',
        lastCheck: '2023年3月1日',
        status: '正常'
      }
    }
  ]
</script>

<template>
  <FloorList :is-view="props.isView" :list="list" />
</template>

<style lang="less" scoped>
</style>
