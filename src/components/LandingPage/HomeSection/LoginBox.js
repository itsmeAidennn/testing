import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import style from '../../../styling/LandingPage/HomeSection/LoginAndSignupBox.module.css';
import LoginFirstContent from './LoginContentFirst';
import Swal from 'sweetalert2';

const LoginBox = ({loginPressed, isLoginHidden, toggleLogin}) => {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  
  // const [isFocused, setIsFocused] = useState(false);
  // const [isEmailValid, setIsEmailValid] = useState(true);
  // const [isPasswordValid, setIsPasswordValid] = useState(true);
  // const handleFocus = () => {
  //   setIsFocused(!isFocused);
  // }
  // const validateEmail = (email) => {
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   return emailRegex.test(email);
  // };
  // const validatePassword = (password) => {
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
  //   return passwordRegex.test(password)
  // }
  const handleTextChangeLogin = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
    // if (e.target.name === "email") {
    //   setIsEmailValid(validateEmail(e.target.value));
    // }
    // if (e.target.name === "password") {
    //   setIsPasswordValid(validatePassword(e.target.value));
    // }
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/landingPageLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginFormData),
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        navigate('/Dashboard');
      } else {
        // alert('Login failed: ' + data.message);
        Swal.fire({
          icon: "warning",
          title: "Log-in failed",
          text: "Incorrect username or password. Please try again.",
        });
      }
    } catch (error) {
      // console.error('Error during signup:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  return (
    <div className={`${style.loginAndSignupBox} ${loginPressed ? style.slideUpInLogin : style.slideDownOutLogin} ${isLoginHidden ? style.hide : ''}`}>
      <LoginFirstContent toggleLogin={toggleLogin} handleTextChangeLogin={handleTextChangeLogin} handleSubmitLogin={handleSubmitLogin} />
    </div>
  )
}

export default LoginBox;