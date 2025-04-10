<template>
  <div class="community-list-item d-md-flex d-lg-block d-xl-flex">
    <div class="community-list-thumb">
      <nuxt-link :to="`/community-details/${item.id}`">
        <img :src="item.img" alt="community-img" />
      </nuxt-link>
    </div>
    <div class="community-list-content">
      <div class="community-list-content-inner">
        <div class="community-list-meta">
          <span>
            <span>
              <svg-date />
            </span>
            {{ item.date }}
          </span>
          <span>
            <span>
              <svg-comments />
            </span>
            ({{ item.comments }})
          </span>
          <span>
            <i class="fas fa-thumbs-up"></i> {{ item.likes }}
          </span>
          <span>
            <i class="fas fa-thumbs-down"></i> {{ item.unlikes }}
          </span>
        </div>
        <h3 class="community-list-title">
          <nuxt-link :to="`/community-details/${item.id}`">
            {{ item.title }}
          </nuxt-link>
        </h3>
        <p>
          {{ item.summary || "Cursus mattis sociis natoque penatibus et magnis dis Parturient montes, nascetur ridiculus.!" }}
        </p>
        <div class="community-list-btn">
          <nuxt-link :to="`/community-details/${item.id}`" class="community-link-btn">
            Read More
            <span>
              <svg-right-arrow />
            </span>
          </nuxt-link>
        </div>
      </div>
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
/* 커뮤니티 리스트 아이템 기본 스타일 */
.community-list-item {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* 이미지 영역 */
.community-list-thumb {
  flex: 0 0 30%;
  max-width: 30%;
}

.community-list-thumb img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

/* 컨텐츠 영역 */
.community-list-content {
  flex: 1 1 70%;
  padding: 15px 20px;
}

.community-list-content-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 메타 데이터 영역 */
.community-list-meta {
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 10px;
}

/* 아이콘 내 여백 처리 */
.community-list-meta span i {
  margin-right: 5px;
}

/* 제목 스타일 */
.community-list-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.community-list-title a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.community-list-title a:hover {
  color: #000;
}

/* 내용 스타일 */
.community-list-content p {
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
  flex-grow: 1;
  margin-bottom: 15px;
}

/* 버튼 영역 */
.community-list-btn {
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

/* 반응형: 모바일은 세로 배치 */
@media (max-width: 768px) {
  .community-list-item {
    flex-direction: column;
  }
  .community-list-thumb,
  .community-list-content {
    flex: 1 1 100%;
    max-width: 100%;
  }
  .community-list-thumb img {
    border-radius: 6px 6px 0 0;
  }
}
</style>
