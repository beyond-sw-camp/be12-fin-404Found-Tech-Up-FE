<template>
  <section class="tp-order-area pb-160">
    <div class="container">
      <div class="tp-order-inner">
        <div class="row gx-0">
          <div class="col-lg-6">
            <div class="tp-order-details" style="background-color: #4F3D97;">
              <div class="tp-order-details-top text-center mb-70">
                <div class="tp-order-details-icon">
                  <span>
                    <svg-order-icon />
                  </span>
                </div>
                <div class="tp-order-details-content">
                  <h3 class="tp-order-details-title">Your Order Confirmed</h3>
                  <p>We will send you a shipping confirmation email as soon <br> as your order ships</p>
                </div>
              </div>
              <div class="tp-order-details-item-wrapper">
                <div class="row">

                  <div class="col-sm-6">
                    <div class="tp-order-details-item">
                      <h4>Order Number:</h4>
                      <p>#{{ order?.orderIdx }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="tp-order-details-item">
                      <h4>Payment Method:</h4>
                      <p>{{ order?.paymentMethod === 'EASY_PAY' ? '카카오페이' : '신용 카드' }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="tp-order-info-wrapper">
              <h4 class="tp-order-info-title">Order Details</h4>

              <div class="tp-order-info-list">
                <ul>

                  <!-- header -->
                  <li class="tp-order-info-list-header">
                    <h4>Product</h4>
                    <h4>Total</h4>
                  </li>

                  <!-- item list -->
                  <li v-for="d in order?.orderDetails" :key="d.orderDetailIdx" class="tp-order-info-list-desc">
                    <div class="d-flex align-items-center">
                      <p class="mb-0">
                        {{ d.orderDetailName }}
                        <span class="mx-2">× {{ d.orderDetailQuantity }}</span>
                        <small v-if="d.orderDetailDiscount > 0" class="badge bg-warning text-dark me-2">
                          {{ d.orderDetailDiscount }}% off
                        </small>
                        <!-- coupon discount -->
                        <small v-if="
                          order.orderDetails.user_coupon_idx
                          && d.product.productIdx === order.couponProductIdx
                        " class="badge bg-danger">
                          -{{ order.couponDiscountRate }}% coupon
                        </small>
                      </p>
                    </div>
                    <span>
                      <template v-if="
                        d.orderDetailDiscount > 0 ||
                        (order.orderDetails.user_coupon_idx && d.product.productIdx === order.couponProductIdx)
                      ">
                        <!-- only strike & recalc when there is some discount -->
                        <small class="text-muted text-decoration-line-through">
                          {{ formatPrice(d.orderDetailPrice * d.orderDetailQuantity) }}
                        </small>
                        {{ formatPrice(calculateFinal(d)) }}
                      </template>
                      <template v-else>
                        <!-- otherwise just show the normal total -->
                        {{ formatPrice(d.orderDetailPrice * d.orderDetailQuantity) }}
                      </template>
                    </span>
                  </li>

                  <!-- subtotal -->
                  <li class="tp-order-info-list-subtotal">
                    <span>Subtotal</span>
                    <span>{{ formatPrice(order?.orderTotalPrice) }}</span>
                  </li>

                  <!-- shipping -->
                  <li class="tp-order-info-list-subtotal">
                    <span>Shipping</span>
                    <span>
                      <label>
                        {{
                          order?.shippingMethod === 'local_pickup' ? '반값 택배' :
                            order?.shippingMethod === 'flat_rate' ? '일반 택배' :
                              '무료'
                        }}:
                        <span>{{ formatPrice(order?.shipCost) }}</span>
                      </label>
                    </span>
                  </li>

                  <!-- total -->
                  <li class="tp-order-info-list-total">
                    <span>Total</span>
                    <span>{{ formatPrice(order?.orderTotalPrice + order?.shipCost) }}</span>
                  </li>
                </ul>
              </div>
              <div class="d-flex justify-content-end mt-4">
                <button class="tp-btn tp-btn-border tp-btn-border-sm" @click="handleRefund"
                  :disabled="isRefundDisabled">
                  {{ isRefundDisabled ? '환불 불가' : '환불' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['refund'])

const isRefundDisabled = computed(() =>
  ['REFUND_REQUESTED', 'UNPAID', 'CANCELED'].includes(props.order.orderStatus)
)

function handleRefund() {
  emit('refund', props.order.orderIdx)
}

function calculateFinal(d) {
  const unit = d.orderDetailPrice
  // after product discount
  let discounted = unit * (1 - (d.orderDetailDiscount || 0) / 100)
  // then coupon
  if (props.order.couponIdx
    && d.product.productIdx === props.order.couponProductIdx) {
    discounted *= (1 - props.order.couponDiscountRate / 100)
  }
  return discounted * d.orderDetailQuantity
}
</script>