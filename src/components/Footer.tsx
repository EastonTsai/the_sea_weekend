import { Link } from 'react-router-dom'
import 'styles/Footer.scss'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container container">
        <p>
          網站資訊來自-&nbsp;
          <Link to={'https://data.gov.tw/'} target="_blank">
            政府資料開放平臺
          </Link>
        </p>
        <p>©Easton 個人作品</p>
      </div>
    </div>
  )
}
export default Footer