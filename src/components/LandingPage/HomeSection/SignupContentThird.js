import React from 'react';
import { IoIosClose } from "react-icons/io";
import style from '../../../styling/LandingPage/HomeSection/LoginAndSignupBox.module.css';

const ThirdSignupContent = ({toggleSignup, handleFileUploadChange, backSignupContent, formData, nextSignupContent, handleTextChangeSignup}) => {
  const handleNextClick = (e) => {
    const validDistricts = [
      "District 1",
      "District 2",
      "District 3",
      "District 4",
      "District 5",
      "District 6",
    ];
    const validSchoolTypes = ["Public", "Private"];

    if (!validDistricts.includes(formData.district)) {
      alert("Please select a valid district.");
      return;
    }

    if (!validSchoolTypes.includes(formData.schoolType)) {
      alert("Please select a valid school type.");
      return;
    }

    if (!formData.documents.pictures) {
      alert("Please upload a profile picture.");
      return;
    }

    nextSignupContent(e);
  };
  return (
    <>
      <div className={`${style.titleLoginAndSignup}`}> 
        <h1>Sign Up</h1>
        <p>Additional Information:</p>
        <button className={`${style.closeButton}`} onClick={toggleSignup}>
          <IoIosClose />
        </button>
      </div>
      <div className={`${style.form}`}>
        <p>Under what district do you currently reside?</p>
        <select className={`${style.textFields}`} name="district" value={formData.district} onChange={handleTextChangeSignup} required>
          <option value="">Select a district</option>
          <option value="District 1">District 1</option>
          <option value="District 2">District 2</option>
          <option value="District 3">District 3</option>
          <option value="District 4">District 4</option>
          <option value="District 5">District 5</option>
          <option value="District 6">District 6</option>
        </select>
        <p>What was the last school you attended?</p>
        <select className={`${style.textFields}`} name="schoolType" value={formData.schoolType} onChange={handleTextChangeSignup} required>
          <option value="">Select a type</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
        <p>Upload a Profile picture (required):</p>
        <input type='file' accept='.jpg,.jpeg' name="pictures" onChange={handleFileUploadChange} />
      </div>
      <div className={style.twoButtonContainer}>
          <button className={style.submitButton} onClick={backSignupContent}>Back</button>
          <button className={style.submitButton} onClick={handleNextClick}>Next</button>
        </div>
      <div className="options">
        {/* <div>
          <input type="checkbox" id="showPassword"/>
          <label for="showPassword">Show Password</label>
        </div> */}
      </div>
    </>
  )
}

export default ThirdSignupContent;
