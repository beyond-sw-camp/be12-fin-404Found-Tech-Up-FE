<template>
  <div :class="`tp-blog-grid-item ${props.style_2 ? 'tp-blog-grid-style2' : ''} p-relative mb-30`">
    <div class="tp-blog-grid-thumb w-img fix mb-30">
      <nuxt-link :href="`/community-details/${props.item.id}`">
        <img :src="props.item.img" alt="community-img" />
      </nuxt-link>
    </div>
    <div class="tp-blog-grid-content">
      <div class="tp-blog-grid-meta">
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
      <h3 class="tp-blog-grid-title">
        <nuxt-link :href="`/community-details/${props.item.id}`">{{ props.item.title }}</nuxt-link>
      </h3>
      <p>
        Cursus mattis sociis natoque penatibus et magnis montes, nascetur ridiculus.
      </p>

      <div class="tp-blog-grid-btn">
        <nuxt-link :href="`/community-details/${props.item.id}`" class="tp-link-btn-3">
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
    default: false
  }
});
</script>
