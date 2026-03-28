import { ref, computed, isProxy } from 'vue'
import { defineStore } from 'pinia'
import type { DataItem } from '@/types/done/type.ts'
import { DONE_DATE_FORMAT, DONE_LOCALSTORAGE_KEY } from '@/constant'
import dayjs from 'dayjs'

export const useDoneDataStore = defineStore('doneData', () => {
  const data = ref<DataItem[]>([])

  const getDataFromLocalStorage = () => {
    const storedData = localStorage.getItem(DONE_LOCALSTORAGE_KEY) || '{}'
    if (storedData) {
      const storageData = JSON.parse(storedData)
      data.value = Object.entries(storageData).map((item) => {
        return {
          time: item[0],
          done: Boolean(item[1]),
        }
      })
    }
  }
  getDataFromLocalStorage()
  const saveDataToLocalStorage = () => {
    localStorage.setItem(
      DONE_LOCALSTORAGE_KEY,
      JSON.stringify(Object.fromEntries(data.value.map((item) => [item.time, item.done ? 1 : 0]))),
    )
  }

  const addTodayData = (value: boolean) => {
    const todayDate = dayjs(new Date()).format(DONE_DATE_FORMAT)
    const existingData = data.value.find((item) => item.time === todayDate)

    if (existingData) {
      existingData.done = value
    } else {
      data.value.push({
        done: value,
        time: todayDate,
      })
    }
    saveDataToLocalStorage()
  }

  const importData = (importedData: DataItem[]) => {
    data.value = importedData
    saveDataToLocalStorage()
  }

  const clearStorage = () => {
    localStorage.removeItem(DONE_LOCALSTORAGE_KEY)
    data.value = []
  }

  const todayState = computed(() => {
    const todayData = data.value.find(
      (item) => item.time === dayjs(new Date()).format(DONE_DATE_FORMAT),
    )
    if (todayData) {
      return todayData.done
    } else {
      return null
    }
  })
  return {
    data,
    addTodayData,
    importData,
    clearStorage,
    todayState,
  }
})
