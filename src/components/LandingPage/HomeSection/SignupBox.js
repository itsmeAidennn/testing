import { useState } from 'react';
import style from '../../../styling/LandingPage/HomeSection/LoginAndSignupBox.module.css'
import SignupContentFirst from './SignupContentFirst';
import SignupContentSecond from './SignupContentSecond';
import SignupContentThird from './SignupContentThird';
import SignupContentFourth from './SignupContentFourth';
import Swal from 'sweetalert2';

const LoginBox = ({signupPressed, isSignupHidden, toggleSignup, setSignupPressed}) => {
  const initialFormData = {
    firstName: '',
    middleName: '',
    lastName: '',
    nameSuffix: '',
    address: '',
    gender: '',
    strand: '',
    courseFirstChoice: '',
    courseSecondChoice: '',
    courseThirdChoice: '',
    district: '',
    schoolType: '',
    contactNo: '',
    email: '',
    password: '',
    documents: {
      pictures: null
    }
  }
  const [formData, setFormData] = useState(initialFormData);
  const [signupContentSlide, setSignupContentSlide] = useState(0);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isContactValid, setIsContactValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const validateContactNoPh = (contactNo) => {
    const contactNoRegex  = /^09[0-9]{9}$/;
    return contactNoRegex.test(contactNo);
  }
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
    return passwordRegex.test(password)
  }
  const handleTextChangeSignup = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "email") {
      setIsEmailValid(validateEmail(e.target.value));
    }
    if (e.target.name === "contactNo") {
      setIsContactValid(validateContactNoPh(e.target.value));
    }
    if (e.target.name === "password") {
      setIsPasswordValid(validatePassword(e.target.value));
    }
  };
  const handleFileUploadChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/jpeg") {
      const updatedFormData = new FormData();
      updatedFormData.append(e.target.name, file);
  
      setFormData({
        ...formData,
        documents: {
          ...formData.documents,
          [e.target.name]: file,
        },
      });
    } else {
      alert("Please select a valid JPEG file.");
    }
  };
  
  
  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    e.target.innerText = "...";
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "documents") {
        Object.entries(formData.documents).forEach(([docKey, file]) => {
          if (file) formDataToSend.append(docKey, file);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

  try {
    const response = await fetch('/api/requestEmailVerification', {
      method: 'POST',
      body: formDataToSend, 
    });
      const data = await response.json();
      if (response.ok) {
        // alert("We just an email to the one you provided!. Please click the button there to verify your email.");
        Swal.fire({
          title: "Sign-up Success!",
          text: "We just send an email to the one you provided. Please click the button there to verify your email.",
          icon: "success"
        });
        setFormData(initialFormData);
        toggleSignup();
        setSignupContentSlide(0);
        e.target.disabled = false;
        e.target.innerText = "Finish";
      } else {
        // alert('Signup failed: ' + data.message);
        Swal.fire({
          title: "Sign-up failed",
          text: "Please ensure all required fields are completed correctly.",
          icon: "warning"
        });
        e.target.disabled = false;
        e.target.innerText = "Finish";
      }
    } catch (error) {
      // console.error('Error during signup:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      e.target.disabled = false;
      e.target.innerText = "Finish";
    }
  };
  const nextSignupContent = (e) => {
    e.target.disabled = true;
    setSignupPressed(false);
    setTimeout(() =>{
      setSignupContentSlide(signupContentSlide + 1);
      setSignupPressed(true);
      e.target.disabled = false;
    }, 500)
  }
  const backSignupContent = (e) => {
    e.target.disabled = true;
    setSignupPressed(false);
    setTimeout(() =>{
      setSignupContentSlide(signupContentSlide - 1);
      setSignupPressed(true);
      e.target.disabled = false;
    }, 500)
  }

  return (
    <div className={`${style.loginAndSignupBox} ${signupPressed ? style.slideUpInLogin : style.slideDownOutLogin} ${(isSignupHidden ? style.hide : "")}`}>
      {signupContentSlide === 0 && <SignupContentFirst toggleSignup={toggleSignup} handleTextChangeSignup={handleTextChangeSignup} nextSignupContent={nextSignupContent} formData={formData} />}
      {signupContentSlide === 1 && <SignupContentFourth toggleSignup={toggleSignup} handleTextChangeSignup={handleTextChangeSignup} formData={formData} nextSignupContent={nextSignupContent} backSignupContent={backSignupContent} />}
      {signupContentSlide === 2 && <SignupContentThird toggleSignup={toggleSignup} handleTextChangeSignup={handleTextChangeSignup} handleFileUploadChange={handleFileUploadChange} formData={formData} nextSignupContent={nextSignupContent} backSignupContent={backSignupContent} />}
      {signupContentSlide === 3 && <SignupContentSecond toggleSignup={toggleSignup} handleTextChangeSignup={handleTextChangeSignup} formData={formData} isEmailValid={isEmailValid} isContactValid={isContactValid} isPasswordValid={isPasswordValid} backSignupContent={backSignupContent} handleSubmitSignup={handleSubmitSignup} />}
      {/* {signupContentSlide === 3 && <SignupContentThird toggleSignup={toggleSignup} handleSubmitSignup={handleSubmitSignup} handleFileUploadChange={handleFileUploadChange} backSignupContent={backSignupContent} />} */}
    </div>
  )
}

export default LoginBox;