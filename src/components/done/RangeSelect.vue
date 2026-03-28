<script setup lang="ts">
import { computed, ref } from 'vue'

const modelValue = defineModel({
  type: Number,
  default: 7,
})

const selectableList = ref([
  { label: '过去一周', value: 7 },
  { label: '过去十天', value: 10 },
  { label: '过去二十天', value: 20 },
  { label: '过去一个月', value: 30 },
  { label: '过去两个月', value: 60 },
])

const rangeText = computed(() => {
  const item = selectableList.value.find((i) => i.value === modelValue.value)
  return item ? item.label : '选择范围'
})
</script>

<template>
  <div class="range-select">
    <el-popover
      placement="right-start"
      trigger="click"
      :hide-after="0"
      :popper-style="{ padding: '4px', opacity: 0.8 }"
    >
      <template #default>
        <el-radio-group v-model="modelValue">
          <el-radio
            :label="item.label"
            v-for="item in selectableList"
            :key="item.label"
            :value="item.value"
            style="padding-left: 4px"
          ></el-radio>
        </el-radio-group>
      </template>
      <template #reference>
        <el-tag type="warning" style="width: 80px">{{ rangeText }}</el-tag>
      </template>
    </el-popover>
  </div>
</template>

<style scoped lang="scss">
.range-select {
  cursor: pointer;
  position: absolute;
  padding: 8px;
  opacity: 0.6;
  font-size: 0.8em;
}
</style>
