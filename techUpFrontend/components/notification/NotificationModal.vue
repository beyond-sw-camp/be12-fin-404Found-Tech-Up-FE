<template>
    <div class="modal-backdrop" @click.self="close">
      <div class="modal-content">
        <button class="close-btn" @click="close">×</button>
        <h3 class="modal-title">{{ notification.title }}</h3>
        <p class="modal-content-text">{{ notification.content }}</p>
        <div class="modal-footer">
          <small>받은 시각: {{ formatDate(notification.createdAt) }}</small>
          <small v-if="notification.checkedAt">확인 시각: {{ formatDate(notification.checkedAt) }}</small>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    notification: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['close'])
  
  function close() {
    emit('close')
  }
  
  function formatDate(isoDate) {
    const date = new Date(isoDate)
    return date.toLocaleString()
  }
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .modal-content {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    position: relative;
  }
  .close-btn {
    position: absolute;
    right: 1rem;
    top: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  .modal-title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  .modal-content-text {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  .modal-footer {
    display: flex;
    flex-direction: column;
    font-size: 0.875rem;
    color: #666;
  }
  </style>
  