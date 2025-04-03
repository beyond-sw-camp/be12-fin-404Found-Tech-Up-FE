export default function useClickOutside(callback: () => void) {
  const elementRef: Ref<HTMLElement | HTMLElement[] | null> = ref(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    // Handle cases where elementRef is a single element
    if (elementRef.value instanceof HTMLElement) {
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
