import 'styles/TimeCard.scss'
import { getDayOfWeek } from 'functions/functions'

const TimeCard = (props: { data: any, currentIndex: number }) => {
  const { data, currentIndex } = props
  const date = getDayOfWeek(data.startTime)
  const weekend = date.dayOfWeek === '六' || date.dayOfWeek === '日' ? true : false

  const getElement = (element: any) => {
    const key = Object.keys(element)[0]
    return element[key]
  }
  const weatherType = getElement(data.elements[5].elementValue)
  const minT = getElement(data.elements[1].elementValue)
  const maxT = getElement(data.elements[0].elementValue)
  const rain = getElement(data.elements[4].elementValue)
  const uv = getElement(data.elements[6].elementValue)
  const windScale = getElement(data.elements[2].elementValue)
  const windType = getElement(data.elements[3].elementValue)

  return (
    <div
      className="time-card"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      <div className={`date ${weekend && 'weekend'}`}>
        <h3 className='date_date'>{date.month + '/' + date.day}</h3>
        <h3 className={`date_day ${weekend && 'weekend'}`}>{date.dayOfWeek}</h3>
      </div>
      <div className="weather">
        {weatherType}
      </div>
      <div className="temperature">
        <p className="min">{minT}°</p>
        <p>~</p>
        <p className="max">{maxT}°</p>
        {/* {`${minT}° ~ ${maxT}° `} */}
      </div>
      <div className="rain">
        {`降雨 ${rain !== '-' ? rain : 0} %`}
      </div>
      <div className="sun">
        {`UV ${uv}`}
      </div>
      <div className="wind">
        {`${windScale} 級 ${windType}`}
      </div>
    </div>
  )
}
export default TimeCard