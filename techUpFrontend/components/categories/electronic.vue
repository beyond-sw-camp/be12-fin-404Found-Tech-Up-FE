<template>
  <section class="tp-product-category pt-60 pb-15">
    <div class="container">
      <div class="row row-cols-xl-5 row-cols-lg-5 row-cols-md-4">
        <div class="col">
          <div class="tp-product-category-item text-center mb-40">
            <div class="tp-product-category-thumb fix">
              <a class="cursor-pointer" @click.prevent="handleParentCategory('CPU')">
                <img src="https://i.ibb.co/fYkYrr37/cpu-image.png" alt="product-category" />
              </a>
            </div>
            <div class="tp-product-category-content">
              <h3 class="tp-product-category-title">
                <a class="cursor-pointer" @click.prevent="handleParentCategory('CPU')">
                  CPU
                </a>
              </h3>
              <!--<p>{{mainStore.allProducts.filter((value) => value.category === 'CPU').length}} Product</p>-->
            </div>
          </div>
        </div>
        <!-- GPU-->
        <div class="col">
          <div class="tp-product-category-item text-center mb-40">
            <div class="tp-product-category-thumb fix">
              <a class="cursor-pointer" @click.prevent="handleParentCategory('GPU')">
                <img src="https://i.ibb.co/60TMGBxh/gpu-image.png" alt="product-category" />
              </a>
            </div>
            <div class="tp-product-category-content">
              <h3 class="tp-product-category-title">
                <a class="cursor-pointer" @click.prevent="handleParentCategory('GPU')">
                  GPU
                </a>
              </h3>
              <!--<p>{{mainStore.allProducts.filter((value) => value.category === 'GPU').length}} Product</p>-->
            </div>
          </div>
        </div>
        <!-- RAM -->
        <div class="col">
          <div class="tp-product-category-item text-center mb-40">
            <div class="tp-product-category-thumb fix">
              <a class="cursor-pointer" @click.prevent="handleParentCategory('RAM')">
                <img src="https://i.ibb.co/KjDn5j9v/ram-image.png" alt="product-category" />
              </a>
            </div>
            <div class="tp-product-category-content">
              <h3 class="tp-product-category-title">
                <a class="cursor-pointer" @click.prevent="handleParentCategory('RAM')">
                  RAM
                </a>
              </h3>
              <!-- <p>{{mainStore.allProducts.filter((value) => value.category === 'RAM').length}} Product</p> -->
            </div>
          </div>
        </div>
        <!-- SSD -->
        <div class="col">
          <div class="tp-product-category-item text-center mb-40">
            <div class="tp-product-category-thumb fix">
              <a class="cursor-pointer" @click.prevent="handleParentCategory('SSD')">
                <img src="https://i.ibb.co/DDmKNdqL/ssd-image.png" alt="product-category" />
              </a>
            </div>
            <div class="tp-product-category-content">
              <h3 class="tp-product-category-title">
                <a class="cursor-pointer" @click.prevent="handleParentCategory('SSD')">
                  SSD
                </a>
              </h3>
              <!--<p>{{mainStore.allProducts.filter((value) => value.category === "SSD").length}} Product</p>-->
            </div>
          </div>
        </div>
        <!-- HDD -->
        <div class="col">
          <div class="tp-product-category-item text-center mb-40">
            <div class="tp-product-category-thumb fix">
              <a class="cursor-pointer" @click.prevent="handleParentCategory('HDD')">
                <img src="https://i.ibb.co/rGmnH73J/hdd-image.png" alt="product-category" />
              </a>
            </div>
            <div class="tp-product-category-content">
              <h3 class="tp-product-category-title">
                <a class="cursor-pointer" @click.prevent="handleParentCategory('HDD')">
                  HDD
                </a>
              </h3>
              <!-- <p>{{mainStore.allProducts.filter((value) => value.category === "HDD").length}} Product</p>-->
            </div>
          </div>
        </div>
        <!-- END -->
      </div>





    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductFilterBackStore } from '@/pinia/useProductFilterBackStore'

const route  = useRoute()
const router = useRouter()
const store  = useProductFilterBackStore()

async function handleParentCategory(slug) {
  // 1) slug 생성
  const q = { ...route.query };
    if (slug) q.category = slug;
    else delete q.category;

    // B. URL 업데이트
    await router.push({ path: '/shop', query: q });

    // C. 스토어 필터 동기화
    store.productFilter.category   = slug;
    store.productFilter.nameKeyword = '';      // 이전 검색어가 남아있으면 제거

    // D. 백엔드에서 다시 가져오기
    await store.filterProducts(0, 10);
}

</script>
