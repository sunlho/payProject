<script lang="ts" setup>
import { getPaymentMethodApi, paymentRequestApi } from "@/api"
import type { paymentRequestData } from "@/api"
import { computed, ref, onBeforeMount } from "vue"
import { images } from "@/assets/images"
import { useRoute, useRouter } from "vue-router"
import { Image, Button, Col, Row, Radio, RadioGroup, showToast } from "vant"
import { useCartStore } from "@/store/module/cart"
import { groupBy } from "lodash-es"
import { storeToRefs } from "pinia"

const cartStore = useCartStore()
const { cartList } = storeToRefs(cartStore)
const route = useRoute()
const router = useRouter()
const formRef = ref<HTMLFormElement>()
const getPaymentMethodImage = (method?: string) => {
  switch (method) {
    case "credit_card":
      return images.visamasteraeLogo
    case "wechat_alipay":
      return images.aliwechatLogo
    default:
      return images.offlineLogo
  }
}

const selectPaymentIndex = ref<number>()
const paymentMethods = ref<defs.swagger.paymentMethods[]>([])
const getPaymentMethod = async () => {
  const data = await getPaymentMethodApi()
  paymentMethods.value = data.payment_methods || []
}
const payLoading = ref(false)
const payParams = ref<paymentRequestData>({
  provider: "",
  data: {
    bills: [
      {
        bill_no: "",
      },
    ],
    amount: "",
    locale: "",
  },
})
console.log(cartList)

const cartListGroup = computed(() => {
  return Object.values(
    groupBy(cartList.value, (e) => {
      return `${e.floor}-${e.unit}`
    }),
  )
    .map((item) => {
      return {
        floor: item[0].floor,
        unit: item[0].unit,
        bills: item,
      }
    })
    .filter((item) => !!item.unit)
})

onBeforeMount(async () => {
  await getPaymentMethod()
})

const DigitalAccuracy = 10000
const total = computed(() => {
  return cartListGroup.value.reduce((acc, cur) => {
    return (
      Math.round(
        Number(acc) * DigitalAccuracy +
          cur.bills.reduce((acc, cur) => {
            return Math.round(Number(acc) * DigitalAccuracy + Number(cur?.amount ?? 0) * DigitalAccuracy) / DigitalAccuracy
          }, 0) *
            DigitalAccuracy,
      ) / DigitalAccuracy
    )
  }, Number(serviceCharge.value))
})

const payment_form = ref<defs.swagger.paymentRes>({
  access_key: "",
  profile_id: "",
  transaction_uuid: "",
  signed_field_names: "",
  unsigned_field_names: "",
  signed_date_time: "",
  locale: "",
})

const serviceCharge = computed(() => {
  return paymentMethods.value?.[selectPaymentIndex.value ?? 0]?.service_charge ?? "0.00"
})

const onPayment = async () => {
  if (!cartStore.cartList || cartStore.cartList.length <= 0) return showToast({ message: "購物車為空" })
  if (selectPaymentIndex.value === void 0) return showToast({ message: "請選擇付款方式" })
  payLoading.value = true
  payParams.value = {
    provider: "xxxxxxx",
    data: {
      bills: cartStore.cartList
        .map((item) => {
          return { bill_no: item.bill_no }
        })
        .filter((item) => !!item.bill_no) as paymentRequestData["data"]["bills"],
      amount: cartStore.cartList
        .reduce((acc, cur) => {
          return Number(acc) + Number(cur?.amount ?? 0)
        }, 0)
        .toString(),
      locale: "en",
    },
  }
  const result = await paymentRequestApi(payParams.value)
  payment_form.value = result
  // formRef.value?.submit()
  router.push({
    name: "PaymentStatus",
    query: {
      paymentId: "xxxxxxx",
    },
  })
}

const toBack = () => {
  router.push({
    name: "Building",
    params: {
      id: route.query.buildingId as string,
    },
    query: {
      unitId: route.query.unitId as string,
    },
  })
}
</script>

<template>
  <div class="shopping-cart">
    <div class="wrapper">
      <div class="cell cart">
        <div class="title justify">
          <span>購物車</span>
          <div>
            <Button type="primary" size="mini" plain @click="cartStore.clear()"> 清空購物車</Button>
          </div>
        </div>
        <template v-for="v in cartListGroup">
          <div class="cell-item">
            <div class="left">
              <div style="padding-left: 10px">{{ `${v.floor} ${v.unit}` }}</div>
            </div>
            <div class="right"></div>
          </div>
          <template v-for="n in v.bills">
            <div class="cell-item">
              <div class="left">
                <div style="padding-left: 20px">{{ `${n.trs_to}${n.bill_type}` }}</div>
              </div>
              <div class="right">
                {{ n.amount }}
              </div>
            </div>
          </template>
        </template>
      </div>
      <div class="cell service-charge">
        <div class="cell-item">
          <div class="left">
            <div style="padding-right: 20px">手續費</div>
          </div>
          <div class="right">{{ serviceCharge }}</div>
        </div>
      </div>
      <div class="cell total">
        <div class="cell-item">
          <div class="left">
            <div style="padding-right: 20px">
              Total
              <span> (HDK) </span>
            </div>
          </div>
          <div class="right">{{ total }}</div>
        </div>
      </div>
      <div class="cell mode">
        <div class="title">付款方法</div>
        <RadioGroup style="flex: 1" v-model="selectPaymentIndex" text-position="left">
          <template v-for="(item, index) in paymentMethods" :key="index">
            <div class="method-box" :class="{ active: selectPaymentIndex == index }" @click="selectPaymentIndex = index">
              <div class="justify top">
                <Image width="40" height="40" :src="getPaymentMethodImage(item.method)"></Image>
                <Radio :name="index" @click.stop />
              </div>
              <div class="name">
                {{ item.name_chi }}
              </div>
            </div>
          </template>
        </RadioGroup>
      </div>
      <div class="cell pay">
        <Button style="width: 100px" type="primary" :loading="payLoading" @click="onPayment">付款</Button>
      </div>
    </div>
    <div class="back">
      <Button style="width: 70px" size="small" type="primary" plain @click="toBack">返回</Button>
    </div>
    <form ref="formRef" style="display: none" id="payment_form" action="payment_confirmation" method="post">
      <input type="hidden" name="access_key" :value="payment_form.access_key" />
      <input type="hidden" name="profile_id" :value="payment_form.profile_id" />
      <input type="hidden" name="transaction_uuid" :value="payment_form.transaction_uuid" />
      <input type="hidden" name="signed_field_names" :value="payment_form.signed_field_names" />
      <input type="hidden" name="unsigned_field_names" :value="payment_form.unsigned_field_names" />
      <input type="hidden" name="signed_date_time" :value="payment_form.signed_date_time" />
      <input type="hidden" name="locale" :value="payment_form.locale" />
    </form>
  </div>
</template>

<style lang="scss" scoped>
.shopping-cart {
  padding: 15px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.van-button {
  font-weight: 600;
}
.wrapper {
  width: 100%;
}
.cell {
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  .title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
  }
}

.cell-item {
  flex: 1;
  display: flex;
  min-height: 20px;
  .left {
    flex: 5;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 5px 0;
    border-right: 1px solid #dae2f2;
  }
  .right {
    flex: 2;
    display: flex;
    align-items: center;
    margin-left: 15px;
  }
}
.cell.cart {
  > .cell-item {
    border-bottom: 1px solid #dae2f2;
  }
}

.service-charge {
  .cell-item {
    .left {
      flex-direction: row-reverse;
    }
    border-bottom: 1px solid #dae2f2;
  }
}
.total.cell {
  .cell-item {
    .left {
      flex-direction: row-reverse;
      font-size: 16px;
      font-weight: 600;
      span {
        font-size: 12px;
        font-weight: 600;
      }
    }
    .right {
      font-size: 16px;
      font-weight: 600;
    }
  }
}
.mode.cell {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.van-radio-group {
  display: grid;
  grid-template-columns: repeat(auto-fill, 145px);
  justify-content: center;
}
.method-box {
  margin: auto;
  width: 140px;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 8px;
  overflow: hidden;
  border: 2px solid #dae2f2;
  &.active {
    border: 2px solid var(--primary-color);
  }
}

.pay.cell {
  flex-direction: row-reverse;
  padding: 15px 25px 15px 0;
}

.method-box {
  .justify {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .top {
    margin-bottom: 5px;
    align-items: flex-start;
  }
  .name {
    margin-left: 5px;
    font-size: 12px;
    font-weight: 600;
  }
}
.back {
  margin-top: 15px;
}
</style>
