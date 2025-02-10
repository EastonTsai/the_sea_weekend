
export const getOutsideNumOfTimeCard = () => {
  const windowWidth = window.innerWidth
  if (windowWidth < 400) { return 5 }
  if (windowWidth < 960) { return 4 }
  if (windowWidth < 1280) { return 3 }
  if (windowWidth >= 1280) { return 2 }
}
export const getDayOfWeek = (date: string) => {
  // console.log(date)
  const newDate = new Date(date)
  const currentDay = newDate.getDate()
  const currentMonth = newDate.getMonth() + 1
  const day = newDate.getDay()
  const hour = newDate.getHours()
  const dayOfWeek = ['日', '一', '二', '三', '四', '五', '六']
  return {
    month: currentMonth,
    day: currentDay,
    dayOfWeek: dayOfWeek[day],
    hour: hour
  }
}
export const getCurrentDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  return `${year}/${month}/${day}`
}