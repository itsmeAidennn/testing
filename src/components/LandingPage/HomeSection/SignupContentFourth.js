import { React, useState } from 'react';
import { IoIosClose } from "react-icons/io";
import style from '../../../styling/LandingPage/HomeSection/LoginAndSignupBox.module.css';
import Swal from 'sweetalert2';

const FourthSignupContent = ({toggleSignup, handleTextChangeSignup, formData, nextSignupContent, backSignupContent}) => {

  const [validationErrors, setValidationErrors] = useState({
    strand: false,
    courseFirstChoice: false,
    courseSecondChoice: false,
    courseThirdChoice: false,
  });

  const validateForm = () => {
    const { strand, courseFirstChoice, courseSecondChoice, courseThirdChoice } = formData;
    const errors = {
      strand: !strand,
      courseFirstChoice: !courseFirstChoice,
      courseSecondChoice: !courseSecondChoice,
      courseThirdChoice: !courseThirdChoice,
    };

    const courses = [courseFirstChoice, courseSecondChoice, courseThirdChoice];
    const uniqueCourses = new Set(courses.filter(Boolean));
    const allCoursesUnique = uniqueCourses.size === courses.length;

    setValidationErrors({
      ...errors,
      coursesUnique: !allCoursesUnique,
    });

    if (!strand || !courseFirstChoice || !courseSecondChoice || !courseThirdChoice || !allCoursesUnique) {
      // alert("Please select a strand and ensure each course is unique.");
      Swal.fire({
        title: "Warning",
        text: "Please select a strand and make sure each course is unique.",
        icon: "warning"
      });
      return false;
    }
    return true;
  };

  const handleNextClick = (e) => {
    if (validateForm()) {
      nextSignupContent(e);
    }
  };

  const coursesForSTEM = (
    <>
      <option value="">Select your course</option>
      <option value="Bachelor of Science in Nursing">Bachelor of Science in Nursing</option>
      <option value="Bachelor of Science in Physical Therapy">Bachelor of Science in Physical Therapy</option>
      <option value="Bachelor of Science in Phsychology">Bachelor of Science in Phsychology</option>
      <option value="Bachelor of Science in Social Work">Bachelor of Science in Social Work</option>
      <option value="Bachelor of Science in Information System with specialization in Cybersecurity">Bachelor of Science in Information System with specialization in Cybersecurity</option>
      <option value="Bachelor of Science in Information System with specialization in Data Science">Bachelor of Science in Information System with specialization in Data Science</option>
      <option value="Bachelor of Science in Information Technology">Bachelor of Science in Information Technology</option>
    </>
  )

  const coursesForHUMMSandGAS = (
    <>
      <option value="">Select your course</option>
      <option value="Bachelor of Science in Phsychology">Bachelor of Science in Phsychology</option>
      <option value="Bachelor of Science in Social Work">Bachelor of Science in Social Work</option>
      <option value="Bachelor of Science in Criminology">Bachelor of Science in Criminology</option>
      <option value="Bachelor of Secondary Education Education major in English">Bachelor of Secondary Education Education major in English</option>
      <option value="Bachelor of Secondary Education major in Mathematics">Bachelor of Secondary Education major in Mathematics</option>
      <option value="Bachelor of Secondary Education major in General Science">Bachelor of Secondary Education major in General Science</option>
      <option value="Bachelor of Secondary Education major in Social Science">Bachelor of Secondary Education major in Social Science</option>
      <option value="Bachelor of Physical Education">Bachelor of Physical Education</option>
      <option value="Bachelor of Arts in Communication">Bachelor of Arts in Communication</option>
      <option value="Bachelor of Arts in Political Science">Bachelor of Arts in Political Science</option>
      <option value="Bachelor of Public Administration">Bachelor of Public Administration</option>
    </>
  )

  const coursesForICT = (
    <>
      <option value="">Select your course</option>
      <option value="Bachelor of Science in Information System with specialization in Cybersecurity">Bachelor of Science in Information System with specialization in Cybersecurity</option>
      <option value="Bachelor of Science in Information System with specialization in Data Science">Bachelor of Science in Information System with specialization in Data Science</option>
      <option value="Bachelor of Science in Information Technology">Bachelor of Science in Information Technology</option>
    </>
  )

  const coursesForABM = (
    <>
      <option value="">Select your course</option>
      <option value="Bachelor of Science in Business Administration major in Marketing Management">Bachelor of Science in Business Administration major in Marketing Management</option>
      <option value="Bachelor of Science in Business Administration major in Human Resources Management">Bachelor of Science in Business Administration major in Human Resources Management</option>
      <option value="Bachelor of Science in Business Administration major in Economics">Bachelor of Science in Business Administration major in Economics</option>
      <option value="Bachelor of Science in Entrepreneurship">Bachelor of Science in Entrepreneurship</option>
      <option value="BS Hospitality Management">BS Hospitality Management</option>
      <option value="BSHM with specialization in Travel Operations">BSHM with specialization in Travel Operations</option>
      <option value="BSHM with specialization in Recreation and Leisure">BSHM with specialization in Recreation and Leisure</option>
      <option value="BSHM with specialization in Heritage and Culture">BSHM with specialization in Heritage and Culture</option>
    </>
  )

  const coursesForHE = (
    <>
      <option value="">Select your course</option>
      <option value="BS Hospitality Management">BS Hospitality Management</option>
      <option value="BSHM with specialization in Travel Operations">BSHM with specialization in Travel Operations</option>
      <option value="BSHM with specialization in Recreation and Leisure">BSHM with specialization in Recreation and Leisure</option>
      <option value="BSHM with specialization in Heritage and Culture">BSHM with specialization in Heritage and Culture</option>
    </>
  )

  return (
    <>
      <div className={`${style.titleLoginAndSignup}`}> 
        <h1>Sign Up</h1>
        <p>Enter the strand you took and your optional courses:</p>
        <button className={`${style.closeButton}`} onClick={toggleSignup}>
          <IoIosClose />
        </button>
      </div>
      <div className={`${style.form}`}>
  
      <select
          className={`${style.textFields} ${validationErrors.strand ? style.errorField : ''}`}
          name="strand"
          value={formData.strand}
          onChange={handleTextChangeSignup}
          required
        >
          <option value="">Select the strand you took</option>
          <option value="STEM">Science Technology Engineereing and Mathematics (STEM)</option>
          <option value="HUMMS">Humanities and Social Science (HUMMS)</option>
          <option value="GAS">General Academic Strand (GAS)</option>
          <option value="ICT">Information and Communication Technology (ICT)</option>
          <option value="ABM">Accountant and Business Management (ABM)</option>
          <option value="HE">Home Economics (HE)</option>
        </select>

        <select
          className={`${style.textFields} ${validationErrors.courseFirstChoice ? style.errorField : ''}`}
          name="courseFirstChoice"
          value={formData.courseFirstChoice}
          onChange={handleTextChangeSignup}
          required
        >
          {formData.strand === '' ? (<option value="">Select a strand first</option>) : null}
          {formData.strand === 'STEM' ? coursesForSTEM : null}
          {formData.strand === 'HUMMS' ? coursesForHUMMSandGAS : null}
          {formData.strand === 'GAS' ? coursesForHUMMSandGAS : null}
          {formData.strand === 'ICT' ? coursesForICT : null}
          {formData.strand === 'ABM' ? coursesForABM : null}
          {formData.strand === 'HE' ? coursesForHE : null}
        </select>

        <select
          className={`${style.textFields} ${validationErrors.courseSecondChoice ? style.errorField : ''}`}
          name="courseSecondChoice"
          value={formData.courseSecondChoice}
          onChange={handleTextChangeSignup}
          required
        >
          {formData.strand === '' ? (<option value="">Select a strand first</option>) : null}
          {formData.strand === 'STEM' ? coursesForSTEM : null}
          {formData.strand === 'HUMMS' ? coursesForHUMMSandGAS : null}
          {formData.strand === 'GAS' ? coursesForHUMMSandGAS : null}
          {formData.strand === 'ICT' ? coursesForICT : null}
          {formData.strand === 'ABM' ? coursesForABM : null}
          {formData.strand === 'HE' ? coursesForHE : null}
        </select>

        <select
          className={`${style.textFields} ${validationErrors.courseThirdChoice ? style.errorField : ''}`}
          name="courseThirdChoice"
          value={formData.courseThirdChoice}
          onChange={handleTextChangeSignup}
          required
        >
          {formData.strand === '' ? (<option value="">Select a strand first</option>) : null}
          {formData.strand === 'STEM' ? coursesForSTEM : null}
          {formData.strand === 'HUMMS' ? coursesForHUMMSandGAS : null}
          {formData.strand === 'GAS' ? coursesForHUMMSandGAS : null}
          {formData.strand === 'ICT' ? coursesForICT : null}
          {formData.strand === 'ABM' ? coursesForABM : null}
          {formData.strand === 'HE' ? coursesForHE : null}
        </select>

        <div className={style.twoButtonContainer}>
          <button className={style.submitButton} onClick={backSignupContent}>Back</button>
          <button className={style.submitButton} onClick={handleNextClick}>Next</button>
        </div>

      </div>
    </>
  )
}

export default FourthSignupContent;