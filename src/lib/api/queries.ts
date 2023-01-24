import axios from "axios"
import $api from "."
import { schema } from "./types"

export const fetchBonusInfo = async (
  accessToken: string | undefined | null
): Promise<schema["InfoByAvailableBonuses"]> => {
  const token = accessToken || (await getAccessToken())
  const { data } = await $api.get(`/api/v3/ibonus/generalinfo/${token}`)
  return data
}

export async function getAccessToken() {
  const { data } = await axios.post<schema["ResultAuthV3"]>(
    `${import.meta.env.VITE_URL_BASE}/api/v3/clients/accesstoken`,
    {
      idClient: import.meta.env.VITE_CLIENT_ID,
      paramName: "device",
      paramValue: import.meta.env.VITE_DEVICE_ID,
    },
    {
      headers: { AccessKey: import.meta.env.VITE_ACCESS_KEY },
    }
  )

  localStorage.setItem("token", data.accessToken!)
  return data.accessToken!
}
