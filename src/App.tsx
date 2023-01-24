import { useEffect, useState } from "react"
import Bonus from "./components/Bonus"
import Header from "./components/Header"
import { fetchBonusInfo } from "./lib/api/queries"
import { schema } from "./lib/api/types"

function App() {
  const [data, setData] = useState<schema["DataInfoByAvailableBonuses"] | undefined>()
  const [error, setError] = useState<schema["ResultOperation"] | undefined>()

  useEffect(() => {
    fetchBonusInfo(localStorage.getItem("token")!).then((res) => {
      if (res.data) {
        setData(res.data)
      } else {
        setError(res.resultOperation)
      }
    })
  }, [])

  return (
    <div>
      <Header />
      <Bonus data={data} error={error} />
    </div>
  )
}

export default App
