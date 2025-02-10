import 'styles/LocationCard.scss'
import TimeCard from './TimeCard'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getOutsideNumOfTimeCard } from 'functions/functions'
import { getLocationDataOf3Days } from '../axios/axios'
import { dive3HoursOf3Days, surf3HoursOf3Days } from '../axios/apiUrls'
import { MainContext } from 'context/MainContext'

const LocationCard = (props: { data: any }) => {
  const mainContext = useContext(MainContext)
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate()

  const handleClickScrollButton = (direction: string) => {
    if (direction === 'left') {
      if (currentIndex <= 0) { return }
      setCurrentIndex(prev => prev - 1)
      return
    }
    const outsideNum = getOutsideNumOfTimeCard()
    if (currentIndex < outsideNum) {
      setCurrentIndex(prev => prev + 1)
    }
  }
  const handleClickLocation = async () => {
    let apiUrl = ''
    if (mainContext.homePageState === 'surf') {
      apiUrl = surf3HoursOf3Days
    } else if (mainContext.homePageState === 'dive') {
      apiUrl = dive3HoursOf3Days
    }
    try {
      const res = await getLocationDataOf3Days(apiUrl, data.name)
      if (res) {
        const locationData = {
          locationName: data.name,
          address: data.address,
          location: data.location,
          times: res
        }
        navigate('/3Hours', { state: locationData })
      }
    }
    catch (err) { console.error('get3HoursDataError', err) }
  }

  const { data } = props
  return (
    <div className="location-card">
      <div className="name">
        <h1 onClick={handleClickLocation}>{data.name}</h1>
        <div className="link">
          <Link
            className='address'
            to={`https://www.google.com/maps?q=${data.location}`}
            target="_blank"
            rel="noopener noreferrer">
            {data.address}
          </Link>
        </div>
      </div>
      <div className="times">
        <div className="times_card">
          {data.startTimes.map((time: any) =>
            <TimeCard
              key={time.startTime}
              data={time}
              currentIndex={currentIndex}
            />)}
        </div>
        <div className="scroll-button">
          <div
            className="scroll-button_left"
            onClick={() => handleClickScrollButton('left')}
          >⫷</div>
          <div
            className="scroll-button_right"
            onClick={() => handleClickScrollButton('right')}
          >⫸</div>
        </div>
      </div>
    </div>
  )
}
export default LocationCard