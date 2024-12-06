import style from '../../../styling/LandingPage/HomeSection/Header.module.css'
import menu from '../../../media/menu.png'
import React, { useState } from 'react'

const Header = ({ startAnimation }) => {
  const [nav, setNav] = useState(false)

  const handleNav = () => {
    setNav(prevNav => !prevNav)
  }

  return (
    <div className={`${style.navigation} ${startAnimation ? style.slideDownIn : style.slideUpOut}`}>
      <a className={style.navigationLinks} href="#">Home</a>
      <a className={style.navigationLinks} href="#">About</a>
      <a className={style.navigationLinks} href="#">Services</a>
      <a className={style.navigationLinks} href="#">Message Us</a>

      {/* <div onClick={handleNav} className="block md:hidden">
        <img src={menu} alt="menu" className={style.menuIcon} />
      </div>

      <div className={`${nav ? style.menuMobile : 'fixed left-[-100%]'}`}>
        <ul>
          <li>
            <a id={`${style.navigationLinks}`} href="#">Home</a>
          </li>
          <li>
            <a id={`${style.navigationLinks}`} href="#">About</a>
          </li>
          <li>
            <a id={`${style.navigationLinks}`} href="#">Services</a>
          </li>
          <li>
            <a id={`${style.navigationLinks}`} href="#">Message Us</a>
          </li>
        </ul>
      </div> */}
    </div>
  )
}

export default Header;
