import style from '../../styling/ApplicantDashboard/ADEditInformation.module.css';
import { React, useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import LoadingSpinner from '../LoadingSpinner';
import Swal from 'sweetalert2';

const ADEditInformation = ({userData, setChange}) => {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isContactValid, setIsContactValid] = useState(true);
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

  const [loadingButtons, setLoadingButtons] = useState(['']);

  const [isFirstNameEditing, setIsFirstNameEditing] = useState(false);
  const [tempTextFirstName, setTempTextFirstName] = useState();

  const [isMiddleNameEditing, setIsMiddleNameEditing] = useState(false);
  const [tempTextMiddleName, setTempTextMiddleName] = useState();

  const [isLastNameEditing, setIsLastNameEditing] = useState(false);
  const [tempTextLastName, setTempTextLastName] = useState();

  const [isNameSuffixEditing, setIsNameSuffixEditing] = useState(false);
  const [tempTextNameSuffix, setTempTextNameSuffix] = useState();

  const [isAddressEditing, setIsAddressEditing] = useState(false);
  const [tempTextAddress, setTempTextAddress] = useState();

  const [isGenderEditing, setIsGenderEditing] = useState(false);
  const [tempTextGender, setTempTextGender] = useState();

  const [isContactNoEditing, setIsContactNoEditing] = useState(false);
  const [tempTextContactNo, setTempTextContactNo] = useState();

  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [tempTextEmail, setTempTextEmail] = useState();

  const handleChangeWithValidation = (e) => {
    if (e.target.name === "email") {
      setTempTextEmail(e.target.value);
      setIsEmailValid(validateEmail(e.target.value));
    }
    if (e.target.name === "contactNo") {
      setTempTextContactNo(e.target.value);
      setIsContactValid(validateContactNoPh(e.target.value));
    }
  }

  const handleEditInfoButton = (info) => {
    switch(info){
      case "firstName":
        setTempTextFirstName(userData.firstName);
        setIsFirstNameEditing(true);
        break
      case "middleName":
        setTempTextMiddleName(userData.middleName);
        setIsMiddleNameEditing(true);
        break
      case "lastName":
        setTempTextLastName(userData.lastName);
        setIsLastNameEditing(true);
        break
      case "nameSuffix":
        setTempTextNameSuffix(userData.nameSuffix);
        setIsNameSuffixEditing(true);
        break
      case "address":
        setTempTextAddress(userData.address);
        setIsAddressEditing(true);
        break
      case "gender":
        setTempTextGender(userData.gender);
        setIsGenderEditing(true);
        break
      case "contactNo":
        setTempTextContactNo(userData.contactNo);
        setIsContactNoEditing(true);
        break
      case "email":
        setTempTextEmail(userData.email);
        setIsEmailEditing(true);
        break
    }
  }
  
  const handleCancelEdit = (info) => {
    if (info === "firstName" && isFirstNameEditing === true) {
      setIsFirstNameEditing(false);
    }
    switch(info){
      case "firstName":
        setIsFirstNameEditing(false);
        break
      case "middleName":
        setIsMiddleNameEditing(false);
        break
      case "lastName":
        setIsLastNameEditing(false);
        break
      case "nameSuffix":
        setIsNameSuffixEditing(false);
        break
      case "address":
        setIsAddressEditing(false);
        break
      case "gender":
        setIsGenderEditing(false);
        break
      case "contactNo":
        setIsContactNoEditing(false);
        break
      case "email":
        setIsEmailEditing(false);
        break
    }
  }

  const handleSaveInfo = async (info) => {
    setLoadingButtons((prev) => [...prev, info]);
    const infoMapping = {
      firstName: { tempValue: tempTextFirstName, setEditing: setIsFirstNameEditing },
      middleName: { tempValue: tempTextMiddleName, setEditing: setIsMiddleNameEditing },
      lastName: { tempValue: tempTextLastName, setEditing: setIsLastNameEditing },
      nameSuffix: { tempValue: tempTextNameSuffix, setEditing: setIsNameSuffixEditing },
      address: { tempValue: tempTextAddress, setEditing: setIsAddressEditing },
      gender: { tempValue: tempTextGender, setEditing: setIsGenderEditing },
      contactNo: { tempValue: tempTextContactNo, setEditing: setIsContactNoEditing },
      email: { tempValue: tempTextEmail, setEditing: setIsEmailEditing },
    };
    const { tempValue: newInfo, setEditing } = infoMapping[info] || {};
    // if (!newInfo || !setEditing) {
    //   alert("Invalid info type");
    //   setChange((prevChange) => !prevChange);
    //   setEditing(false); 
    //   setLoadingButtons((prev) => prev.filter((item) => item !== info));
    //   return;
    // }
    try {
      const response = await fetch('/api/saveNewInfo', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          infoToUpdate: info,
          newInfo
        })
      });
  
      if (response.ok) {
        setChange((prevChange) => !prevChange);
        // alert("Successfully updated your information.");
        Swal.fire({
          icon: "success",
          title: "Update completed!",
          text: "Your changes have been saved.",
        });
        setEditing(false); 
      } else {
        // alert("Failed to update your information, please leave feedback about this.");
        Swal.fire({
          icon: "warning",
          title: "Update failed!",
          text: "Failed to update your information, please leave feedback about this.",
        });
      }
    } catch (e) {
      console.log(e);
      // alert("Something went wrong with sending your new information to the server.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong with sending your new information to the server.",
      });
    } finally {
      setLoadingButtons((prev) => prev.filter((item) => item !== info));
    }
  };
  

  return (
    <>
      <div className={`${style.upperContainer}`}>
        <table>
          <tbody>
            <tr>
              <td>
                <div className={style.editInfo}>
                  <p>First Name: </p>
                    { isFirstNameEditing ? 
                      <div>
                        <input className={`${style.inputBar}`} type="text" value={tempTextFirstName} onChange={(e)=>setTempTextFirstName(e.target.value)} autoFocus />
                        <button className={`${style.saveButton}`} onClick={() => handleSaveInfo("firstName")} disabled={loadingButtons.includes("firstName")}>{loadingButtons.includes("firstName") ? "..." : "Save"}</button>
                        <button className={`${style.cancelButton}`} onClick={() => handleCancelEdit('firstName')}>Cancel</button>
                      </div>
                      :
                      <div>
                        <span>{userData ?  `${userData.firstName}` : `Loading...`} </span>
                        <button onClick={() => handleEditInfoButton("firstName")}><FaEdit /></button>
                      </div>
                    }
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className={style.editInfo}>
                  <p>Middle Name: </p>
                  { isMiddleNameEditing ? 
                    <div>
                      <input className={`${style.inputBar}`} type="text" value={tempTextMiddleName} onChange={(e)=>setTempTextMiddleName(e.target.value)} autoFocus />
                      <button className={`${style.saveButton}`} onClick={() => handleSaveInfo("middleName")} disabled={loadingButtons.includes("middleName")}>{loadingButtons.includes("middleName") ? "..." : "Save"}</button>
                      <button className={`${style.cancelButton}`} onClick={() => handleCancelEdit('middleName')}>Cancel</button>
                    </div>
                    :
                    <>
                      <span className={`${style.userInfo}`}>{userData ?  `${userData.middleName}` : `Loading...`} </span>
                      <button onClick={() => handleEditInfoButton("middleName")}><FaEdit /></button>
                    </>
                  }
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className={style.editInfo}>
                  <p>Last Name: </p>
                  { isLastNameEditing ? 
                    <div>
                      <input className={`${style.inputBar}`} type="text" value={tempTextLastName} onChange={(e)=>setTempTextLastName(e.target.value)} autoFocus />
                      <button className={`${style.saveButton}`} onClick={() => handleSaveInfo("lastName")} disabled={loadingButtons.includes("lastName")}>{loadingButtons.includes("lastName") ? "..." : "Save"}</button>
                      <button className={`${style.cancelButton}`} onClick={() => handleCancelEdit('lastName')}>Cancel</button>
                    </div>
                    :
                    <div>
                      <span>{userData ?  `${userData.lastName}` : `Loading...`} </span>
                      <button onClick={() => handleEditInfoButton("lastName")}><FaEdit /></button>
                    </div>
                  }
                </div>
              </td>
              </tr>
              <tr>
              <td>
                <div className={style.editInfo}>
                  <p>Name Suffix: </p>
                  { isNameSuffixEditing ? 
                    <div>
                      <input className={`${style.inputBar}`} type="text" value={tempTextNameSuffix} onChange={(e)=>setTempTextNameSuffix(e.target.value)} autoFocus />
                      <button className={`${style.saveButton}`} onClick={() => handleSaveInfo("nameSuffix")} disabled={loadingButtons.includes("nameSuffix")}>{loadingButtons.includes("nameSuffix") ? "..." : "Save"}</button>
                      <button className={`${style.cancelButton}`} onClick={() => handleCancelEdit('nameSuffix')}>Cancel</button>
                    </div>
                    :
                    <div>
                      <span>{userData ?  `${userData.nameSuffix}` : `Loading...`} </span>
                      <button onClick={() => handleEditInfoButton("nameSuffix")}><FaEdit /></button>
                    </div>
                  }
                </div>
              </td>
              </tr>
              <tr>
              <td>
                <div className={style.editInfo}>
                  <p>Address: </p>
                  { isAddressEditing ? 
                    <div>
                      <input className={`${style.inputBar}`} type="text" value={tempTextAddress} onChange={(e)=>setTempTextAddress(e.target.value)} autoFocus />
                      <button className={`${style.saveButton}`} onClick={() => handleSaveInfo("address")} disabled={loadingButtons.includes("address")}>{loadingButtons.includes("address") ? "..." : "Save"}</button>
                      <button className={`${style.cancelButton}`} onClick={() => handleCancelEdit('address')}>Cancel</button>
                    </div>
                    :
                    <div>
                      <span>{userData ?  `${userData.address}` : `Loading...`} </span>
                      <button onClick={() => handleEditInfoButton("address")}><FaEdit /></button>
                    </div>
                  }
                </div>
              </td>
              </tr>
              <tr>
              <td>
                <div className={style.editInfo}>
                  <p>Gender: </p>
                  { isGenderEditing ? 
                    <div className={style.edit}>
                      <select onChange={(e) => setTempTextGender(e.target.value)} defaultValue={tempTextGender} autoFocus>
                        <option onChange={(e) => setTempTextGender(e.target.value)} value="Male">Male</option>
                        <option onChange={(e) => setTempTextGender(e.target.value)} value="Female">Female</option>
                      </select>
                      <button className={`${style.saveButton}`} onClick={() => handleSaveInfo("gender")}>Save</button>
                      <button className={`${style.cancelButton}`}  onClick={() => handleCancelEdit('gender')}>Cancel</button>
                    </div>
                    :
                    <div>
                      <span>{userData ?  `${userData.gender}` : `Loading...`} </span>
                      <button onClick={() => handleEditInfoButton("gender")}><FaEdit /></button>
                    </div>
                  }
                </div>
              </td>
              </tr>
              <tr>
              <td>
                <div className={style.editInfo}>
                  <p>Contact Number:</p>
                  { isContactNoEditing ? 
                    <div>
                      <input type="text" name="contactNo" value={tempTextContactNo} onChange={handleChangeWithValidation}  style={{borderColor: isContactValid ? "#ccc" : "red",}} autoFocus />
                      <button className={`${style.saveButton}`} onClick={() => handleSaveInfo("contactNo")} disabled={!isContactValid}>{isContactValid ? "Save" : "..."}</button>
                      <button className={`${style.cancelButton}`} onClick={() => handleCancelEdit('contactNo')}>Cancel</button>
                      {!isContactValid && (
                        <p style={{ color: "red" }}>
                          Start with 09 and leave no space!   Ex: 09669747891
                        </p>
                      )}
                    </div>
                    :
                    <div>
                      <span>{userData ?  `${userData.contactNo}` : `Loading...`} </span>
                      <button onClick={() => handleEditInfoButton("contactNo")}><FaEdit /></button>
                    </div>
                  }
                </div>
              </td>
              </tr>
              <tr>
              <td>
                <div className={style.editInfo}>
                  <p>Email: </p>
                  { isEmailEditing ? 
                    <div>
                      <input type="text" name='email' value={tempTextEmail} onChange={handleChangeWithValidation} style={{borderColor: isEmailValid ? "#ccc" : "red",}} autoFocus />
                      <button className={`${style.saveButton}`} onClick={() => handleSaveInfo("email")} disabled={!isEmailValid}>{isEmailValid ? "Save" : "..."}</button>
                      <button className={`${style.cancelButton}`} onClick={() => handleCancelEdit('email')}>Cancel</button>
                      {!isEmailValid && (
                        <p style={{ color: "red" }}>
                          Invalid email format! Only letters, numbers, ., _, %, +, and - are allowed.
                        </p>
                      )}
                    </div>
                    :
                    <div>
                      <span>{userData ?  `${userData.email}` : `Loading...`} </span>
                      <button onClick={() => handleEditInfoButton("email")}><FaEdit /></button>
                    </div>
                  }
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      

          

          
          
          

          

          

          

          


        {/* <div className={`${style.firstRow}`}>
          
          
        </div>
        <div className={`${style.secondRow}`}>
          
          
        </div>
        <div className={`${style.bottomRow}`}>
          
        </div>
      </div>
      <div className={`${style.lowerContainer}`}>
        <div className={`${style.firstRow}`}>
          
          
        </div>
        <div className={`${style.bottomRow}`}>
          
        </div> */}
      </div>
    </>
  )
}

export default ADEditInformation;