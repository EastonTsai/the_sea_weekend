import 'styles/ThreeHoursOfLocation.scss'
import Header from 'components/Header'
import ThreeHourTimeCard from 'components/ThreeHourTimeCard'
import { Link, useLocation } from 'react-router-dom'

const ThreeHoursOfLocation = () => {
  const location = useLocation()
  const data = location.state

  return (
    <div className="three-hours-of-location">
      <div className="header">
        <Header />
      </div>
      <div className="body container">
        <Link
          className='body_title'
          to={`https://www.google.com/maps?q=${data.location}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.locationName}
        </Link>
        {/* <div className="body_title"></div> */}
        <div className="body_item-list">
          <div>日期</div>
          <div>時間</div>
          <div>天氣型態</div>
          <div>溫度</div>
          <div>降雨機率</div>
          <div>風向</div>
        </div>
        <div className="body_times">
          {data.times.map((time: any) => <ThreeHourTimeCard key={time.startTime} data={time} />)}
        </div>
      </div>
    </div>
  )
}
export default ThreeHoursOfLocation