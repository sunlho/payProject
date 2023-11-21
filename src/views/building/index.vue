<script lang="ts" setup>
import { ref } from "vue"
import { Field, Picker, Popup } from "vant"

const showFloor = ref(false)
const showCorporation = ref(false)

const onConfirm = (value: string[]) => {}

const billList = ref([
  {
    billNo: "bill no",
    billType: "bill type",
    corporation: "單位",
    date: "YYYY年MM月",
    status: "status",
    amount: "金額",
  },
  {
    billNo: "bill no",
    billType: "bill type",
    corporation: "單位",
    date: "YYYY年MM月",
    status: "status",
    amount: "金額",
  },
  {
    billNo: "bill no",
    billType: "bill type",
    corporation: "單位",
    date: "YYYY年MM月",
    status: "status",
    amount: "金額",
  },
])
</script>

<template>
  <div class="building">
    <div class="address">
      <div>大厦名</div>
      <div>地址</div>
    </div>
    <div class="select" @click="showFloor = true">
      <div>樓層</div>
      <div class="triangle"></div>
    </div>
    <div class="select" @click="showCorporation = true">
      <div>單位</div>
      <div class="triangle"></div>
    </div>
    <div class="bill">
      <template v-for="item in billList">
        <div class="bill-cell" @click="$router.push('/shopping-cart')">
          <div>{{ item.billNo }}</div>
          <div>{{ item.billType }}</div>
          <div class="justify">
            <div>{{ item.corporation }}</div>
            <div>{{ item.date }}</div>
          </div>
          <div class="justify">
            <div>{{ item.status }}</div>
            <div>{{ item.amount }}</div>
          </div>
        </div>
      </template>
    </div>
    <Popup v-model:show="showFloor" round position="bottom">
      <Picker :columns="[]" @cancel="showFloor = false" @confirm="onConfirm" />
    </Popup>
    <Popup v-model:show="showCorporation" round position="bottom">
      <Picker :columns="[]" @cancel="showCorporation = false" @confirm="onConfirm" />
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  background-color: #bdd4ec;
  padding: 15px 10px;
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
