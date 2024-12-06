import React from 'react';
import { IoIosClose } from "react-icons/io";
import style from '../../../styling/LandingPage/HomeSection/LoginAndSignupBox.module.css';
import Swal from 'sweetalert2';

const FirstSignupContent = ({toggleSignup, handleTextChangeSignup, formData, nextSignupContent}) => {
  
  const validateForm = () => {
    const { firstName, middleName, lastName, address, gender } = formData;

    if (!firstName || !lastName || !address || !gender) {
      // alert("Please fill in all required fields!");
      Swal.fire({
        title: "Some fields are missing.",
        text: "Please complete the form before proceeding.",
        icon: "warning"
      });
      return false;
    }
    return true;
  }

  const handleNextClick = (e) => {
    if (validateForm()) {
      nextSignupContent(e); 
    }
  }

  return (
    <>
      <div className={`${style.titleLoginAndSignup}`}> 
        <h1>Sign Up</h1>
        <p>Enter your information below:</p>
        <button className={`${style.closeButton}`} onClick={toggleSignup}>
          <IoIosClose />
        </button>
      </div>
      <div className={`${style.form}`}>
        <input className={`${style.textFields}`} name="firstName" type="text" placeholder="First Name: (required)" value={formData.firstName} onChange={handleTextChangeSignup} required /> 
        <input className={`${style.textFields}`} name="middleName" type="text" placeholder="Middle Name: " value={formData.middleName} onChange={handleTextChangeSignup} /> 
        <input className={`${style.textFields}`} name="lastName" type="text" placeholder="Last Name: (required)" value={formData.lastName} onChange={handleTextChangeSignup} required/> 
        <input className={`${style.textFields}`}name="nameSuffix" type="text" placeholder="Name Suffix:" value={formData.nameSuffix} onChange={handleTextChangeSignup} /> 
        <input className={`${style.textFields}`} name="address" type="text" placeholder="Address: (required)" value={formData.address} onChange={handleTextChangeSignup} required/> 
        {/* <input className="textFields" name="gender" type="text" placeholder="Gender: (required)" onChange={handleTextChangeSignup} required />  */}
        <select className={`${style.textFields}`} name="gender" value={formData.gender} onChange={handleTextChangeSignup} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button className={`${style.submitButton}`} onClick={handleNextClick}>Next</button>

      </div>
      <div className={`${style.options}`}>
        {/* <div>
          <input type="checkbox" id="showPassword"/>
          <label for="showPassword">Show Password</label>
        </div> */}
      </div>
    </>
  )
}

export default FirstSignupContent;