<template>
  <div class="tp-product-details-wrapper has-sticky">
    <div class="tp-product-details-category">
      <span>{{ product.category }}</span>
    </div>
    <h3 class="tp-product-details-title">{{ product.name }}</h3>

    <div class="tp-product-details-inventory d-flex align-items-center mb-10">
      <div class="tp-product-details-stock me-4">
        <span>남은 수량: {{ product.stock }}</span>
      </div>
      <div class="tp-product-rating-icon tp-product-rating-icon-2">
        <div class="star-rating">
          <div class="star-rating__back">
            <i class="fa-regular fa-star" v-for="n in 5" :key="n" />
          </div>
          <div class="star-rating__front" :style="{ width: `${(product.rating / 5) * 100}%` }">
            <i class="fa-solid fa-star" v-for="n in 5" :key="n" />
          </div>
        </div>
        <span class="tp-product-details-rating">
          ({{ product.rating }})
        </span>
      </div>
    </div>

    <p>
      {{
        textMore
          ? product.description ?? ''
          : (product.description?.substring(0, 100) ?? '') + '...'
      }}
      <span v-if="product.description" @click="textMore = !textMore">
        {{ textMore ? 'See less' : 'See more' }}
      </span>
    </p>

    <!-- price -->
    <div class="tp-product-details-price-wrapper mb-20">
      <div v-if="product.discount > 0 || product.discount !== null">
        <span class="tp-product-details-price old-price">{{ formatPrice(product.price, false) }}</span>
        <span class="tp-product-details-price new-price">
          {{ formatPrice(Number(product.price) - (Number(product.price) * Number(product.discount)) / 100) }}
        </span>
      </div>
      <span v-else class="tp-product-details-price">
        {{ formatPrice(product.price) }}
      </span>
    </div>

    <!-- variations -->
    <!-- <div v-if="hasColorData" class="tp-product-details-variation">
      <div class="tp-product-details-variation-item">
        <h4 class="tp-product-details-variation-title">옵션 :</h4>
        <div class="tp-product-details-variation-list">
          <button
            v-for="(item, i) in product.imageURLs"
            :key="i"
            @click="productStore.handleImageActive(item.img)"
            type="button"
            :class="['color', 'tp-color-variation-btn', item.img === productStore.activeImg ? 'active' : '']"
            style="margin-right:5px"
          >
            <span :data-bg-color="item.color && item.color.clrCode" :style="`background-color:${item.color && item.color.clrCode}`"></span>
            <span v-if="item.color && item.color.name" class="tp-color-variation-tootltip">
              {{ item.color.name }}
            </span>
          </button>
        </div>
      </div>
    </div> -->

    <!-- product countdown start -->
    <div v-if="product.offerDate && product.offerDate.endDate">
      <product-details-countdown :product="product" />
    </div>
    <!-- product countdown end -->

    <!-- actions -->
    <div class="tp-product-details-action-wrapper">
      <h3 class="tp-product-details-action-title">Quantity</h3>
      <div class="tp-product-details-action-item-wrapper d-flex align-items-center">
        <div class="tp-product-details-quantity">
          <div class="tp-product-quantity mb-15 mr-15">
            <span class="tp-cart-minus" @click="decreaseQuantity">
              <svg-minus />
            </span>
            <input class="tp-cart-input" type="text" :value="cartStore.orderQuantity" disabled />
            <span class="tp-cart-plus" @click="increaseQuantity">
              <svg-plus-sm />
            </span>
          </div>
        </div>
        <div class="tp-product-details-add-to-cart mb-15 w-100">
          <button @click="cartStore.addCartProduct(product, product.idx, cartStore.orderQuantity)"
            class="tp-product-details-add-to-cart-btn w-100">
            Add To Cart
          </button>
        </div>
      </div>
      <nuxt-link :to="`/checkout`"
        @click.prevent="cartStore.addCartProduct(product, product.idx, cartStore.orderQuantity)"
        class="tp-product-details-buy-now-btn w-100 text-center">
        Buy Now
      </nuxt-link>
    </div>

    <div class="tp-product-details-action-sm">
      <button @click="compareStore.add_compare_product(product)" type="button" class="tp-product-details-action-sm-btn">
        <svg-compare-3 />
        Compare
      </button>
      <button @click="wishlistStore.toggleWishlist(product.idx)" type="button" class="tp-product-details-action-sm-btn">
        <svg-wishlist-3 />
        Add Wishlist
      </button>
      <button type="button" class="tp-product-details-action-sm-btn">
        <svg-ask-question />
        Ask a question
      </button>
    </div>

    <div v-if="isShowBottom">
      <div class="tp-product-details-query">
        <div class="tp-product-details-query-item d-flex align-items-center">
          <span>SKU: </span>
          <p>{{ product.sku }}</p>
        </div>
        <div class="tp-product-details-query-item d-flex align-items-center">
          <span>Category: </span>
          <p>{{ product.category }}</p>
        </div>
        <div class="tp-product-details-query-item d-flex align-items-center">
          <span>Tag: </span>
          <p>Android</p>
        </div>
      </div>
      <div class="tp-product-details-social">
        <span>Share: </span>
        <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="#"><i class="fa-brands fa-twitter"></i></a>
        <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
        <a href="#"><i class="fa-brands fa-vimeo-v"></i></a>
      </div>
      <div class="tp-product-details-msg mb-15">
        <ul>
          <li>30 days easy returns</li>
          <li>Order yours before 2.30pm for same day dispatch</li>
        </ul>
      </div>
      <div class="tp-product-details-payment d-flex align-items-center flex-wrap justify-content-between">
        <p>Guaranteed safe <br> & secure checkout</p>
        <img src="/img/product/icons/payment-option.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useProductStore } from '@/pinia/useProductStore';
import { useCartStore } from '@/pinia/useCartStore';
import { useCompareStore } from '@/pinia/useCompareStore';
import { useWishlistStore } from '@/pinia/useWishlistStore';

const productStore = useProductStore();
const cartStore = useCartStore();
const compareStore = useCompareStore();
const wishlistStore = useWishlistStore();

let textMore = ref(false)

const props = defineProps({
  product: Object,
  isShowBottom: {
    type: Boolean,
    default: true
  },
});

function formatPrice(price, withCurrency = true) {
  const formatted = Number(price).toLocaleString('ko-KR', {
    maximumFractionDigits: 0
  });
  return withCurrency ? `${formatted}원` : formatted;
}

function decreaseQuantity() {
  if (cartStore.orderQuantity > 1) {
    cartStore.orderQuantity--
  }
}
function increaseQuantity() {
  cartStore.orderQuantity++
}
</script>

<style scoped>
.star-rating {
  position: relative;
  display: inline-block;
  font-size: 1em;
  line-height: 1;
}

.star-rating__back,
.star-rating__front {
  display: flex;
  pointer-events: none;
}

.star-rating__back {
  color: #ccc;
}

.star-rating__front {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  white-space: nowrap;
  color: #ffc107;
}
</style>
