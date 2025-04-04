import {ref, onMounted, onUnmounted} from 'vue';

export default function useClickOutside(callback) {
  const elementRef = ref(null);

  const handleClickOutside = (event) => {
    const target = event.target;

    // Handle cases where elementRef is a single element
    if (elementRef.value) {
      if (elementRef.value.contains(target)) {
        return; // Click inside, do nothing
      }
    }

    // Handle cases where elementRef is an array of elements
    if (Array.isArray(elementRef.value)) {
      if (elementRef.value.some((el) => el.contains(target))) {
        return; // Click inside one of the elements, do nothing
      }
    }

    // Click is outside, trigger the callback
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
