<template>
  <section class="tp-product-category pt-60 pb-15">
    <div class="container">
      <div class="row row-cols-xl-5 row-cols-lg-5 row-cols-md-4">
        <div class="col">
          <div class="tp-product-category-item text-center mb-40">
            <div class="tp-product-category-thumb fix">
              <a class="cursor-pointer" @click="handleParentCategory('CPU')">
                <img src="https://i.ibb.co/fYkYrr37/cpu-image.png" alt="product-category" />
              </a>
            </div>
            <div class="tp-product-category-content">
              <h3 class="tp-product-category-title">
                <a class="cursor-pointer" @click="handleParentCategory('CPU')">
                  CPU
                </a>
              </h3>
              <p>{{mainStore.allProducts.filter((value) => value.category === 'CPU').length}} Product</p>
            </div>
          </div>
        </div>
        <!-- GPU-->
        <div class="col">
          <div class="tp-product-category-item text-center mb-40">
            <div class="tp-product-category-thumb fix">
              <a class="cursor-pointer" @click="handleParentCategory('GPU')">
                <img src="https://i.ibb.co/60TMGBxh/gpu-image.png" alt="product-category" />
              </a>
            </div>
            <div class="tp-product-category-content">
              <h3 class="tp-product-category-title">
                <a class="cursor-pointer" @click="handleParentCategory('GPU')">
                  GPU
                </a>
              </h3>
              <p>{{mainStore.allProducts.filter((value) => value.category === 'GPU').length}} Product</p>
            </div>
          </div>
        </div>
        <!-- RAM -->
        <div class="col">
          <div class="tp-product-category-item text-center mb-40">
            <div class="tp-product-category-thumb fix">
              <a class="cursor-pointer" @click="handleParentCategory('RAM')">
                <img src="https://i.ibb.co/KjDn5j9v/ram-image.png" alt="product-category" />
              </a>
            </div>
            <div class="tp-product-category-content">
              <h3 class="tp-product-category-title">
                <a class="cursor-pointer" @click="handleParentCategory('RAM')">
                  RAM
                </a>
              </h3>
              <p>{{mainStore.allProducts.filter((value) => value.category === 'RAM').length}} Product</p>
            </div>
          </div>
        </div>
        <!-- SSD -->
        <div class="col">
          <div class="tp-product-category-item text-center mb-40">
            <div class="tp-product-category-thumb fix">
              <a class="cursor-pointer" @click="handleParentCategory('SSD')">
                <img src="https://i.ibb.co/DDmKNdqL/ssd-image.png" alt="product-category" />
              </a>
            </div>
            <div class="tp-product-category-content">
              <h3 class="tp-product-category-title">
                <a class="cursor-pointer" @click="handleParentCategory('SSD')">
                  SSD
                </a>
              </h3>
              <p>{{mainStore.allProducts.filter((value) => value.category === "SSD").length}} Product</p>
            </div>
          </div>
        </div>
        <!-- HDD -->
        <div class="col">
          <div class="tp-product-category-item text-center mb-40">
            <div class="tp-product-category-thumb fix">
              <a class="cursor-pointer" @click="handleParentCategory('HDD')">
                <img src="https://i.ibb.co/rGmnH73J/hdd-image.png" alt="product-category" />
              </a>
            </div>
            <div class="tp-product-category-content">
              <h3 class="tp-product-category-title">
                <a class="cursor-pointer" @click="handleParentCategory('HDD')">
                  HDD
                </a>
              </h3>
              <p>{{mainStore.allProducts.filter((value) => value.category === "HDD").length}} Product</p>
            </div>
          </div>
        </div>
        <!-- END -->
      </div>





    </div>
  </section>
</template>

<script>
import { useMainStore } from "../../pinia/useMainStore";

export default {
  setup() {

    const router = useRouter();

    const handleParentCategory = (value) => {
      const newCategory = value.toLowerCase().replace("&", "").split(" ").join("-");
      router.push(`/shop?category=${newCategory}`);
    };
    const mainStore = useMainStore();

    return { mainStore, handleParentCategory };
  }
}
</script>
