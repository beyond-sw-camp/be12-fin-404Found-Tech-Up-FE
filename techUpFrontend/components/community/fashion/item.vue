<template>
  <div class="community-item-alt mb-40">
    <div class="community-thumb p-relative fix">
      <nuxt-link :to="`/community-details/${props.item.idx}`">
        <img :src="props.item.img" alt="community-img" />
      </nuxt-link>
      <div class="community-meta-date">
        <span>{{ props.item.date }}</span>
      </div>
    </div>
    <div class="community-content has-thumbnail">
      <div class="community-meta">
        <span>
          <svg-tag-icon /> 
        </span>
        <a v-for="(t, i) in props.item.tags" :key="i" href="#">
          {{ t }}<span v-if="i < props.item.tags.length - 1">, </span>
        </a>
      </div>
      <h3 class="community-title">
        <nuxt-link :to="`/community-details/${props.item.idx}`">
          {{ props.item.title }}
        </nuxt-link>
      </h3>
    </div>
  </div>
</template>

<script setup lang="js">
const props = defineProps({
  item: Object
});
console.log("커뮤니티 아이템:", props.item);
</script>

<style scoped>
/* 커뮤니티 게시판 목록용 스타일 */
.community-item-alt {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.community-thumb {
  position: relative;
  overflow: hidden;
}

.community-thumb img {
  display: block;
  width: 100%;
  object-fit: cover;
}

.community-meta-date {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  padding: 4px 8px;
  color: #fff;
  border-radius: 4px;
  font-size: 0.8rem;
}

.community-content {
  padding: 15px 20px;
}

.community-meta {
  display: flex;
  gap: 10px;
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 10px;
}

.community-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.community-title a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.community-title a:hover {
  color: #000;
}
</style>
