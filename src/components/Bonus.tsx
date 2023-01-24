import { schema } from "../lib/api/types"
import { ReactComponent as FireIcon } from "../assets/fire.svg"
import { ReactComponent as ChevronIcon } from "../assets/chevron.svg"
import { formatDate } from "../lib/helpers/format"

interface Props {
  data: schema["DataInfoByAvailableBonuses"] | undefined
  error: schema["ResultOperation"] | undefined
}

function Bonuses({ data, error }: Props) {
  return (
    <div className="redLine">
      <div className="bonusContainer">
        {!data && !error ? (
          <>
            <p>Loading...</p>
          </>
        ) : data ? (
          <>
            <div className="bonusContainer__info">
              <h3 className="bonusAmount">{data.currentQuantity} бонусов</h3>
              <p className="bonusForBurn">
                {formatDate(data.dateBurning!)} сгорит <FireIcon /> {data.forBurningQuantity}{" "}
                бонусов
              </p>
            </div>
            <div className="bonusContainer__chevron">
              <ChevronIcon />
            </div>
          </>
        ) : (
          <>
            <p>{error?.message}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default Bonuses
