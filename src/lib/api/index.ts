import axios from "axios"
import { getAccessToken } from "./queries"
import { schema } from "./types"

const $api = axios.create({
  baseURL: import.meta.env.VITE_URL_BASE,
  headers: { AccessKey: import.meta.env.VITE_ACCESS_KEY },
})

//! An attempt to build a function that refreshes the AccessToken with the given API

$api.interceptors.response.use(async (config) => {
  const resultField: schema["ResultOperation"] | undefined =
    config.data.result || config.data.resultOperation
  const checkForErrorStatus = resultField ? resultField.status === 1 : false

  if (checkForErrorStatus) {
    try {
      const oldToken = localStorage.getItem("token")!
      const newToken = await getAccessToken()

      localStorage.setItem("token", newToken)
      config.request.url = config.request.url?.replace(oldToken, newToken)

      return $api.get(config.request.responseURL.replace(oldToken, newToken))
    } catch (err) {
      console.log(err)
    }
  }
  return config
})

export default $api
