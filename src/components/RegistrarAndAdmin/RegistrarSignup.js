import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import style from "../../styling/RegistrarAndAdmin/RegistrarLoginAndSignup.module.css";

const SignupContent = ({ handleCloseBox }) => {
  const initialForm = {
    firstName: "",
    middleName: "",
    surname: "",
    age: "",
    address: "",
    email: "",
    password: "",
  }
  const [formData, setFormData] = useState(initialForm);
  const [profilePic, setProfilePic] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
    return passwordRegex.test(password)
  }

  const validateForm = () => {
    const { firstName, surname, age, address } = formData;

    if (!firstName || !surname || !age || !address) {
      alert("Please fill in all required fields!");
      return false;
    }
    if (!profilePic) {
      alert("Please upload a profile picture!");
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "email") {
      setIsEmailValid(validateEmail(e.target.value));
    }
    if (e.target.name === "password") {
      setIsPasswordValid(validatePassword(e.target.value));
    }
  };  

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("middleName", formData.middleName);
    formDataToSend.append("surname", formData.surname);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("profilePic", profilePic);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);

    try {
      const response = await fetch("/api/RegistrarSignup", {
        method: "PUT",
        body: formDataToSend,
      });
      const data = await response.json()
      if (response.ok) {
        alert(`Signup successful! 
          Please wait for the admin to verify your account.`);
        setFormData(initialForm);
        setProfilePic(null);
        handleCloseBox();
      } else {
        alert(data.message);
        // alert("Something went wrong, please try again.");
        setFormData(initialForm);
        setProfilePic(null);
        handleCloseBox();
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Error: Could not complete signup.");
      setFormData(initialForm);
      setProfilePic(null);
      handleCloseBox();
    }
  };

  return (
    <>
      <div className={`${style.titleLoginAndSignup}`}>
        <h1>Sign Up</h1>
        <p>Enter your information below:</p>
        <button className={`${style.closeButton}`} onClick={handleCloseBox}>
          <IoIosClose />
        </button>
      </div>
      <div className={`${style.form}`}>
        <input
          className={`${style.textFields}`}
          name="firstName"
          type="text"
          placeholder="First Name (required)"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <input
          className={`${style.textFields}`}
          name="middleName"
          type="text"
          placeholder="Middle Name"
          value={formData.middleName}
          onChange={handleInputChange}
        />
        <input
          className={`${style.textFields}`}
          name="surname"
          type="text"
          placeholder="Surname (required)"
          value={formData.surname}
          onChange={handleInputChange}
          required
        />
        <input
          className={`${style.textFields}`}
          name="age"
          type="number"
          placeholder="Age (required)"
          value={formData.age}
          onChange={handleInputChange}
          required
        />
        <input 
          className={style.textFields} 
          name="email" type="text" 
          placeholder="Email: (required)" 
          value={formData.email}
          onChange={handleInputChange} 
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
          className={`${style.textFields}`}
          name="address"
          type="text"
          placeholder="Address (required)"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
        <input
          className={style.textFields}  
          name="password" 
          type="password" 
          placeholder="Password: (required)" 
          value={formData.password}
          onChange={handleInputChange}
          style={{
            borderColor: isPasswordValid ? "#ccc" : "red",
          }}
          required 
        /> 
        {!isPasswordValid && (
          <p style={{ color: "red" }}>
            Password should contain an uppercase, lowercase, and special characters that will be atleast 8-20 long.
          </p>
        )}
        <input
          // className={`${style.textFields}`}
          type="file"
          accept="image/png"
          onChange={handleFileChange}
          required
        />
        <button className={`${style.submitButton}`} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default SignupContent;
