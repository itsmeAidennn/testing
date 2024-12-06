import style from '../../../styling/LandingPage/HomeSection/SlidingContent.module.css';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';

const SlidingContent = ({slideNumber, startAnimationForHeaderAndSlideButtons, toggleLogin, hideHeaderAndSlider, toggleSignup, isSignupDisabled, isLoginDisabled}) => {
  const contentSlides = [
    {
      schoolName: "UNIVERSIDAD DE MANILA",
      primaryTitle: "FAST",
      secondaryTitle: "EASY",
      content:"Signup to create an admission Account • Login for further updates about your application."
    },
    {
      schoolName: "UNIVERSIDAD DE MANILA",
      primaryTitle: "COMPUTER",
      secondaryTitle: "LABORATORY",
      content:"The Universidad de Manila Computer Laboratory for the different branches of our CET Department"
    },
    {
      schoolName: "UNIVERSIDAD DE MANILA",
      primaryTitle: "MEHAN",
      secondaryTitle: "GARDEN",
      content:"3 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid accusamus commodi, aspernatur velit nulla."
    },
    {
      schoolName: "UNIVERSIDAD DE MANILA",
      primaryTitle: "SCHOOL",
      secondaryTitle: "GROUNDS",
      content:"4 Lorem ipsum dolor sit ameta consectetur, adipisicing elit. Aliquid accusamus commodi, aspernatur velit nulla."
    }
  ]
  return (
    <div className={`${style.content} ${style.active} ${hideHeaderAndSlider ? style.hide : ""}`}>
      <div className={`${style.name} ${startAnimationForHeaderAndSlideButtons ? style.nameAnimationIn : style.nameAnimationOut}`}>
        {contentSlides[slideNumber -1].schoolName}
      </div>
      <h1 className={`${style.primaryTitle} ${startAnimationForHeaderAndSlideButtons ? style.primaryTitleAnimationIn : style.primaryTitleAnimationOut }`}>
        {contentSlides[slideNumber -1].primaryTitle} <br/><span className={`${style.secondaryTitle}`}> {contentSlides[slideNumber -1].secondaryTitle} </span>
      </h1>
      <p className={`${style.contentText} ${startAnimationForHeaderAndSlideButtons ? style.contentAnimationIn: style.contentAnimationOut}`}>
        {contentSlides[slideNumber -1].content}
      </p>
      <div id={`${style.buttons}`} className={`${startAnimationForHeaderAndSlideButtons ? style.buttonPopIn : style.buttonPopOut}`}>
        <LoginButton toggleLogin={toggleLogin} isLoginDisabled={isLoginDisabled} />
        <SignupButton toggleSignup={toggleSignup} isSignupDisabled={isSignupDisabled} />
      </div>
    </div>
  )
  
}

export default SlidingContent;