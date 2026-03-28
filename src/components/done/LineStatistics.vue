<script setup lang="ts">
import * as echarts from 'echarts'
import type { ECharts, EChartsType } from 'echarts/core'
import { useDoneDataStore } from '@/stores/done.ts'
import { onMounted, ref, useTemplateRef, watch } from 'vue'
import dayjs from 'dayjs'
import RangeSelect from '@/components/done/RangeSelect.vue'
import { storeToRefs } from 'pinia'

const { data } = storeToRefs(useDoneDataStore())
const rangeValue = ref(30)
const chartDom = useTemplateRef('chartDom')
let chartInstance: ECharts | any = null
const option: any = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    top: '20%',
    bottom: '20%',
    left: '10%',
  },
  xAxis: {
    type: 'time',
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 1,
    interval: 1,
    ticks: [0, 1],
    axisLabel: {
      formatter: (value: number) => {
        return value === 1 ? '★' : '☆'
      },
    },
  },
  series: {
    name: 'Email',
    type: 'line',
    stack: 'Total',
    areaStyle: {},
    emphasis: {
      focus: 'series',
    },
    itemStyle: { color: '#31c233' },
    data: [120, 132, 101, 134, 90, 230, 210],
  },
}

const getOption = () => {
  const showData = data.value.filter((i) => {
    const time = new Date(i.time).getTime()
    const now = Date.now()
    return time >= now - rangeValue.value * 24 * 3600 * 1000 && time <= now
  })
  option.series.data = showData.map((item) => {
    return {
      name: dayjs(item.time).format('YYYY-MM-DD HH:mm:ss'),
      value: [item.time, item.done ? 1 : 0],
    }
  })
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
  <div class="line-statistics">
    <div class="chart" ref="chartDom"></div>
    <RangeSelect v-model="rangeValue"></RangeSelect>
  </div>
</template>

<style scoped lang="scss">
.line-statistics {
  background: #c1e6b5;
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
