import { React, useState, useEffect } from 'react';
import style from '../../styling/RegistrarAndAdmin/RegistrarLandingPage.module.css';
import RegistrarLoginAndSignup from './LoginAndSignupBox';
import { useNavigate } from 'react-router-dom';

const RegistrarLandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkSessionStatus = async () => {
      try{
        const response = await fetch('/api/sessionCheckerRegistrar', {
          method: 'POST',
          credentials: 'include',
        })
        if(response.ok) {
          const data = await response.json();
          if(data.isAuthenticated){
            navigate('/registrar-admin-dashboard');
          };
        }
      } catch (e) {
        alert("Couldn't Check the user authenticity for some reason")
        console.log(e);
      }
    }
    checkSessionStatus();
  }, []);

  const [startButtonAnimations, setStartButtonAnimations] = useState(true);
  const [areButtonsHidden, setAreButtonsHidden] = useState(false);
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);

  const [isTheBoxHidden, setIsTheBoxHidden] = useState(true);
  const [boxAnimationIn, setBoxAnimationIn] = useState(false);

  const [boxContent, setBoxContent] = useState('error');

  const loginIsPressed= () => {
    setAreButtonsDisabled(!areButtonsDisabled);
    setBoxContent('login');
    setStartButtonAnimations(!startButtonAnimations);
    setTimeout(() => {
      setIsTheBoxHidden(!isTheBoxHidden);
      setBoxAnimationIn(!boxAnimationIn);
    }, 150)
    setTimeout(() => {
      setAreButtonsHidden(!areButtonsHidden);
      setAreButtonsDisabled(!areButtonsDisabled);
    }, 500)

  }

  const signupIsPressed =  () => {
    setAreButtonsDisabled(!areButtonsDisabled);
    setBoxContent('signup');
    setStartButtonAnimations(!startButtonAnimations);
    setTimeout(() => {
      setIsTheBoxHidden(!isTheBoxHidden);
      setBoxAnimationIn(!boxAnimationIn);
    }, 150)
    setTimeout(() =>{
      setAreButtonsHidden(!areButtonsHidden);
      setAreButtonsDisabled(!areButtonsDisabled);
    }, 500)
  }

  const handleCloseBox = (e = null) => {
    if (e) {
      e.target.disabled = true;
    }
    setBoxAnimationIn(!boxAnimationIn);
    setTimeout(() =>{
      setAreButtonsHidden(!areButtonsHidden);
      setAreButtonsDisabled(!areButtonsDisabled);
      setStartButtonAnimations(!startButtonAnimations);
    }, 150)
    setTimeout(() =>{
      if (e) {
        e.target.disabled = false;
      }
      setIsTheBoxHidden(!isTheBoxHidden);
    }, 450)
  }
  

  return(
    <div className={`${style.background}`}>
      <button id={`${style.loginButton}`} className={`${startButtonAnimations ? style.slideRightInLoginButton : style.slideLeftOutLoginButton}`} onClick={loginIsPressed} hidden={areButtonsHidden} disabled={areButtonsDisabled}>LOGIN</button>
      <button id={`${style.signupButton}`} className={`${startButtonAnimations ? style.slideLeftInSignupButton : style.slideRightOutSignupButton}`} onClick={signupIsPressed} hidden={areButtonsHidden} disabled={areButtonsDisabled}>SIGN UP</button>
      <RegistrarLoginAndSignup isTheBoxHidden={isTheBoxHidden} boxAnimationIn={boxAnimationIn} handleCloseBox={handleCloseBox} boxContent={boxContent} />
    </div>
  )
}

export default RegistrarLandingPage;