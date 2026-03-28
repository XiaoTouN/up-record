<script setup>
import { Setting } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { testData } from '/public/assets/data/index.js'
import { useDoneDataStore } from '@/stores/done.ts'

const settingVisible = ref(false)
const { importData, clearStorage } = useDoneDataStore()

const importTestData = () => {
  importData(
    Object.entries(testData).map(([key, value]) => {
      return {
        time: key,
        done: value,
      }
    }),
  )
}
</script>

<template>
  <div class="tool-bar">
    <el-popover
      placement="bottom-start"
      trigger="click"
      :hide-after="0"
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
  </div>
</template>

<style scoped lang="scss">
.tool-bar {
  position: absolute;
  display: flex;
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
</style>
