import 'styles/ThreeHourTimeCard.scss'

import { getDayOfWeek } from "functions/functions"

const ThreeHourTimeCard = (props: { data: any }) => {
  const { data } = props
  const elements = data.elements
  const temp = elements[0].elementValue.Temperature
  const windSpeed = elements[1].elementValue.WindSpeed
  const windDirection = elements[2].elementValue.WindDirection
  const rain = elements[3].elementValue.ProbabilityOfPrecipitation
  const weather = elements[4].elementValue.Weather
  const date = getDayOfWeek(data.dataTime)
  // console.log(temp, windDirection, windSpeed, rain, weather)

  return (
    <div className="three-hour-time-card">
      <div className="date">
        <div className="date_day">{date.month}/{date.day}</div>
        <div className="date_dayOfWeek">({date.dayOfWeek})</div>
      </div>
      <div className="date-hour">{date.hour}:00</div>
      <div className="data-weather">{weather}</div>
      <div className="data-temp">{temp}°</div>
      <div className="data-rain">{rain}%</div>
      <div className="data-wind">
        <div className="wind-direction">{windDirection}</div>
        <div className="wind-speed">{windSpeed}級</div>
      </div>
    </div>
  )
}
export default ThreeHourTimeCard