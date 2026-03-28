<script setup lang="ts">
import * as echarts from 'echarts'
import type { ECharts, EChartsType } from 'echarts/core'
import { useDoneDataStore } from '@/stores/done.ts'
import { onMounted, ref, useTemplateRef, watch } from 'vue'
import RangeSelect from '@/components/done/RangeSelect.vue'
import { storeToRefs } from 'pinia'

const { data } = storeToRefs(useDoneDataStore())
// 时间范围
const rangeValue = ref(7)
const chartDom = useTemplateRef('chartDom')
let chartInstance: ECharts | any = null
const option: any = {
  tooltip: {
    trigger: 'item',
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  series: {
    type: 'pie',
    radius: '55%',
    center: ['50%', '50%'],
    data: [],
    roseType: 'radius',
    label: {
      color: 'rgba(60,117,239,0.3)',
    },
    labelLine: {
      lineStyle: {
        color: 'rgba(60,117,239,0.3)',
      },
      smooth: 0.2,
      length: 18,
      length2: 28,
    },
    itemStyle: {
      color: '#f14d49',
      shadowBlur: 1,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
    },
  },
}
const getOption = () => {
  const showData = data.value.filter((i) => {
    const time = new Date(i.time).getTime()
    const now = Date.now()
    return time >= now - rangeValue.value * 24 * 3600 * 1000 && time <= now
  })
  const doneCount = showData.filter((i) => i.done).length
  option.series.data = [
    { value: doneCount, name: '😣' },
    { value: showData.length - doneCount, name: '😁' },
  ]
  return option
}
const updateChart = () => {
  if (!chartDom.value) return
  if (!chartInstance) {
    console.log(chartDom.value)
    chartInstance = echarts.init(chartDom.value)
  }
  chartInstance?.setOption(getOption())
}
onMounted(updateChart)

watch([() => data.value, () => rangeValue.value], updateChart, { deep: true })
</script>

<template>
  <div class="pie-statistics">
    <div class="chart" ref="chartDom"></div>
    <RangeSelect v-model="rangeValue"></RangeSelect>
  </div>
</template>

<style scoped lang="scss">
.pie-statistics {
  background: #eaafc4;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  .chart {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
