<script lang="ts" setup>
import { onBeforeMount, ref, watch, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getBuildingFlatUnitApi, getBuildingFlatUnitBillApi, getBuildingInfoApi } from "@/api"
import { Picker, PickerConfirmEventParams, Popup, showToast, Cell, CellGroup, Radio, Checkbox } from "vant"
import { DownOne, ShoppingCartOne, CheckOne, AddOne } from "@icon-park/vue-next"
import { useCartStore } from "@/store/module/cart"
import { storeToRefs } from "pinia"

const cartStore = useCartStore()
const { cartList } = storeToRefs(cartStore)
const showFloor = ref(false)
const showUnit = ref(false)
const route = useRoute()
const router = useRouter()

const buildingId = route.params.id as string
const buildingInfo = ref<defs.swagger.buildingInfo>({})
const getBuildingInfo = async () => {
  const data = await getBuildingInfoApi(buildingId)
  buildingInfo.value = data
}
const buildingFloor = ref<{ value: string }[]>([])
const buildingFlatUnit = ref<defs.swagger.flats[]>([])
const selectFloor = ref<string>()
const onSelectFloor = (value: PickerConfirmEventParams) => {
  selectFloor.value = value.selectedValues[0] as string
  selectUnitId.value = ""
  selectUnit.value = ""
  showFloor.value = false
}
const buildingUnit = computed(() => {
  return buildingFlatUnit.value
    .filter((item) => item.floor == selectFloor.value)
    .map((item) => {
      return {
        value: item.unit_id,
        text: item.unit
      }
    })
})
const onShowSelectUnit = () => {
  if (!selectFloor.value) return showToast({ message: "請先選擇樓層" })
  showUnit.value = true
}
const selectUnitId = ref<string>()
const selectUnit = ref<string>()
const onSelectUnit = (value: PickerConfirmEventParams) => {
  selectUnitId.value = value.selectedOptions[0]?.value as string
  selectUnit.value = value.selectedOptions[0]?.text as string
  showUnit.value = false
  router.replace({
    query: {
      ...route.query,
      unitId: selectUnitId.value
    }
  })
}

const getBuildingFlatUnit = async () => {
  const data = await getBuildingFlatUnitApi(buildingId)
  buildingFlatUnit.value = data.flats || []
  const floorMap = new Map()
  data.flats?.forEach((item) => {
    floorMap.set(item.floor, item.floor)
  })
  buildingFloor.value = Array.from(floorMap.keys()).map((item) => {
    return {
      value: item,
      text: item
    }
  })
  if (route.query.unitId) {
    const unit = buildingFlatUnit.value.find((item) => item.unit_id == route.query.unitId)
    console.log(unit)
    selectFloor.value = unit?.floor
    selectUnitId.value = unit?.unit_id
    selectUnit.value = unit?.unit
  }
}

const unitBillList = ref<defs.swagger.bill[]>([])
const getBuildingFlatUnitBill = async (unitId: string) => {
  const data = await getBuildingFlatUnitBillApi(unitId)
  unitBillList.value = data || []
}

watch(
  () => selectUnitId.value,
  (val) => {
    if (val) {
      getBuildingFlatUnitBill(val)
    } else {
      unitBillList.value = []
    }
  }
)

const onToShoppingCart = () => {
  if (cartStore.total <= 0) return showToast({ message: "請先選擇賬單" })
  router.push({
    name: "ShoppingCart",
    query: {
      buildingId: buildingId,
      unitId: selectUnitId.value
    }
  })
}

const isSelect = computed(() => {
  return (bill_no?: string) => cartList.value.findIndex((_) => _.bill_no == bill_no) > -1
})

const handleOnClickBill = (item: defs.swagger.bill) => {
  const index = cartList.value.findIndex((_) => _.bill_no == item.bill_no)
  if (index > -1) {
    cartStore.removeIndex(index)
    return
  }
  cartStore.add({
    floor: selectFloor.value,
    unitId: selectUnitId.value,
    unit: selectUnit.value,
    ...item
  })
}

onBeforeMount(async () => {
  await getBuildingInfo()
  await getBuildingFlatUnit()
})
</script>

<template>
  <div class="building">
    <div class="address">
      <div>{{ buildingInfo.buildname_chi }}</div>
      <div>{{ buildingInfo.cli_chiadd }}</div>
    </div>
    <CellGroup>
      <Cell title="樓層" @click="showFloor = true" center>
        <template #value>
          <div style="display: flex; margin-left: auto">
            <span>
              {{ selectFloor || "選擇樓層" }}
            </span>
            <DownOne theme="outline" size="24" />
          </div>
        </template>
      </Cell>
      <Cell title="單位" @click="onShowSelectUnit" center>
        <template #value>
          <div style="display: flex; margin-left: auto">
            <span>
              {{ selectUnit || "選擇單位" }}
            </span>
            <DownOne theme="outline" size="24" />
          </div>
        </template>
      </Cell>
    </CellGroup>

    <div class="bill">
      <template v-for="item in unitBillList" :key="item.bill_no">
        <Cell
          class="bill-cell"
          :class="{
            active: isSelect(item.bill_no)
          }"
          @click="handleOnClickBill(item)"
        >
          <div class="cell">
            <div class="justify">
              <div class="no">{{ item.bill_no }}</div>
              <Checkbox :model-value="isSelect(item.bill_no)"></Checkbox>
            </div>
            <div class="type">{{ item.bill_type }}</div>
            <div class="justify">
              <div class="unit">{{ selectUnit }}</div>
              <div class="date">{{ item.bill_dt }}</div>
            </div>
            <div class="justify">
              <div class="status">{{ item.status }}</div>
              <div class="money">{{ item.amount }}</div>
            </div>
          </div>
        </Cell>
      </template>
    </div>
    <div class="cart-wrapper">
      <div class="cart-icon" @click="onToShoppingCart">
        <ShoppingCartOne theme="outline" size="25" fill="#0095B2" />
        <div class="number">
          {{ cartStore.total }}
        </div>
      </div>
    </div>

    <Popup v-model:show="showFloor" round position="bottom">
      <Picker
        :model-value="[selectFloor as string]"
        :columns="buildingFloor"
        @cancel="showFloor = false"
        @confirm="onSelectFloor"
      />
    </Popup>
    <Popup v-model:show="showUnit" round position="bottom">
      <Picker
        :model-value="[selectUnitId as string]"
        :columns="buildingUnit"
        @cancel="showUnit = false"
        @confirm="onSelectUnit"
      />
    </Popup>
  </div>
</template>

<style lang="scss" scoped>
.building {
  padding: 40px 60px;
  position: relative;
}
.address {
  margin-bottom: 25px;
  color: var(--text-color);
  font-weight: 600;
  :first-child {
    font-size: 20px;
    margin-bottom: 5px;
  }
  :last-child {
    font-size: 13px;
    opacity: 0.8;
  }
}
:deep() {
  .van-cell-group {
    // background: transparent;
    background: var(--light-color);
    box-shadow: unset;
    border: 1px solid #0095b2;
    border-radius: 6px;
    overflow: hidden;
    &::after {
      content: unset;
    }
    > .van-cell {
      border: unset;
    }
    .van-cell:first-child::after {
      border-color: #0095b2;
    }
  }
}

:deep() .van-cell {
  background-color: transparent;
  box-shadow: unset;
  border: 1px solid #0095b2;
  padding: 8px 12px;
  border-radius: 6px;
  .van-cell__value {
    color: var(--text-color);
    display: flex;
    text-align: left;
  }
  .i-icon {
    margin-left: 5px;
  }
}

.bill {
  margin-top: 15px;
}
.bill-cell.van-cell {
  border: 2px solid #dae2f2;
  &.active {
    border: 2px solid var(--primary-color);
  }
}
.bill-cell {
  color: var(--text-color);
  padding: 15px;
  font-size: 14px;
  cursor: pointer;
  background-color: rgba($color: #ffffff, $alpha: 1);
  margin-bottom: 15px;
  .cell {
    width: 100%;
    .no {
      font-size: 12px;
      font-weight: 600;
      opacity: 0.6;
    }
    .type {
      font-size: 16px;
      margin-bottom: 3px;
    }
    .unit {
      font-size: 12px;
      opacity: 0.8;
    }
    .date {
      opacity: 0.8;
    }

    .money {
      font-size: 16px;
      font-weight: 600;
    }
  }
}
.cart-wrapper {
  position: absolute;
  width: 55px;
  height: 55px;
  bottom: 40px;
  right: 20px;
}
.cart-icon {
  position: fixed;
  bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: #fff;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  box-shadow: 0px 0px 10px 0px rgba($color: #000000, $alpha: 0.2);
  > .number {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 18px;
    padding: 2px 5px;
    border-radius: 100px;
    background-color: #0095b2;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
