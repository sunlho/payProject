import axios, { AxiosRequestConfig, AxiosInstance, AxiosStatic } from "axios"
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
    if (status === 200) {
      return data
    } else {
      return Promise.reject(data)
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)
export const request = instance.axios
export default instance
