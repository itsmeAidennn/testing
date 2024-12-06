import style from '../../../styling/LandingPage/HomeSection/LoginButton.module.css';

const LoginButton = ({toggleLogin, isLoginDisabled}) => {
  return (
    <button id={`${style.loginButton}`} onClick={toggleLogin} disabled={isLoginDisabled}>LOGIN</button>
  )
}

export default LoginButton;