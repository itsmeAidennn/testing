import style from '../../../styling/LandingPage/SecondSection/Header.module.css'

const Header = () => {
  return (
    <div className={`${style.header}`}>
      <p className={`${style.headerTitle}`}>
        What we offer:
      </p>
      <p className={`${style.headerText}`}>
        Universidad de Manila admission page has various flexible features
      </p>
    </div>
  )
}

export default Header;