<template>
  <div class="tp-shop-widget-content">
    <div class="tp-shop-widget-checkbox">
      <ul class="filter-items filter-checkbox">
        <li v-for="(s, i) in status" :key="i" class="filter-item checkbox">
          <input 
            :id="s" 
            type="checkbox" 
            :name="s" 
            :checked="(route.query?.status || '').split(',').includes(formatString(s))" 
          />
          <label
            @click="handleStatus(s)"
            :for="s"
            :class="`${(route.query?.status || '').split(',').includes(formatString(s)) ? 'active' : ''}`"
          >
            {{ s }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatString } from '@/utils/index';

const route = useRoute();
const router = useRouter();

const status = ref(['On sale', 'In Stock']);

function handleStatus(statusValue) {
  const currentQuery = router.currentRoute.value.query;
  const existing = currentQuery.status || '';
  const formatted = formatString(statusValue); // 예: "On sale" → "on-sale"
  const statuses = existing ? existing.split(',') : [];
  
  let newStatus;
  if (statuses.includes(formatted)) {
    // 이미 선택되었다면 제거
    newStatus = statuses.filter(item => item !== formatted).join(',');
  } else {
    // 선택되지 않았다면 추가
    newStatus = statuses.length ? [...statuses, formatted].join(',') : formatted;
  }
  
  router.push({
    query: {
      ...currentQuery,
      status: newStatus
    }
  });
}
</script>
