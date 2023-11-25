<script lang="ts" setup>
import { ref } from "vue"
import { images } from "@/assets/images"
import { onMounted } from "vue"
import { getPaymentStatusApi } from "@/api"
import { CheckOne } from "@icon-park/vue-next"
import { Button, Image } from "vant"
import { useCartStore } from "@/store/module/cart"

const cartStore = useCartStore()
const payStatusMap = {
  PENDING: "處理中",
  success: "成功付款",
  // failed: "付款失敗",
}
const payStatus = ref<keyof typeof payStatusMap>("PENDING")
const checkPaymentStatus = async () => {
  const data = await getPaymentStatusApi("xxxxxxxx")
  payStatus.value = (data as keyof typeof payStatusMap) || "PENDING"
}
onMounted(() => {
  setTimeout(() => {
    payStatus.value = "success"
    cartStore.clear()
  }, 2000)
})
</script>

<template>
  <div class="payment-status">
    <div class="wrapper">
      <div class="loading">
        <template v-if="payStatus == 'PENDING'">
          <Image width="45" height="45" :src="images.loading"></Image>
        </template>
        <template v-else>
          <CheckOne theme="filled" size="45" fill="#00b417" />
        </template>
      </div>
      <div class="status">
        <span>{{ payStatusMap[payStatus] }}</span>
      </div>
      <div class="desc">xxxxxxxx</div>
      <div class="desc">xxxxxxxx</div>
    </div>
    <Button v-if="payStatus !== 'PENDING'" type="primary" @click="$router.push('/')"> 返回首頁 </Button>
  </div>
</template>

<style lang="scss" scoped>
.payment-status {
  min-height: calc(100vh - 60px);
  padding: 15px 30px 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 280px;
  .loading {
    margin-bottom: 4px;
  }
  .status {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
  }
  .desc {
    font-size: 18px;
    margin-bottom: 2px;
  }
}
</style>
