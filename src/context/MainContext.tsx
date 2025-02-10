import { createContext, ReactNode } from "react";


const homePageData = {
  currentDate: '',
  homePageState: 'surf',
  surfOfWeek: [],
  diveOfWeek: [],
  surfOf3Days: [],
  diveOf3Days: [],

}
export const MainContext = createContext(null)

const MainProvider = (props: { children: ReactNode }) => {
  return (
    <MainContext.Provider value={homePageData}>
      {props.children}
    </MainContext.Provider>
  )
}
export default MainProvider