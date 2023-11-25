<script lang="ts" setup>
import { RouterView } from "vue-router"
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
</script>

<template>
  <div>
    <Header></Header>
    <div class="layout">
      <RouterView></RouterView>
    </div>
    <Footer></Footer>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  max-width: 750px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  min-height: calc(100vh - 120px);
}
</style>
