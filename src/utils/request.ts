import axios, { AxiosRequestConfig, AxiosInstance, AxiosStatic } from "axios"

const statusName = "code"
const messageName = "message"
const successCode = [
  200,
  201,
  0,
  "201",
  "200",
  "0",
  1001,
  "1001",
  1005,
  "1005",
  "1004",
  1004,
]
const contentType = "application/json"

interface MAxiosInstance extends AxiosInstance {
  <T = unknown, R = T, D = any>(config: AxiosRequestConfig<D>): Promise<T>
  <T = unknown, R = T, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<T>
}

class Axios {
  readonly axios: MAxiosInstance

  constructor(axios: AxiosStatic, config: AxiosRequestConfig) {
    this.axios = axios.create(config)
  }
}

export const instance = new Axios(axios, {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 300000,
  headers: {
    "Content-Type": contentType,
    actId: import.meta.env.VITE_ACT_ID,
  },
})

instance.axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
instance.axios.interceptors.response.use(
  (response) => {
    const { data, status } = response
    let code = data && data[statusName] ? data[statusName] : status
    if (successCode.includes(code)) code = 200
    switch (code) {
      case 200:
        return Promise.resolve(data)
      default:
        return Promise.reject(new Error(data[messageName]))
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)
export const request = instance.axios
export default instance
