<template>
  <div class="notification-list">
    <!-- 탭 -->
    <div class="tabs mb-4">
      <button
        v-for="type in ['전체','읽음','안읽음']"
        :key="type"
        :class="{ active: filter === type }"
        @click="filter = type"
      >{{ type }}</button>
    </div>

    <!-- 알림 리스트 -->
    <div v-if="filteredNotifications.length">
      <div
        v-for="n in filteredNotifications"
        :key="n.id"
        class="notification-item"
        :class="{ read: n.read }"
      >
        <div class="notification-item-body" @click="openDetail(n)">
          <h4>{{ n.title }}</h4>
          <small>{{ formatDate(n.createdAt) }}</small>
        </div>
        <button class="delete-btn" @click.stop="deleteNoti(n.id)">삭제</button>
      </div>
    </div>
    <div v-else class="empty">알림이 없습니다.</div>

    <!-- 페이지네이션 -->
    <div class="tp-blog-pagination">
      <div class="tp-pagination">
        <ui-pagination2
          :totalItems="store.totalElements"
          :itemsPerPage="store.size"
          :initialPage="currentPage"
          @handlePaginate="onPageChange"
        />
      </div>
    </div>

    <!-- 사용자 맞춤 알림 토글 -->
    <div class="toggle-switch">
      <div class="form-check form-switch d-flex align-items-center">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="post"
          :checked="userStore.alarmEnabled"
          @change="onToggle"
        />
        <label class="form-check-label" for="post">
          알림 설정
        </label>
      </div>
    </div>

    <!-- 상세 모달 -->
    <notification-modal
      v-if="selected"
      :notification="selected"
      @close="clearSelection"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useNotificationStore } from '@/pinia/useNotificationStore'
import { useUserStore } from '@/pinia/useUserStore'
import NotificationModal from '@/components/notification/NotificationModal.vue'
import UiPagination2 from '@/components/ui/pagination2.vue'

const store       = useNotificationStore()
const userStore   = useUserStore()
const filter      = ref('전체')
const selected    = ref(null)
const currentPage = ref(1)

const filteredNotifications = computed(() => {
  if (filter.value === '읽음')    return store.notifications.filter(n => n.read)
  if (filter.value === '안읽음') return store.notifications.filter(n => !n.read)
  return store.notifications
})

function onPageChange(newPage) {
  const pageParam = newPage - 1
  store.fetchNotifications(pageParam, store.size)
  currentPage.value = newPage
  window.scrollTo(0, 0)
}

async function openDetail(n) {
  selected.value = n
  if (!n.read) {
    await store.markAsRead(n.id)
  }
}

function clearSelection() {
  selected.value = null
}

function formatDate(dt) {
  return new Date(dt).toLocaleString('ko-KR')
}

async function onToggle() {
  await userStore.setAlarmEnabled(!userStore.alarmEnabled)
}

async function deleteNoti(id) {
  await store.deleteNotification(id)
}

onMounted(async () => {
  await userStore.fetchAlarmEnabled()
  await store.fetchNotifications(0, store.size)
  currentPage.value = 1
})
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 1rem;
}
.tabs button.active {
  font-weight: bold;
  border-bottom: 2px solid black;
}
.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}
.notification-item.read {
  opacity: 0.6;
}
.notification-item-body {
  flex-grow: 1;
  cursor: pointer;
}
.delete-btn {
  background: none;
  border: none;
  color: red;
  font-size: 0.9rem;
  cursor: pointer;
}
.empty {
  text-align: center;
  color: #999;
}
.tp-blog-pagination {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}
.tp-blog-pagination .tp-pagination ul {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}
.toggle-switch {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}
</style>
