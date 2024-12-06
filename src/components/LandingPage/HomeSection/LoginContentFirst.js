import React from 'react';
import { IoIosClose } from "react-icons/io";
import style from '../../../styling/LandingPage/HomeSection/LoginAndSignupBox.module.css';

const LoginFirstContent = ({toggleLogin, handleTextChangeLogin, handleSubmitLogin}) => {
  return(
    <>
      <div className={`${style.titleLoginAndSignup}`}> 
        <h1>Login</h1>
        <p>Please login to continue to your account.</p>
        <button className={`${style.closeButton}`} onClick={toggleLogin}>
          <IoIosClose />
        </button>
      </div>
    <div className={`${style.form}`}>
      <input className={`${style.textFields}`} name='email' type="text" placeholder="Email:" onChange={handleTextChangeLogin} />
      <input className={`${style.textFields}`}name='password' type="password" placeholder="Password:" onChange={handleTextChangeLogin} />
      <button className={`${style.submitButton}`} onClick={handleSubmitLogin}>Login</button>
    </div>
    {/* <div className="options">
      <div>
        <input type="checkbox" id="showPassword"/>
        <label for="showPassword">Show Password</label>
      </div>
      <a href="#"className="">Forgot Password?</a>
    </div> */}
  </>
  )
}

export default LoginFirstContent;