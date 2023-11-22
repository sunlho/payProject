<script lang="ts" setup>
import { onBeforeMount, ref } from "vue"
import { Picker, PickerConfirmEventParams, Popup, showToast } from "vant"
import { useRoute, useRouter } from "vue-router"
import { watch } from "vue"
import { getBuildingFlatUnitApi, getBuildingFlatUnitBillApi, getBuildingInfoApi } from "@/api"
import { computed } from "vue"

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
  showFloor.value = false
}
const buildingUnit = computed(() => {
  return buildingFlatUnit.value
    .filter((item) => item.floor == selectFloor.value)
    .map((item) => {
      return {
        value: item.unit_id,
        text: item.unit,
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
  route.query.unitId = selectUnitId.value
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
      text: item,
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
    }
  },
)

const onToShoppingCart = () => {
  router.push({
    name: "ShoppingCart",
    query: {
      buildingId: buildingId,
      unitId: selectUnitId.value,
    },
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
    <div class="select" @click="showFloor = true">
      <div>{{ selectFloor || "樓層" }}</div>
      <div class="triangle"></div>
    </div>
    <div class="select" @click="onShowSelectUnit">
      <div>{{ selectUnit || "單位" }}</div>
      <div class="triangle"></div>
    </div>
    <div class="bill">
      <template v-for="item in unitBillList">
        <div class="bill-cell" @click="onToShoppingCart">
          <div>{{ item.bill_no }}</div>
          <div>{{ item.bill_type }}</div>
          <div class="justify">
            <div>{{ selectUnit }}</div>
            <div>{{ item.bill_dt }}</div>
          </div>
          <div class="justify">
            <div>{{ item.status }}</div>
            <div>{{ item.amount }}</div>
          </div>
        </div>
      </template>
    </div>
    <Popup v-model:show="showFloor" round position="bottom">
      <Picker :model-value="[selectFloor as string]" :columns="buildingFloor" @cancel="showFloor = false" @confirm="onSelectFloor" />
    </Popup>
    <Popup v-model:show="showUnit" round position="bottom">
      <Picker :model-value="[selectUnitId as string]" :columns="buildingUnit" @cancel="showUnit = false" @confirm="onSelectUnit" />
    </Popup>
  </div>
</template>

<style lang="scss" scoped>
.building {
  min-height: calc(100vh - 60px);
  background-color: #fff;
  padding: 40px 60px;
}
.address {
  margin-bottom: 25px;
}
.select {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  background-color: #bdd4ec;
  padding: 0 10px;
}
.triangle {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #000;
  position: relative;
  &::after {
    content: " ";
    position: absolute;
    top: -8px;
    left: -5px;
    z-index: 10;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #bdd4ec;
  }
}
.bill {
  margin-top: 25px;
}
.bill-cell {
  padding: 15px;
  border: 1px solid #000;
  cursor: pointer;
  &:not(:first-child) {
    border-top: none;
  }
}
.justify {
  display: flex;
  justify-content: space-between;
}
</style>
