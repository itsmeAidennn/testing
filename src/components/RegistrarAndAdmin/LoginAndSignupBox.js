import { React } from 'react';
import style from '../../styling/RegistrarAndAdmin/RegistrarLoginAndSignup.module.css'
import RegistrarLogin from './Login';
import RegistrarSignup from './RegistrarSignup';

const RegistrarLoginAndSignup = ({isTheBoxHidden, boxAnimationIn, boxContent, handleCloseBox}) => {
  return (
    <div className={`${style.loginAndSignupBox} ${boxAnimationIn ? style.boxPopIn : style.boxShrinkOut} ${isTheBoxHidden ? style.hidden : null} `}>
      {boxContent === 'login' ? <RegistrarLogin handleCloseBox={handleCloseBox} /> : null}
      {boxContent === 'signup' ? <RegistrarSignup handleCloseBox={handleCloseBox} /> : null}
      {boxContent === 'error' ? (<p>Please refresh the page</p>) : null}
    </div>
  )
}

export default RegistrarLoginAndSignup;