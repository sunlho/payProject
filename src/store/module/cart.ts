import { defineStore } from "pinia"

type CardListItem = defs.swagger.bill & {
  unit?: string
  unitId?: string
  floor?: string
}
export const useCartStore = defineStore("cart", {
  state: (): {
    cartList: CardListItem[]
  } => {
    return {
      cartList: [],
    }
  },
  getters: {
    total(): number {
      return this.cartList.length
    },
  },
  actions: {
    add(item: CardListItem) {
      this.cartList.push(item)
    },
    indexRemove(index: number) {
      this.cartList.splice(index, 1)
    },
    noRemove(bill_no?: string) {
      this.cartList = this.cartList.filter((item) => item.bill_no != bill_no)
    },
    clear() {
      this.cartList = []
    },
  },
  // 本地化存储
  // persist: true,
})
