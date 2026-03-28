<script setup lang="ts">
import DailyGrid from '@/components/done/DailyGrid.vue'
import PieStatistics from '@/components/done/PieStatistics.vue'
import LineStatistics from '@/components/done/LineStatistics.vue'
</script>

<template>
  <div class="done">
    <DailyGrid></DailyGrid>
    <PieStatistics></PieStatistics>
    <LineStatistics></LineStatistics>
  </div>
</template>

<style scoped lang="scss">
.done {
  width: 100%;
  height: 100%;
  background: antiquewhite;
  display: grid;
  gap: 20px;
  padding: 20px;

  @media (min-width: 768px) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    :first-child {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 767px) {
    grid-template-rows: 1fr 5fr 5fr;
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 10px;
    //pointer-events: none;

    > * {
      width: 100%;
      min-height: 200px;
    }
  }
}
</style>
