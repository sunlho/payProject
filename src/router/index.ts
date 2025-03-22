import { createRouter, createWebHashHistory } from "vue-router"
import type { RouteRecordRaw, RouterOptions } from "vue-router"

const publicRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "",
        name: "Index",
        component: () => import("@/views/index/index.vue")
      },
      {
        path: "building/:id",
        name: "Building",
        component: () => import("@/views/building/index.vue")
      },
      {
        path: "shopping-cart",
        name: "ShoppingCart",
        component: () => import("@/views/shopping-cart/index.vue")
      },
      {
        path: "payment-status",
        name: "PaymentStatus",
        component: () => import("@/views/payment-status/index.vue")
      }
    ]
  }
]

const router = createRouter(<RouterOptions>{
  history: createWebHashHistory(),
  routes: [...publicRoutes]
})

router.beforeEach((to, from, next) => {
  window.document.getElementById("app")?.scrollTo(0, 0)
  next()
})

export default router
