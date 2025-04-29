<template>
  <article class="community-post-item-simple mb-30">
    <nuxt-link :to="`/community-details/${item.idx}`" class="block-link" custom v-slot="{ navigate }">
      <div class="community-post-meta" @click="navigate">
        <!-- ✅ 카테고리 -->
        <span class="category-tag">
          <i class="fas fa-tag"></i> {{ item.boardCategory }}
        </span>

        <span>
          <i class="far fa-calendar-check"></i> {{ formattedDate }}
        </span>
        <span>
          <i class="far fa-user"></i> {{ item.writer }}
        </span>
        <span>
          <i class="fal fa-comments"></i> 댓글 {{ item.boardComments || 0 }}개
        </span>
        <span v-if="item.boardLikes !== undefined">
          <i class="fas fa-thumbs-up"></i> {{ item.boardLikes }}
        </span>
        <span v-if="item.boardUnlikes !== undefined">
          <i class="fas fa-thumbs-down"></i> {{ item.boardUnlikes }}
        </span>
      </div>
    </nuxt-link>

    <h3 class="community-post-title">
      <nuxt-link :to="`/community-details/${item.idx}`">{{ item.boardTitle }}</nuxt-link>
    </h3>
  </article>
</template>




<script setup lang="js">
import { computed } from 'vue';
import { format } from 'date-fns';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

// 날짜 포맷팅 (ISO 날짜 문자열을 "yyyy-MM-dd HH:mm" 형식으로 변환)
const formattedDate = computed(() => {
  try {
    return format(new Date(props.item.boardCreated), 'yyyy-MM-dd HH:mm');
  } catch (e) {
    return props.item.boardCreated; // fallback
  }
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
