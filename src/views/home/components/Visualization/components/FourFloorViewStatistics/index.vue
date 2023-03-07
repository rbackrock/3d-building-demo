<script setup>
  import FloorList from '@/components/FloorList.vue'

  const props = defineProps({
    isView: {
      type: Boolean,
      required: true,
      default: true
    }
  })

  const list = [
    // 消防箱
    {
      number: 'B1',
      typeName: '消防箱',
      type: 'fireFightingBox',
      meshId: 'fireFightingBoxF4#1',
      detail: {
        lastCheck: '2023年5月1日',
        status: '完好',
        userName: '张三',
        gender: '女',
        postName: '检察员',
        department: '后勤',
        phone: '18888888888'
      }
    },
    {
      number: 'B2',
      typeName: '消防箱',
      type: 'fireFightingBox',
      meshId: 'fireFightingBoxF4#2',
      detail: {
        lastCheck: '2023年5月2日',
        status: '完好',
        userName: '张三',
        gender: '女',
        postName: '检察员',
        department: '后勤',
        phone: '18888888888'
      }
    },
    // 消防柜
    {
      number: 'C1',
      typeName: '消防柜',
      type: 'fireFightingBox',
      meshId: 'fireFightingCupboardF4#1',
      detail: {
        lastCheck: '2023年6月2日',
        status: '完好',
        userName: '张三',
        gender: '女',
        postName: '检察员',
        department: '后勤',
        phone: '18888888888'
      }
    },
    {
      number: 'C2',
      typeName: '消防柜',
      type: 'fireFightingBox',
      meshId: 'fireFightingCupboardF4#2',
      detail: {
        lastCheck: '2023年6月2日',
        status: '完好',
        userName: '张三',
        gender: '女',
        postName: '检察员',
        department: '后勤',
        phone: '18888888888'
      }
    },
    {
      number: 'C3',
      typeName: '消防柜',
      type: 'fireFightingBox',
      meshId: 'fireFightingCupboardF4#3',
      detail: {
        lastCheck: '2023年6月2日',
        status: '完好',
        userName: '张三',
        gender: '女',
        postName: '检察员',
        department: '后勤',
        phone: '18888888888'
      }
    },
    // 烟感器
    {
      number: 'S1',
      typeName: '烟感器',
      type: 'fireFightingBox',
      meshId: 'smogResponseF4#1',
      detail: {
        lastCheck: '2023年3月6日',
        status: '完好',
        userName: '张三',
        gender: '女',
        postName: '检察员',
        department: '后勤',
        phone: '18888888888'
      }
    },
    {
      number: 'S2',
      typeName: '烟感器',
      type: 'fireFightingBox',
      meshId: 'smogResponseF4#2',
      detail: {
        lastCheck: '2023年3月6日',
        status: '完好',
        userName: '张三',
        gender: '女',
        postName: '检察员',
        department: '后勤',
        phone: '18888888888'
      }
    },
    {
      number: 'S3',
      typeName: '烟感器',
      type: 'fireFightingBox',
      meshId: 'smogResponseF4#3',
      detail: {
        lastCheck: '2023年3月6日',
        status: '完好',
        userName: '张三',
        gender: '女',
        postName: '检察员',
        department: '后勤',
        phone: '18888888888'
      }
    },
    {
      number: 'S4',
      typeName: '烟感器',
      type: 'fireFightingBox',
      meshId: 'smogResponseF4#4',
      detail: {
        lastCheck: '2023年3月6日',
        status: '完好',
        userName: '张三',
        gender: '女',
        postName: '检察员',
        department: '后勤',
        phone: '18888888888'
      }
    },
    {
      number: 'S5',
      typeName: '烟感器',
      type: 'fireFightingBox',
      meshId: 'smogResponseF4#5',
      detail: {
        lastCheck: '2023年3月6日',
        status: '完好',
        userName: '张三',
        gender: '女',
        postName: '检察员',
        department: '后勤',
        phone: '18888888888'
      }
    },
    {
      number: 'S6',
      typeName: '烟感器',
      type: 'fireFightingBox',
      meshId: 'smogResponseF4#6',
      detail: {
        lastCheck: '2023年3月6日',
        status: '完好',
        userName: '张三',
        gender: '女',
        postName: '检察员',
        department: '后勤',
        phone: '18888888888'
      }
    },
    {
      number: 'S7',
      typeName: '烟感器',
      type: 'fireFightingBox',
      meshId: 'smogResponseF4#7',
      detail: {
        lastCheck: '2023年3月6日',
        status: '完好',
        userName: '张三',
        gender: '女',
        postName: '检察员',
        department: '后勤',
        phone: '18888888888'
      }
    },
    {
      number: 'S8',
      typeName: '烟感器',
      type: 'fireFightingBox',
      meshId: 'smogResponseF4#8',
      detail: {
        lastCheck: '2023年3月6日',
        status: '完好',
        userName: '张三',
        gender: '女',
        postName: '检察员',
        department: '后勤',
        phone: '18888888888'
      }
    },
    {
      number: 'S9',
      typeName: '烟感器',
      type: 'fireFightingBox',
      meshId: 'smogResponseF4#9',
      detail: {
        lastCheck: '2023年3月6日',
        status: '完好',
        userName: '张三',
        gender: '女',
        postName: '检察员',
        department: '后勤',
        phone: '18888888888'
      }
    },
    {
      number: 'S10',
      typeName: '烟感器',
      type: 'fireFightingBox',
      meshId: 'smogResponseF4#10',
      detail: {
        lastCheck: '2023年3月6日',
        status: '完好',
        userName: '张三',
        gender: '女',
        postName: '检察员',
        department: '后勤',
        phone: '18888888888'
      }
    }
  ]
</script>

<template>
  <FloorList :is-view="props.isView" :list="list" />
</template>

<style lang="less" scoped>
</style>
