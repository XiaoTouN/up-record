<script setup>
import { Setting, EditPen, Star, StarFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { testData } from '/public/assets/data/index.js'
import { useDoneDataStore } from '@/stores/done.ts'
import { storeToRefs } from 'pinia'

const settingVisible = ref(false)
const doneDataStore = useDoneDataStore()
const { importData, clearStorage, addTodayData } = doneDataStore
const { todayState } = storeToRefs(doneDataStore)

const importTestData = () => {
  importData(
    Object.entries(testData).map(([key, value]) => {
      return {
        time: key,
        done: Boolean(value),
      }
    }),
  )
}

const tempTodayState = ref(todayState.value)
console.log(tempTodayState.value)
const selectState = (state) => {
  if (tempTodayState.value === state) {
    addTodayData(state)
  }
  tempTodayState.value = state
}
</script>

<template>
  <div class="tool-bar">
    <el-popover
      placement="bottom-start"
      trigger="click"
      :hide-after="50"
      :popper-style="{ opacity: 0.9 }"
      v-model:visible="settingVisible"
    >
      <template #reference>
        <div class="tool-item" :class="{ active: settingVisible }">
          <el-icon color="#fff">
            <Setting></Setting>
          </el-icon>
        </div>
      </template>
      <template #default>
        <div class="setting-container">
          <el-button type="primary" plain @click="importTestData">导入测试数据</el-button>
          <el-button type="primary" plain @click="clearStorage" style="margin-left: 0"
            >清除缓存数据</el-button
          >
        </div>
      </template>
    </el-popover>
    <el-popover
      placement="bottom-start"
      trigger="click"
      :hide-after="10"
      :popper-style="{ opacity: 0.9 }"
    >
      <template #reference>
        <div
          class="tool-item"
          :class="{
            'need-report': todayState === null,
          }"
        >
          <el-icon color="#fff">
            <EditPen></EditPen>
          </el-icon>
        </div>
      </template>
      <template #default>
        <div class="today-state">
          <div
            class="state-item state-false"
            @click="selectState(false)"
            :class="{ active: tempTodayState === false }"
          >
            <el-icon :size="28" color="green"><Star /></el-icon>
          </div>
          <div
            class="state-item state-true"
            @click="selectState(true)"
            :class="{ active: tempTodayState === true }"
          >
            <el-icon :size="28" color="#ff7474"><StarFilled /></el-icon>
          </div>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<style scoped lang="scss">
.tool-bar {
  position: absolute;
  display: flex;
  gap: 8px;
  padding: 8px;
  .tool-item {
    padding: 4px;
    aspect-ratio: 1;
    display: flex;
    align-content: center;
    justify-content: center;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.37);
    > * {
      transition: all 0.3s;
    }
  }
  .need-report {
    box-shadow: 0 0 7px 1px rgb(255 191 0 / 49%);
  }
  .active {
    > * {
      transform: rotate(90deg);
    }
  }
}
</style>

<style>
.setting-container {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
.today-state {
  display: flex;
  gap: 4px;
  justify-content: space-around;
  .state-item {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .state-false {
    background: #ebffc6;
  }
  .state-true {
    background: #ffcccc;
  }
  .active {
    box-shadow: 0 0 0 2px rgba(49, 129, 194, 0.52) inset;
  }
}
</style>
