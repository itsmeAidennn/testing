import { React, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { IoIosClose } from "react-icons/io";
import style from '../../styling/RegistrarAndAdmin/RegistrarLoginAndSignup.module.css';

const LoginFirstContent = ({handleCloseBox}) => {

  const navigate = useNavigate();
  const initialForm = {
    uniqueID: '',
    password: ''
  }

  const [loginFormData, setLoginFormData] = useState(initialForm);

  const handleTextChangeLogin = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(loginFormData);
      const response = await fetch('/api/registrarLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginFormData),
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setLoginFormData(initialForm);
        handleCloseBox();
        navigate('/registrar-admin-dashboard');
      } else {
        alert('Login failed: ' + data.message);
        setLoginFormData(initialForm);
        handleCloseBox();
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setLoginFormData(initialForm);
      handleCloseBox();
    }
  };


  return(
    <>
      <div className={`${style.titleLoginAndSignup}`}> 
        <h1>Login</h1>
        <p>Please login to continue to your account.</p>
        <button className={`${style.closeButton}`} onClick={handleCloseBox}>
          <IoIosClose />
        </button>
      </div>
      <div className={`${style.form}`}>
        <input className={`${style.textFields}`} name='uniqueID' value={loginFormData.uniqueID} type="text" placeholder="ID:" onChange={handleTextChangeLogin} />
        <input className={`${style.textFields}`} name='password' value={loginFormData.password} type="password" placeholder="Password:" onChange={handleTextChangeLogin} />
        <button className={`${style.submitButton}`} onClick={handleSubmitLogin} >Login</button>
      </div>
    </>
  )
}

export default LoginFirstContent;