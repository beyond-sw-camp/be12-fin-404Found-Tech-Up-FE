import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import axios from 'axios';

export const useDeviceStore = defineStore('device', () => {
  let deviceList = ref([]);
  let registerList = ref([]);
  let totalPages = ref(0);
  let currentPage = ref(0);
  let totalItems = ref(0);

  // 제품 목록 가져오기 (검색용)
  const fetchDeviceList = async (searchText = '', page = 0, size = 5) => {
    try {
      // 검색어가 있으면 검색 API 호출, 없으면 전체 목록 가져오기
      const endpoint = searchText 
        ? `/api/product/search?keyword=${searchText}&page=${page}&size=${size}` 
        : `/api/product/list?page=${page}&size=${size}`;
      
      const response = await axios.get(endpoint);
      deviceList.value = response.data.data.content || [];

      // 페이지네이션 정보 업데이트
      totalPages.value = response.data.data.totalPages || 0;
      currentPage.value = response.data.data.number || 0;
      totalItems.value = response.data.data.totalElements || 0;

      console.log('제품 목록 정보:', deviceList.value);
      console.log('페이지네이션 정보:', {
        currentPage: currentPage.value,
        totalPages: totalPages.value,
        totalItems: totalItems.value
      });
    } catch (error) {
      console.error('제품 목록 조회 실패:', error);
    }
  };

  // 내 등록 제품 목록 가져오기
  const fetchMyDevices = async () => {
    try {
      const response = await axios.get('/api/user-product/my-product');
      registerList.value = response.data.data.products || [];
      console.log('내 제품 정보:', registerList.value);
    } catch (error) {
      console.error('내 기기 목록 조회 실패:', error);
    }
  };

  // 제품 등록하기
  const addDeviceToList = async (productIdx) => {
    try {
      await axios.post(`/api/user-product/register/${productIdx}`);
      alert("등록이 완료되었습니다.");
      // 등록 성공 후 목록 다시 불러오기
      await fetchMyDevices();
    } catch (error) {
      console.error('비밀번호 변경 중 오류 발생:', error.response.data);
      if (error.response.data.code) {
        alert(error.response.data.message);
      } else {
        // 네트워크 에러 또는 서버와의 연결 문제
        alert("서버와 연결할 수 없습니다. 다시 시도해주세요.");
      }
    }
  };
  
  // 제품 등록 해제하기
  const removeDeviceFromList = async (productIdx) => {
    try {
      await axios.delete(`/api/user-product/delete/${productIdx}`);
      alert("등록이 해제 되었습니다.");
      // 삭제 성공 후 목록 다시 불러오기
      await fetchMyDevices();
    } catch (error) {
      console.error('제품 등록 해제 실패:', error);
      // 실패해도 UI에서는 임시로 제거
      registerList.value = registerList.value.filter((value) => value.idx !== productIdx);
      alert("등록이 해제 되었습니다.");
    }
  };

  onMounted(() => {
    fetchDeviceList();
    fetchMyDevices();
  });

  return {
    addDeviceToList,
    removeDeviceFromList,
    fetchDeviceList,
    fetchMyDevices,
    registerList,
    deviceList,
    totalPages,
    currentPage,
    totalItems
  };
});