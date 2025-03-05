import 'styles/HomePage.scss';
import { dive24HoursOfWeek, surf24HoursOfWeek } from "../axios/apiUrls";
import { getHomePageData } from "../axios/axios";
import Header from "components/Header";
import Footer from 'components/Footer';
import { useContext, useEffect, useState } from 'react';
import LocationCard from 'components/LocationCard';
import { MainContext } from 'context/MainContext';
import { getCurrentDate } from 'functions/functions';
import banner from 'files/3488074_m.jpg'

const HomePage = () => {
  const [locationData, setLocationData] = useState([])
  const mainContext = useContext(MainContext)

  useEffect(() => {
    if (mainContext.homePageState === 'surf') {
      if (mainContext.surfOfWeek.length < 1) {
        const currentDate = getCurrentDate()
        mainContext.currentDate = currentDate
        callApi(surf24HoursOfWeek)
      }
      else {
        const currentDate = getCurrentDate()
        if (currentDate === mainContext.currentDate) {
          setLocationData(mainContext.surfOfWeek)
        }
        else {
          mainContext.currentDate = currentDate
          callApi(surf24HoursOfWeek)
        }
      }
    }
    if (mainContext.homePageState === 'dive') {
      if (mainContext.diveOfWeek.length < 1) {
        const currentDate = getCurrentDate()
        mainContext.currentDate = currentDate
        callApi(dive24HoursOfWeek)
      }
      else {
        const currentDate = getCurrentDate()
        if (currentDate === mainContext.currentDate) {
          setLocationData(mainContext.diveOfWeek)
        }
        else {
          mainContext.currentDate = currentDate
          callApi(dive24HoursOfWeek)
        }
      }
    }
  }, [])

  const callApi = async (apiUrl: string) => {
    const data = await getHomePageData(apiUrl)
    try {
      if (data) {
        data.sort((a, b) => b.location.split(',')[0] - a.location.split(',')[0])
        setLocationData(data)
        saveToContext(apiUrl, data)
      }
    } catch (err) { console.error('getDiveOfWeekDataError', err) }
  }
  const saveToContext = (apiUrl: string, data: any[]) => {
    if (apiUrl === surf24HoursOfWeek) {
      mainContext.surfOfWeek = data
      mainContext.homePageState = 'surf'
    }
    if (apiUrl === dive24HoursOfWeek) {
      mainContext.diveOfWeek = data
      mainContext.homePageState = 'dive'
    }
  }

  return (
    <div className="home-page">
      <div className="home-page_header">
        <Header onClick={callApi} />
      </div>
      <div className="home-page_main container">
        <div className="home-page_main_banner">
          <img src={banner} alt="Banner" />
        </div>
        <div className="home-page_main_location">
          {locationData.map((data: any) => <LocationCard key={data.name} data={data} />)}
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default HomePage