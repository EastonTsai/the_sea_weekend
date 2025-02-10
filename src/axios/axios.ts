import axios from 'axios'
import { dive24HoursOfWeek } from './apiUrls'

const getData = async (apiUrl: string) => {
  try {
    const res = await axios.get(apiUrl)
    return res
  }
  catch (err) {
    console.error('getAPI 時發生錯誤: ', err)
  }
}
const sortDiveLocationName = (data: any) => {
  let newLocationName = []
  const location = data.Location
  const locationName = data.LocationsName
  for (let i = 0; i < location.length; i++) {
    if (i <= 0) {
      newLocationName.push(locationName[0])
      continue
    }
    if (i <= 2) {
      newLocationName.push(locationName[1])
      continue
    }
    if (i <= 4) {
      newLocationName.push(locationName[2])
      continue
    }
    if (i <= 5) {
      newLocationName.push(locationName[3])
      continue
    }
    if (i <= 13) {
      newLocationName.push(locationName[4])
      continue
    }
    if (i <= 14) {
      newLocationName.push(locationName[5])
      continue
    }
    if (i > 14) {
      newLocationName.push(locationName[6])
      continue
    }
  }
  data.LocationsName = newLocationName
}
const getNeedElement = (data: any[], need: string[]): any[] => {
  return data.filter((item: any) => need.includes(item.ElementName))
}
//把資料重新排列, 原本的元素中有時間, 改成時間中有元素
const sortData = (data: any, needElement: string[]) => {
  let newData = []
  const locationName = data.LocationsName
  const locations = data.Location
  for (let i = 0; i < locations.length; i++) {
    const elements = getNeedElement(locations[i].WeatherElement, needElement)
    const name = locations[i].LocationName
    const address = locationName[i]
    const location = locations[i].Latitude + ',' + locations[i].Longitude
    let startTimes = elements[0].Time.map((item: any) => { return { startTime: item.StartTime, elements: [] } })
    for (let n = 0; n < startTimes.length; n++) {
      for (let j = 0; j < elements.length; j++) {
        const obj = {
          elementName: elements[j].ElementName,
          elementValue: elements[j].Time[n].ElementValue,
        }
        startTimes[n].elements.push(obj)
      }
    }
    const obj = { name, address, location, startTimes }
    newData.push(obj)
  }
  return newData
}

export const getHomePageData = async (apiUrl: string) => {
  try {
    const res = await getData(apiUrl)
    if (res) {
      const data = res.data.cwaopendata.Dataset.Locations
      if (apiUrl === dive24HoursOfWeek) { sortDiveLocationName(data) }
      const needElement = ['最高溫度', '最低溫度', '風速', '風向', '24小時降雨機率', '天氣現象', '紫外線指數']
      const newData = sortData(data, needElement)
      return newData
    }
  }
  catch (err) { console.error('error', err) }
}

export const getLocationDataOf3Days = async (apiUrl: string, locationName: string) => {
  const res = await getData(apiUrl)
  try {
    if (res) {
      const data = res.data.cwaopendata.Dataset.Locations
      const location = data.Location.find((item: any) => item.LocationName === locationName)
      const elements = getNeedElement(location.WeatherElement, ['溫度', '風速', '風向', '3小時降雨機率', '天氣現象'])
      const times = elements[1].Time.map((element: any) => {
        const dataTime = element.DataTime
        const elements = []
        return { dataTime, elements }
      })
      for (let i = 0; i < elements.length; i++) {
        const elementName = elements[i].ElementName
        for (let n = 0; n < times.length; n++) {
          for (let j = n; j < elements[i].Time.length; j++) {
            if (
              times[n].dataTime === elements[i].Time[j].DataTime ||
              times[n].dataTime === elements[i].Time[j].StartTime
            ) {
              const elementValue = elements[i].Time[j].ElementValue
              times[n].elements.push({ elementName, elementValue })
              break
            }
          }
        }
      }
      return times
    }
  }
  catch (err) { console.error(err) }
}