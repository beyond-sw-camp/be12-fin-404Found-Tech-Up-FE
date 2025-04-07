import { defineStore } from "pinia";
import { onMounted, ref } from "vue";

export const useDeviceStore = defineStore('device', () => {
  let deviceList = ref([]);
  let registerList = ref([]);

  const addDeviceToList = (payload) => {
    // TODO: axios로 데이터 백엔드에도 추가
    registerList.value.push(payload);
  };

  const removeDeviceFromList = (payload) => {
    // TODO: axios로 데이터 백엔드에서도 삭제
    registerList.value = registerList.value.filter((value) => value.id !== payload.id);
  }

  onMounted(() => {

  });

  return {
    addDeviceToList,
    removeDeviceFromList,
    registerList,
    deviceList
  };
});