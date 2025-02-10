import { dive24HoursOfWeek, surf24HoursOfWeek } from '../axios/apiUrls'
import { MainContext } from 'context/MainContext'
import { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import 'styles/Header.scss'
import logo from '../files/海人週末_Logo.png'

const Header = (props: { onClick?: (apiUrl: string) => void }) => {
  const context = useContext(MainContext)
  const state = context.homePageState
  const [currentState, setCurrentState] = useState(state)
  const navigate = useNavigate()
  const location = useLocation()

  const handleViewContext = () => {
    console.log(context)
  }
  const handleClickItem = (apiUrl: string, state: string) => {
    if (location.pathname !== '/') {
      navigate('/')
    } else {
      props.onClick(apiUrl)
    }
    setCurrentState(state)
  }

  return (
    <div className="header">
      <div className="header-container container">
        <div className="header_logo">
          <Link to='/'>
            <img src={logo} alt='LOGO' />
          </Link>
        </div>
        <div className="header_menu">
          <div
            className={`
              header_menu_surf 
              ${currentState === 'surf' && 'focus'}
              `}
            onClick={() => handleClickItem(surf24HoursOfWeek, 'surf')}
          >衝浪</div>
          <div
            className={`
              header_menu_dive 
              ${currentState === 'dive' && 'focus'}
              `}
            onClick={() => handleClickItem(dive24HoursOfWeek, 'dive')}
          >潛水</div>
        </div>
        {/* <div onClick={handleViewContext}>view context</div> */}
      </div>
    </div>
  )
}
export default Header