import {useEffect, useState} from'react';
import SlidingImage from "./SlidingImages";
import Header from "./Header";
import SlidingContent from "./SlidingContent";
import LoginBox from './LoginBox';
import SignupBox from './SignupBox';
import SliderButtons from "./SliderButtons";
import style from  '../../../styling/LandingPage/HomeSection/Home.module.css'

const Home = () => {
  const [slideNumber, setSlideNumber] = useState(1);
  const [startAnimation, setStartAnimation] = useState(true);
  const [startAnimationForHeaderAndSlideButtons, setStartAnimationForHeaderAndSlideButtons] = useState(true)
  const [isSliderButtonsDisabled, setIsSliderButtonsDisabled] = useState(false);
  const handleContentChange = (i) => {
    // setIsSliderButtonsDisabled(true);
    setStartAnimationForHeaderAndSlideButtons(false);
    setTimeout(() => {
      setStartAnimation(false);
      setTimeout(() => {
        setSlideNumber(i);
        setTimeout(() => {
          setStartAnimation(true);
          setStartAnimationForHeaderAndSlideButtons(true);
          // setIsSliderButtonsDisabled(false);
        }, 500);
      }, 1000);
    }, 500)
  }

  const [loginPressed, setLoginPressed] = useState(false);
  const [isLoginHidden, setIsLoginHidden] = useState(true);
  const [isLoginDisabled, setIsLoginDisabled] = useState(false);
  const [signupPressed, setSignupPressed] = useState(false);
  const [isSignupHidden, setIsSignupHidden] = useState(true);
  const [isSignupDisabled, setIsSignupDisabled] = useState(false);
  const [hideHeaderAndSlider, setHideHeaderAndSlider] = useState(false);

  const toggleLogin = () => {
    // e.target.disabled = true;
    if(loginPressed === false){
      setIsLoginDisabled(true)
      setIsLoginHidden(!isLoginHidden)
      setLoginPressed(!loginPressed);
      setStartAnimationForHeaderAndSlideButtons(false)
      setTimeout(()=> {
        setHideHeaderAndSlider(!hideHeaderAndSlider)
      }, 700)
    }
    if(loginPressed === true) {
      setHideHeaderAndSlider(!hideHeaderAndSlider)
      setLoginPressed(!loginPressed);
      setStartAnimationForHeaderAndSlideButtons(true)
      setTimeout(()=> {
        setIsLoginHidden(!isLoginHidden)
        setIsLoginDisabled(false)
      }, 700)
    }
  }

  const toggleSignup = () => {
    if(signupPressed === false){
      setIsSignupDisabled(true);
      setIsSignupHidden(!isSignupHidden)
      setSignupPressed(!signupPressed);
      setStartAnimationForHeaderAndSlideButtons(false)
      setTimeout(()=> {
        setHideHeaderAndSlider(!hideHeaderAndSlider)
      }, 700)
    }
    if(signupPressed === true) {
      setHideHeaderAndSlider(!hideHeaderAndSlider)
      setSignupPressed(!signupPressed);
      setStartAnimationForHeaderAndSlideButtons(true)
      setTimeout(()=> {
        setIsSignupHidden(!isSignupHidden)
        setIsSignupDisabled(false);
      }, 500)
    }
  }

  return (
    <div id={`${style.home}`}>
      <SlidingImage slideNumber={slideNumber} startAnimation={startAnimation} />
      <SlidingContent slideNumber={slideNumber} startAnimationForHeaderAndSlideButtons={startAnimationForHeaderAndSlideButtons} toggleLogin={toggleLogin} isLoginDisabled={isLoginDisabled} hideHeaderAndSlider={hideHeaderAndSlider} toggleSignup={toggleSignup} isSignupDisabled={isSignupDisabled} />
      <LoginBox loginPressed={loginPressed} isLoginHidden={isLoginHidden} toggleLogin={toggleLogin} />
      <SignupBox signupPressed={signupPressed} isSignupHidden={isSignupHidden} toggleSignup={toggleSignup} setSignupPressed={setSignupPressed} />
      <SliderButtons slideNumber={slideNumber} handleContentChange={handleContentChange} startAnimationForHeaderAndSlideButtons={startAnimationForHeaderAndSlideButtons} hideHeaderAndSlider={hideHeaderAndSlider} isSliderButtonsDisabled={isSliderButtonsDisabled} />
      <Header startAnimation={startAnimation} />

    </div>
  )
}

export default Home;