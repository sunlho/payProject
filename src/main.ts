import "./style/index.scss"
import "vant/lib/index.css"
import "element-plus/dist/index.css"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import pinia from "./store/index"

const app = createApp(App)
app.use(router).use(pinia).mount("#app")
