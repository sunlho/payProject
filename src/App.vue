<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { onMounted } from "vue"
import { onBeforeMount } from "vue"
import { imagesPreloader } from "./utils/imgPreloader"
import { images } from "./assets/images"

window.isNotch = window.screen.height / window.screen.width > 1.8

NProgress.configure({
  easing: "ease",
  speed: 1000,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
  parent: "body",
})
onBeforeMount(async () => {
  NProgress.start()
  await imagesPreloader(images)
})
onMounted(async () => {
  NProgress.done()
})
</script>

<style scoped></style>
