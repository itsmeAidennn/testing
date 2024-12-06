import React from 'react';
import { IoIosClose } from "react-icons/io";
import style from '../../../styling/LandingPage/HomeSection/LoginAndSignupBox.module.css';

const SecondSignupContent = ({toggleSignup, handleTextChangeSignup, formData, isEmailValid, isContactValid, isPasswordValid, backSignupContent, handleSubmitSignup}) => {
  return (
    <div className={style.titleLoginAndSignup}>
      <div > 
        <h1>Sign Up</h1>
        <p>Provide important details:</p>
        <button className={style.closeButton} onClick={toggleSignup}>
          <IoIosClose />
        </button>
      </div>
      <div className={style.form}>
        <input 
          className={style.textFields} 
          name="email" type="text" 
          placeholder="Email: (required)" 
          value={formData.email}
          onChange={handleTextChangeSignup} 
          style={{
            borderColor: isEmailValid ? "#ccc" : "red",
          }}
          required 
        />
        {!isEmailValid && (
          <p style={{ color: "red" }}>
            Invalid email format! Only letters, numbers, ., _, %, +, and - are allowed.
          </p>
        )}
        <input 
          className={style.textFields} 
          name="contactNo" 
          type="text" 
          placeholder="Contact No: (required)" 
          value={formData.contactNo}
          onChange={handleTextChangeSignup} 
          style={{
            borderColor: isContactValid ? "#ccc" : "red",
            // outline:(isFocused && !isContactValid) ?  "2px solid red" : "none"
          }}
          required 
        />
        {!isContactValid && (
          <p style={{ color: "red" }}>
            Start with 09 and leave no space!   Ex: 09669747891
          </p>
        )}
        <input
          className={style.textFields}  
          name="password" 
          type="password" 
          placeholder="Password: (required)" 
          value={formData.password}
          onChange={handleTextChangeSignup}
          style={{
            borderColor: isPasswordValid ? "#ccc" : "red",
            // outline:(isFocused && !isContactValid) ?  "2px solid red" : "none"
          }}
          required 
        /> 
        {!isPasswordValid && (
          <p style={{ color: "red" }}>
            Password should contain an uppercase, lowercase, and special characters that will be atleast 8-20 long.
          </p>
        )}
        <div className={style.twoButtonContainer}>
          <button className={style.submitButton} onClick={backSignupContent}>Back</button>
          <button className={style.submitButton} onClick={handleSubmitSignup}>Finish</button>
        </div>
      </div>
      <div className="options">
        {/* <div>
          <input type="checkbox" id="showPassword"/>
          <label for="showPassword">Show Password</label>
        </div> */}
      </div>
    </div>
  )
}

export default SecondSignupContent;