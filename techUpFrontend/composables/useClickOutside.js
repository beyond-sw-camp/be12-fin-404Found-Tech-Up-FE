import { ref, onMounted, onUnmounted } from "vue";


export default function useClickOutside(callback) {
  const elementRef = ref(null);

  const handleClickOutside = (event) => {
    const target = event.target;

    // elementRef가 단일 요소인 경우
    if (elementRef.value instanceof HTMLElement) {
      if (elementRef.value.contains(target)) {
        return; // 내부 클릭 시 아무 동작도 하지 않음
      }
    }

    // elementRef가 여러 요소의 배열인 경우
    if (Array.isArray(elementRef.value)) {
      if (elementRef.value.some((el) => el.contains(target))) {
        return; // 배열 내 요소 중 하나라도 내부 클릭이면 아무 동작도 하지 않음
      }
    }

    // 클릭이 외부에서 발생했으므로 callback 실행
    callback();
  };

  onMounted(() => {
    document.addEventListener("mousedown", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("mousedown", handleClickOutside);
  });

  return elementRef;
}
