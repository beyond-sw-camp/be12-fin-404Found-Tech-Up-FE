<template>
  <div class="tp-shop-widget-content">
    <div class="tp-shop-widget-checkbox">
      <ul class="filter-items filter-checkbox">
        <li v-for="(s, i) in status" :key="i" class="filter-item checkbox">
          <input :id="s" type="checkbox" :name="s" />
          <label
            @click="handleStatus(s)"
            :for="s"
            :class="`${route.query?.status === formatString(s) ? 'active' : ''}`"
          >
            {{ s }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { formatString } from '@/utils/index';

const route = useRoute();
const router = useRouter();

const status = ref(['On sale', 'In Stock']);

function handleStatus(statusValue) {
  const currentQuery = router.currentRoute.value.query;
  const existing = currentQuery.status || '';

  let newStatus;

  if (existing.includes(statusValue)) {
    newStatus = existing
      .split(',')
      .filter((item) => item !== statusValue)
      .join(',');
  } else {
    newStatus = formatString(statusValue);
  }

  router.push({
    query: {
      ...currentQuery,
      status: newStatus
    }
  });
}
</script>
