<script setup lang="ts">
import * as echarts from 'echarts'
import type { ECharts, EChartsType } from 'echarts/core'
import { useDoneDataStore } from '@/stores/done.ts'
import { onMounted, ref, useTemplateRef, watch } from 'vue'
import ToolBar from '@/components/done/ToolBar.vue'
import { storeToRefs } from 'pinia'

const { data } = storeToRefs(useDoneDataStore())
const chartDom = useTemplateRef('chartDom')
let chartInstance: ECharts | any = null
const option: any = {
  tooltip: {},
  legend: {
    top: '0',
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  visualMap: {
    min: 0,
    max: 1,
    type: 'piecewise',
    orient: 'horizontal',
    left: 'center',
    top: '14%',
    categories: ['0', '1'],
  },

  calendar: {
    top: '30%',
    left: 30,
    right: 30,
    cellSize: ['auto', 13],
    range: '2026',
    itemStyle: {
      borderWidth: 0.2,
    },
    yearLabel: { show: false },
    monthLabel: { show: false },
    dayLabel: {
      firstDay: 1,
    },
  },
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    data: [],
  },
}

const getOption = () => {
  option.series.data = data.value.map((item) => {
    return [item.time, item.done ? 1 : 0]
  })
  option.calendar.range = data.value?.[0] ? data.value?.[0].time.substring(0, 4) : '2026'
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

watch(() => data.value, updateChart, { deep: true })
</script>

<template>
  <div class="daily-grid">
    <div class="chart" ref="chartDom"></div>
    <ToolBar></ToolBar>
  </div>
</template>

<style scoped lang="scss">
.daily-grid {
  background: #c4ccee;
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
