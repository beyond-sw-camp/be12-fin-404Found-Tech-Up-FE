<template>
  <div :class="`community-grid-item ${props.style_2 ? 'community-grid-style2' : ''} p-relative mb-30`">
    <div class="community-grid-thumb w-img fix mb-30">
      <nuxt-link :to="`/community-details/${props.item.idx}`">
        <img :src="props.item.img" alt="community-img" />
      </nuxt-link>
    </div>
    <div class="community-grid-content">
      <div class="community-grid-meta">
        <span>
          <span>
            <svg-date />
          </span>
          {{ props.item.date }}
        </span>
        <span>
          <span>
            <svg-comments />
          </span>
          Comments ({{ props.item.comments }})
        </span>
      </div>
      <h3 class="community-grid-title">
        <nuxt-link :to="`/community-details/${props.item.idx}`">{{ props.item.title }}</nuxt-link>
      </h3>
      <p>
        Cursus mattis sociis natoque penatibus et magnis montes, nascetur ridiculus.
      </p>
      <div class="community-grid-btn">
        <nuxt-link :to="`/community-details/${props.item.idx}`" class="community-link-btn">
          Read More
          <span>
            <svg-right-arrow />
          </span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
const props = defineProps({
  item: Object,
  style_2: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
/* 커뮤니티 그리드 아이템 기본 스타일 */
.community-grid-item {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}

/* 이미지 영역 */
.community-grid-thumb {
  overflow: hidden;
}

.community-grid-thumb img {
  display: block;
  width: 100%;
  object-fit: cover;
}

/* 컨텐츠 영역 */
.community-grid-content {
  padding: 15px 20px;
}

/* 메타 데이터 (날짜, 댓글 등) */
.community-grid-meta {
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 10px;
}

/* 제목 스타일 */
.community-grid-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.community-grid-title a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.community-grid-title a:hover {
  color: #000;
}

/* 본문 내용 */
.community-grid-content p {
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
  margin-bottom: 15px;
}

/* 버튼 영역 */
.community-grid-btn {
  text-align: right;
}

.community-link-btn {
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  color: #007bff;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.community-link-btn:hover {
  color: #0056b3;
  border-bottom: 1px solid #0056b3;
}
</style>
