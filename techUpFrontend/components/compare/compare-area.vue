<template>
  <section class="tp-compare-area pb-120">
    <div class="container">
      <!-- 비교 항목이 없을 때 -->
      <div v-if="false" class="text-center pt-50">
        <h3>비교할 상품이 없습니다</h3>
        <nuxt-link href="/shop" class="tp-cart-checkout-btn mt-20">쇼핑 계속하기</nuxt-link>
      </div>

      <!-- 비교 항목이 있을 때 -->
      <div v-else class="row">
        <div class="col-xl-12">
          <div v-if="myCpus.length > 0" class="tp-compare-table table-responsive text-center">
            <h4>CPU</h4>
            <table class="table">
              <tbody>
                <!-- 상품 정보 -->
                <tr>
                  <th>상품</th>
                  <td v-for="item in myCpus" :key="item.idx" :style="`${item.mine ? 'background-color:#BFEEBF' : ''}`">
                    <div class="tp-compare-thumb">
                      <img :src="item.images[0] ? item.images[0] : ''" alt="product" height="128px" />
                      <h4 class="tp-compare-product-title">
                        <nuxt-link :href="`/product-details/${item.idx}`">{{ item.name }}</nuxt-link>
                      </h4>
                      <div v-if="item.mine" style="font-size:smaller">내가 소유한 기기</div>
                    </div>
                  </td>
                </tr>

                <!-- 설명 -->
                <tr>
                  <th>상품 설명</th>
                  <td v-for="item in myCpus" :key="item.idx">
                    <div class="tp-compare-desc">
                      <p>{{ item.description.substring(0, 150) }}</p>
                    </div>
                  </td>
                </tr>

                <!-- 가격 -->
                <tr>
                  <th>가격</th>
                  <td v-for="item in myCpus" :key="item.idx">
                    <div class="tp-compare-price" v-if="item.discount > 0">
                      <span class="old-price">{{ formatPrice(item.price, false) }}</span>
                      <span>
                        {{ formatPrice((Number(item.price) - (Number(item.price) * Number(item.discount)) / 100)) }}
                      </span>
                    </div>
                    <div class="tp-compare-price" v-else>
                      <span>{{ formatPrice(item.price) }}</span>
                    </div>
                  </td>
                </tr>

                <!-- cpu 타입 -->
                <tr>
                  <th>CPU 브랜드</th>
                  <td v-for="item in myCpus" :key="item.idx">
                    <div>
                      {{ item.cpuSpec.amdCpuType ? item.cpuSpec.amdCpuType : '인텔 코어 시리즈' }}
                    </div>
                  </td>
                </tr>
                <!-- cpu 코어 -->
                <tr>
                  <th>코어 수, 스레드 수</th>
                  <td v-for="item in myCpus" :key="item.idx">
                    <div>
                      {{ item.cpuSpec.coreCount }} {{ item.cpuSpec.threadCount }}
                    </div>
                  </td>
                </tr>
                <!-- 스레드 수 -->
                <tr>
                  <th>캐시 크기, 내장 그래픽</th>
                  <td v-for="item in myCpus" :key="item.idx">
                    <div>
                      L3 {{ item.cpuSpec.l3Cache }}, {{ item.cpuSpec.builtInGraphic }}
                    </div>
                  </td>
                </tr>
                <!-- 스레드 수 -->
                <tr>
                  <th>공정, 부스트 클럭 </th>
                  <td v-for="item in myCpus" :key="item.idx">
                    <div>
                      {{ item.cpuSpec.manufactoringProcess }}, 최대 클럭 {{ item.cpuSpec.maxClock }}
                    </div>
                  </td>
                </tr>

                <!-- 스레드 수 -->
                <tr>
                  <th>PCie 버전 및 레인 수 </th>
                  <td v-for="item in myCpus" :key="item.idx">
                    <div>
                      버전 {{ item.cpuSpec.pcieVer }}, {{ item.cpuSpec.maxPcie }}
                    </div>
                  </td>
                </tr>

                <!-- 장바구니 담기 -->
                <tr>
                  <th>장바구니</th>
                  <td v-for="item in myCpus" :key="item.idx">
                    <div v-if="!item.mine" class="tp-compare-add-to-cart">
                      <button @click="cartStore.addCartProduct(item, item.idx)" type="button" class="tp-btn">장바구니
                        담기</button>
                    </div>
                    <div v-else>
                      -
                    </div>
                  </td>
                </tr>

                <!-- 제거 -->
                <tr>
                  <th>삭제</th>
                  <td v-for="item in myCpus" :key="item.idx">
                    <div v-if="!item.mine" class="tp-compare-remove">
                      <button @click="removeCompare(item)">
                        <i class="fal fa-trash-alt"></i>
                      </button>
                    </div>
                    <div v-else>
                      -
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="myGpus.length > 0" class="tp-compare-table table-responsive text-center">
            <h4>GPU(그래픽 카드)</h4>
            <table class="table">
              <tbody>
                <!-- 상품 정보 -->
                <tr>
                  <th>상품</th>
                  <td v-for="item in myGpus" :key="item.idx" :style="`${item.mine ? 'background-color:#BFEEBF' : ''}`">
                    <div class="tp-compare-thumb">
                      <img :src="item.images[0]" alt="product" height="128px" />
                      <h4 class="tp-compare-product-title">
                        <nuxt-link :href="`/product-details/${item.idx}`">{{ item.name }}</nuxt-link>
                      </h4>
                      <div v-if="item.mine" style="font-size:smaller">내가 소유한 기기</div>
                    </div>
                  </td>
                </tr>

                <!-- 설명 -->
                <tr>
                  <th>상품 설명</th>
                  <td v-for="item in myGpus" :key="item.idx">
                    <div class="tp-compare-desc">
                      <p>{{ item.description.substring(0, 150) }}</p>
                    </div>
                  </td>
                </tr>

                <!-- 가격 -->
                <tr>
                  <th>가격</th>
                  <td v-for="item in myGpus" :key="item.idx">
                    <div class="tp-compare-price" v-if="item.discount > 0">
                      <span class="old-price">{{ formatPrice(item.price, false) }}</span>
                      <span>
                        {{ formatPrice((Number(item.price) - (Number(item.price) * Number(item.discount)) / 100)) }}
                      </span>
                    </div>
                    <div class="tp-compare-price" v-else>
                      <span>{{ formatPrice(item.price) }}</span>
                    </div>
                  </td>
                </tr>

                <!-- 칩셋 -->
                <tr>
                  <th>등급</th>
                  <td v-for="item in myGpus" :key="item.idx">
                    <div>
                      {{ item.gpuSpec.chipsetManufacturer }} {{ item.gpuSpec.productSeries }}, {{
                        item.gpuSpec.gpuManufacturingProcess }}
                    </div>
                  </td>
                </tr>

                <!-- 메모리 -->
                <tr>
                  <th>VRAM</th>
                  <td v-for="item in myGpus" :key="item.idx">
                    <div>
                      {{ item.gpuSpec.gpuMemory }}
                    </div>
                  </td>
                </tr>

                <!-- 길이 -->
                <tr>
                  <th>길이 및 디스플레이 규격</th>
                  <td v-for="item in myGpus" :key="item.idx">
                    <div>
                      {{ item.gpuSpec.gpuLength }}, HDMI {{ item.gpuSpec.hdmi }}, DP {{ item.gpuSpec.displayPort }}
                    </div>
                  </td>
                </tr>

                <!-- 장바구니 담기 -->
                <tr>
                  <th>장바구니</th>
                  <td v-for="item in myGpus" :key="item.idx">
                    <div v-if="!item.mine" class="tp-compare-add-to-cart">
                      <button @click="cartStore.addCartProduct(item, item.idx)" type="button" class="tp-btn">장바구니
                        담기</button>
                    </div>
                    <div v-else>
                      -
                    </div>
                  </td>
                </tr>


                <!-- 제거 -->
                <tr>
                  <th>삭제</th>
                  <td v-for="item in myGpus" :key="item.idx">
                    <div v-if="!item.mine" class="tp-compare-remove">
                      <button @click="removeCompare(item)">
                        <i class="fal fa-trash-alt"></i>
                      </button>
                    </div>
                    <div v-else>
                      -
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="myRams.length > 0" class="tp-compare-table table-responsive text-center">
            <h4>RAM</h4>
            <table class="table">
              <tbody>
                <!-- 상품 정보 -->
                <tr>
                  <th>상품</th>
                  <td v-for="item in myRams" :key="item.idx" :style="`${item.mine ? 'background-color:#BFEEBF' : ''}`">
                    <div class="tp-compare-thumb">
                      <img :src="item.images[0]" alt="product" height="128px" />
                      <h4 class="tp-compare-product-title">
                        <nuxt-link :href="`/product-details/${item.idx}`">{{ item.name }}</nuxt-link>
                      </h4>
                      <div v-if="item.mine" style="font-size:smaller">내가 소유한 기기</div>
                    </div>
                  </td>
                </tr>

                <!-- 설명 -->
                <tr>
                  <th>상품 설명</th>
                  <td v-for="item in myRams" :key="item.idx">
                    <div class="tp-compare-desc">
                      <p>{{ item.description.substring(0, 150) }}</p>
                    </div>
                  </td>
                </tr>

                <!-- 가격 -->
                <tr>
                  <th>가격</th>
                  <td v-for="item in myRams" :key="item.idx">
                    <div class="tp-compare-price" v-if="item.discount > 0">
                      <span class="old-price">{{ formatPrice(item.price, false) }}</span>
                      <span>
                        {{ formatPrice((Number(item.price) - (Number(item.price) * Number(item.discount)) / 100)) }}
                      </span>
                    </div>
                    <div class="tp-compare-price" v-else>
                      <span>{{ formatPrice(item.price) }}</span>
                    </div>
                  </td>
                </tr>

                <!-- 램 타입  -->
                <tr>
                  <th>타입</th>
                  <td v-for="item in myRams" :key="item.idx">
                    <div>
                      {{ item.ramSpec.usageDevice }}
                    </div>
                  </td>
                </tr>

                <!-- 모듈 개수   -->
                <tr>
                  <th>모듈 개수</th>
                  <td v-for="item in myRams" :key="item.idx">
                    <div>
                      {{ item.ramSpec.ramNum }}
                    </div>
                  </td>
                </tr>

                <!-- 용량 -->
                <tr>
                  <th>모듈 당 용량</th>
                  <td v-for="item in myRams" :key="item.idx">
                    <div>
                      {{ item.ramSpec.ramSize }}
                    </div>
                  </td>
                </tr>

                <!-- 규격 -->
                <tr>
                  <th>장착 규격</th>
                  <td v-for="item in myRams" :key="item.idx">
                    <div>
                      {{ item.ramSpec.memorySpec }}
                    </div>
                  </td>
                </tr>

                <!-- 장바구니 담기 -->
                <tr>
                  <th>장바구니</th>
                  <td v-for="item in myRams" :key="item.idx">
                    <div v-if="!item.mine" class="tp-compare-add-to-cart">
                      <button @click="cartStore.addCartProduct(item, item.idx)" type="button" class="tp-btn">장바구니
                        담기</button>
                    </div>
                    <div v-else>
                      -
                    </div>
                  </td>
                </tr>

                <!-- 제거 -->
                <tr>
                  <th>삭제</th>
                  <td v-for="item in myRams" :key="item.idx">
                    <div v-if="!item.mine" class="tp-compare-remove">
                      <button @click="removeCompare(item)">
                        <i class="fal fa-trash-alt"></i>
                      </button>
                    </div>
                    <div v-else>
                      -
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="mySsds.length > 0" class="tp-compare-table table-responsive text-center">
            <h4>SSD</h4>
            <table class="table">
              <tbody>
                <!-- 상품 정보 -->
                <tr>
                  <th>상품</th>
                  <td v-for="item in mySsds" :key="item.idx" :style="`${item.mine ? 'background-color:#BFEEBF' : ''}`">
                    <div class="tp-compare-thumb">
                      <img :src="item.images[0]" alt="product" height="128px" />
                      <h4 class="tp-compare-product-title">
                        <nuxt-link :href="`/product-details/${item.idx}`">{{ item.name }}</nuxt-link>
                      </h4>
                      <div v-if="item.mine" style="font-size:smaller">내가 소유한 기기</div>
                    </div>
                  </td>
                </tr>

                <!-- 설명 -->
                <tr>
                  <th>상품 설명</th>
                  <td v-for="item in mySsds" :key="item.idx">
                    <div class="tp-compare-desc">
                      <p>{{ item.description.substring(0, 150) }}</p>
                    </div>
                  </td>
                </tr>

                <!-- 가격 -->
                <tr>
                  <th>가격</th>
                  <td v-for="item in mySsds" :key="item.idx">
                    <div class="tp-compare-price" v-if="item.discount > 0">
                      <span class="old-price">{{ formatPrice(item.price, false) }}</span>
                      <span>
                        {{ formatPrice((Number(item.price) - (Number(item.price) * Number(item.discount)) / 100)) }}
                      </span>
                    </div>
                    <div class="tp-compare-price" v-else>
                      <span>{{ formatPrice(item.price) }}</span>
                    </div>
                  </td>
                </tr>

                <!-- SSD 용량 -->
                <tr>
                  <th>용량</th>
                  <td v-for="item in mySsds" :key="item.idx">
                    <div>
                      {{ item.ssdSpec.ssdCapacity }}
                    </div>
                  </td>
                </tr>

                <!-- 읽기 속도 -->
                <tr>
                  <th>읽기 속도</th>
                  <td v-for="item in mySsds" :key="item.idx">
                    <div class="tp-compare-add-to-cart">
                      {{ item.ssdSpec.ssdRead }}
                    </div>
                  </td>
                </tr>

                <!-- 쓰기 속도 -->
                <tr>
                  <th>쓰기 속도</th>
                  <td v-for="item in mySsds" :key="item.idx">
                    <div class="tp-compare-add-to-cart">
                      {{ item.ssdSpec.ssdWrite }}
                    </div>
                  </td>
                </tr>


                <!-- 장바구니 담기 -->
                <tr>
                  <th>장바구니</th>
                  <td v-for="item in mySsds" :key="item.idx">
                    <div v-if="!item.mine" class="tp-compare-add-to-cart">
                      <button @click="cartStore.addCartProduct(item, item.idx)" type="button" class="tp-btn">장바구니
                        담기</button>
                    </div>
                    <div v-else>
                      -
                    </div>
                  </td>
                </tr>

                <!-- 제거 -->
                <tr>
                  <th>삭제</th>
                  <td v-for="item in mySsds" :key="item.idx">
                    <div v-if="!item.mine" class="tp-compare-remove">
                      <button @click="removeCompare(item)">
                        <i class="fal fa-trash-alt"></i>
                      </button>
                    </div>
                    <div v-else>
                      -
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="myHdds.length > 0" class="tp-compare-table table-responsive text-center">
            <h4>HDD</h4>
            <table class="table">
              <tbody>
                <!-- 상품 정보 -->
                <tr>
                  <th>상품</th>
                  <td v-for="item in myHdds" :key="item.idx" :style="`${item.mine ? 'background-color:#BFEEBF' : ''}`">
                    <div class="tp-compare-thumb">
                      <img :src="item.images[0]" alt="product" height="128px" />
                      <h4 class="tp-compare-product-title">
                        <nuxt-link :href="`/product-details/${item.idx}`">{{ item.name }}</nuxt-link>
                      </h4>
                      <div v-if="item.mine" style="font-size:smaller">내가 소유한 기기</div>
                    </div>
                  </td>
                </tr>

                <!-- 설명 -->
                <tr>
                  <th>상품 설명</th>
                  <td v-for="item in myHdds" :key="item.idx">
                    <div class="tp-compare-desc">
                      <p>{{ item.description.substring(0, 150) }}</p>
                    </div>
                  </td>
                </tr>

                <!-- 가격 -->
                <tr>
                  <th>가격</th>
                  <td v-for="item in myHdds" :key="item.idx">
                    <div class="tp-compare-price" v-if="item.discount > 0">
                      <span class="old-price">{{ formatPrice(item.price, false) }}</span>
                      <span>
                        {{ formatPrice((Number(item.price) - (Number(item.price) * Number(item.discount)) / 100)) }}
                      </span>
                    </div>
                    <div class="tp-compare-price" v-else>
                      <span>{{ formatPrice(item.price) }}</span>
                    </div>
                  </td>
                </tr>

                <!-- 용량 -->
                <tr>
                  <th>데이터 용량 및 버퍼 크기</th>
                  <td v-for="item in myHdds" :key="item.idx">
                    <div class="tp-compare-add-to-cart">
                      {{ item.hddSpec.hddCapacity }}GB, 버퍼 {{ item.hddSpec.hddBuffer }}MB
                    </div>
                  </td>
                </tr>

                <!-- 회전수 -->
                <tr>
                  <th>회전수 및 전송 속도, 소음</th>
                  <td v-for="item in myHdds" :key="item.idx">
                    <div class="tp-compare-add-to-cart">
                      {{ item.hddSpec.hddRpm }}RPM, {{ item.hddSpec.transferSpeed }} MB/s, {{ item.hddSpec.noise }}dB
                    </div>
                  </td>
                </tr>

                <!-- 버퍼 크기 -->
                <tr>
                  <th>제품 크기</th>
                  <td v-for="item in myHdds" :key="item.idx">
                    <div class="tp-compare-add-to-cart">
                      {{ item.hddSpec.diskSize }}인치, 두께 {{ thickness }}
                    </div>
                  </td>
                </tr>

                <!-- 장바구니 담기 -->
                <tr>
                  <th>장바구니</th>
                  <td v-for="item in myHdds" :key="item.idx">
                    <div v-if="!item.mine" class="tp-compare-add-to-cart">
                      <button @click="cartStore.addCartProduct(item, item.idx)" type="button" class="tp-btn">장바구니
                        담기</button>
                    </div>
                    <div v-else>
                      -
                    </div>
                  </td>
                </tr>

                <!-- 제거 -->
                <tr>
                  <th>삭제</th>
                  <td v-for="item in myHdds" :key="item.idx">
                    <div v-if="!item.mine" class="tp-compare-remove">
                      <button @click="removeCompare(item)">
                        <i class="fal fa-trash-alt"></i>
                      </button>
                    </div>
                    <div v-else>
                      -
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCompareStore } from '@/pinia/useCompareStore';
import { useCartStore } from '@/pinia/useCartStore';
import { useDeviceStore } from '@/pinia/useDeviceStore';
import { onMounted } from 'vue';

const compareStore = useCompareStore();
const cartStore = useCartStore();
const deviceStore = useDeviceStore();

let myCpus = ref([]);
let myGpus = ref([]);
let myRams = ref([]);
let mySsds = ref([]);
let myHdds = ref([]);

const removeCompare = async (item) => {
  compareStore.removeCompare(item);
  await processFilter();
}

const processFilter = async () => {
  myCpus.value = deviceStore.registerList.filter((value) => value.category === "CPU");
  if (myCpus.value.length > 0) {
    myCpus.value.forEach((value) => value.mine = true); // 추천 상품 삽입
    myCpus.value = await compareStore.loadSuggestionProducts(myCpus.value);
  }
  myCpus.value = myCpus.value.concat(compareStore.compare_cpu_items);
  myGpus.value = deviceStore.registerList.filter((value) => value.category === "GPU");
  if (myGpus.value.length > 0) {
    myGpus.value.forEach((value) => value.mine = true);
    myGpus.value = await compareStore.loadSuggestionProducts(myGpus.value); // 추천 상품 삽입
  }
  myGpus.value = myGpus.value.concat(compareStore.compare_gpu_items);
  myRams.value = deviceStore.registerList.filter((value) => value.category === "RAM");
  if (myRams.value.length > 0) {
    myRams.value.forEach((value) => value.mine = true);
    myRams.value = await compareStore.loadSuggestionProducts(myRams.value); // 추천 상품 삽입
  }
  myRams.value = myRams.value.concat(compareStore.compare_ram_items);
  mySsds.value = deviceStore.registerList.filter((value) => value.category === "SSD");
  if (mySsds.value.length > 0) {
    mySsds.value.forEach((value) => value.mine = true);
    mySsds.value = await compareStore.loadSuggestionProducts(mySsds.value); // 추천 상품 삽입
  }
  mySsds.value = mySsds.value.concat(compareStore.compare_ssd_items);
  myHdds.value = deviceStore.registerList.filter((value) => value.category === "HDD");
  if (myHdds.value.length > 0) {
    myHdds.value.forEach((value) => value.mine = true);
    myHdds.value = await compareStore.loadSuggestionProducts(myHdds.value); // 추천 상품 삽입
  }
  myHdds.value = myHdds.value.concat(compareStore.compare_hdd_items);
}

onMounted(async () => {
  await compareStore.initializeCompareProducts();
  await deviceStore.fetchMyDevices();
  await processFilter();
})

</script>