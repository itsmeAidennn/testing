import style from '../../../styling/LandingPage/HomeSection/SignupButton.module.css'

const SignupButton = ({toggleSignup, isSignupDisabled}) => {
  return(
    <button id={`${style.signupButton}`} onClick={toggleSignup} disabled={isSignupDisabled}>SIGN UP</button>
  )
}

export default SignupButton;