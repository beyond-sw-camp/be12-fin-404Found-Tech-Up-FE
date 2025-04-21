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
                      <p>{{ order?.paymentMethod }}</p>
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
                    <p>{{ d.orderDetailName }} <span> x {{ d.orderDetailQuantity }}</span></p>
                    <span>{{ formatPrice(
                      // TODO:할인율 표시하기기
                      // (d.product.discount > 0
                      //   ? d.product.orderDetailPrice * (1 - d.product.discount / 100)
                      //   : d.product.orderDetailPrice
                      // )
                       d.orderDetailPrice * d.orderDetailQuantity
                    ) }}</span>
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
                          {{ order?.shippingMethod }}:
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})
</script>