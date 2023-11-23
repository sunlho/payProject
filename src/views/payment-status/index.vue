<script lang="ts" setup>
import { ref } from "vue"
import { Image } from "vant"
import { images } from "@/assets/images"
import { onMounted } from "vue"
import { getPaymentStatusApi } from "@/api"

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
  }, 2000)
})
</script>

<template>
  <div class="payment-status">
    <div class="wrapper">
      <div class="status">
        <span>{{ payStatusMap[payStatus] }}</span>
        <Image width="20" height="20" :src="payStatus == 'PENDING' ? images.loading : images.success"></Image>
      </div>
      <div class="desc">xxxxxxxx</div>
      <div class="desc">xxxxxxxx</div>
    </div>
    <div class="back">
      <div class="button" @click="$router.push('/')">返回首頁</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.payment-status {
  min-height: calc(100vh - 60px);
  background-color: #fff;
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.wrapper {
  width: 100%;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 280px;
  padding-bottom: 40px;
  .status {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
  }
  .desc {
    font-size: 20px;
    margin-bottom: 10px;
  }
}
.back {
  margin-top: 50px;
  display: flex;
  .button {
    margin: 0 auto;
    color: #93a5ff;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>
