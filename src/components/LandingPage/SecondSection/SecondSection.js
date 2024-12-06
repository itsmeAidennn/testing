import style from  '../../../styling/LandingPage/SecondSection/SecondSection.module.css';
import Header from './Header';
import Items from './Items';

const SecondSection = () => {

  return (
    <div className={`${style.slideRightIn} ${style.secondSection}`}>
      <Header />
      <Items />
    </div>
  )
}

export default SecondSection;