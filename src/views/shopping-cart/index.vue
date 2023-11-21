<script lang="ts" setup>
import { computed } from "vue"
import {} from "vue"

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

const payMode = [
  {
    title: "card like",
  },
  {
    title: "card like",
  },
  {
    title: "card like",
  },
  {
    title: "card like",
  },
]
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
        <div class="mode-box">
          <template v-for="item in payMode">
            <div class="mode-box-item">
              <div>{{ item.title }}</div>
              <div>checkbox</div>
            </div>
          </template>
        </div>
      </div>
      <div class="cell pay">
        <div class="button" @click="$router.push('/payment-status')">付款</div>
      </div>
    </div>
    <div class="back">
      <div class="button" @click="$router.push('/building')">返回</div>
    </div>
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
  margin-left: 40px;
  display: flex;
  flex-wrap: wrap;
  & .mode-box-item:nth-child(n) {
    margin-right: 15px;
  }
}
.mode-box-item {
  border: 1px solid #000;
  width: 80px;
  height: 40px;
  margin-bottom: 16px;
  background-color: #bdd4ec;
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
