<template>
  <article class="community-post-item-simple mb-30">
    <!-- 메타 정보: 작성일, 작성자, 댓글 수, 좋아요, 싫어요 -->
    <div class="community-post-meta">
      <span>
        <i class="far fa-calendar-check"></i> {{ item.date }}
      </span>
      <span>
        <i class="far fa-user"></i> {{ item.author }}
      </span>
      <span>
        <i class="fal fa-comments"></i> {{ item.comments }} Comments
      </span>
      <!-- 좋아요 수가 있을 때 표시 -->
      <span v-if="item.likes !== undefined">
        <i class="fas fa-thumbs-up"></i> {{ item.likes }}
      </span>
      <!-- 싫어요 수가 있을 때 표시 -->
      <span v-if="item.unlikes !== undefined">
        <i class="fas fa-thumbs-down"></i> {{ item.unlikes }}
      </span>
    </div>
    <!-- 게시글 제목 -->
    <h3 class="community-post-title">
      <nuxt-link :to="`/community-details/${item.id}`">{{ item.title }}</nuxt-link>
    </h3>
  </article>
</template>

<script setup lang="js">
const props = defineProps({
  item: Object,
});
</script>

<style scoped>
.community-post-item-simple {
  background-color: #fff;
  padding: 15px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  margin-bottom: 30px;
  transition: transform 0.3s ease;
}

.community-post-item-simple:hover {
  transform: translateY(-3px);
}

.community-post-meta {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 10px;
  display: flex;
  gap: 15px;
  justify-content: flex-start;
}

.community-post-meta span i {
  margin-right: 5px;
}

.community-post-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
}

.community-post-title a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.community-post-title a:hover {
  color: #000;
}
</style>
