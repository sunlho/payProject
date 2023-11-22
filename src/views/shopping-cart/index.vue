<script lang="ts" setup>
import { getPaymentMethodApi, paymentRequestApi } from "@/api"
import { onBeforeMount, onMounted } from "vue"
import { computed, ref } from "vue"
import { Image, Radio, RadioGroup, showToast } from "vant"
import { images } from "@/assets/images"
import { useRoute, useRouter } from "vue-router"

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

const payParams = ref<{
  provider: string
  data: {
    amount: string
    locale: string
  }
}>({
  provider: "",
  data: {
    amount: "",
    locale: "",
  },
})

onBeforeMount(async () => {
  await getPaymentMethod()
})
const items = [
  {
    title: "item",
    items: [
      {
        title: "sub-item",
        number: 100,
      },
      {
        title: "sub-item",
        number: 233,
      },
      {
        title: "sub-item",
        number: 233,
      },
    ],
  },
]

const total = computed(() => {
  return items.reduce((acc, cur) => {
    return (
      acc +
      cur.items.reduce((acc, cur) => {
        return acc + cur.number
      }, 0)
    )
  }, 0)
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

const onPayment = async () => {
  if (selectPaymentIndex.value === void 0) return showToast({ message: "請選擇付款方式" })
  payParams.value = {
    provider: "xxxxxxx",
    data: {
      amount: total.value.toString(),
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
      <div class="cell">
        <template v-for="v in items">
          <div class="cell-item">
            <div class="left">
              <div style="padding-left: 10px">{{ v.title }}</div>
            </div>
            <div class="right"></div>
          </div>
          <template v-for="n in v.items">
            <div class="cell-item">
              <div class="left">
                <div style="padding-left: 20px">{{ n.title }}</div>
              </div>
              <div class="right">
                {{ n.number }}
              </div>
            </div>
          </template>
        </template>
      </div>
      <div class="cell total">
        <div class="cell-item">
          <div class="left">
            <div style="padding-right: 20px">Total</div>
          </div>
          <div class="right">{{ total }}</div>
        </div>
      </div>
      <div class="cell mode">
        <div class="title">付款方法</div>
        <RadioGroup v-model:model-value="selectPaymentIndex" class="mode-box">
          <template v-for="(item, index) in paymentMethods">
            <div class="mode-box-item" @click="selectPaymentIndex = index">
              <div>
                <Image width="50" height="50" :src="getPaymentMethodImage(item.method)"></Image>
              </div>
              <div><Radio :icon-size="12" :name="index" @click.stop /></div>
            </div>
          </template>
        </RadioGroup>
      </div>
      <div class="cell pay">
        <div class="button" @click="onPayment">付款</div>
      </div>
    </div>
    <div class="back">
      <div class="button" @click="toBack">返回</div>
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
}
.cell {
  border: 1px solid #000;
  &:not(:first-child) {
    border-top: none;
  }
  display: flex;
  flex-direction: column;
}

.cell-item {
  flex: 1;
  display: flex;
  min-height: 20px;
  &:first-child {
    .left,
    .right {
      padding-top: 15px;
    }
  }
  &:last-child {
    .left,
    .right {
      padding-bottom: 15px;
    }
  }
  .left {
    flex: 3;
    border-right: 1px solid #000;
    display: flex;
    align-items: center;
  }
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: 15px;
  }
}

.total.cell {
  .cell-item {
    .left {
      flex-direction: row-reverse;
    }
  }
}
.mode.cell {
  display: flex;
  flex-direction: column;
  padding: 10px;
  .title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
  }
}
.mode-box {
  margin-left: 25px;
  display: flex;
  flex-wrap: wrap;
  & .mode-box-item:nth-child(n) {
    margin-right: 10px;
  }
}
.mode-box-item {
  border: 1px solid #000;
  width: 90px;
  height: 75px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pay.cell {
  flex-direction: row-reverse;
  padding: 25px 10px 15px 0;
  .button {
    width: 100px;
    height: 40px;
    background-color: #ecbdc5;
    border: 1px solid #000;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
.back {
  margin-top: 30px;
  display: flex;
  .button {
    margin: 0 auto;
    background-color: #bdd4ec;
    width: 100px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1px solid #000;
    overflow: hidden;
    cursor: pointer;
  }
}
</style>
