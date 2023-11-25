import "./style/index.scss"
import "vant/lib/index.css"
import "@nutui/nutui/dist/style.css"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import pinia from "./store/index"
import NutUI from "@nutui/nutui"

const app = createApp(App)
app.use(router).use(pinia).use(NutUI).mount("#app")
