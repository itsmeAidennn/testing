import { React, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import style from '../../../styling/RegistrarAndAdmin/RegistrarEditInfo.module.css';

const ADEditInformation = ({regProfileData, setChange}) => {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const [loadingButtons, setLoadingButtons] = useState(['']);

  const [isFirstNameEditing, setIsFirstNameEditing] = useState(false);
  const [tempTextFirstName, setTempTextFirstName] = useState();

  const [isMiddleNameEditing, setIsMiddleNameEditing] = useState(false);
  const [tempTextMiddleName, setTempTextMiddleName] = useState();

  const [isSurnameEditing, setIsSurnameEditing] = useState(false);
  const [tempTextSurname, setTempTextSurname] = useState();

  const [isAddressEditing, setIsAddressEditing] = useState(false);
  const [tempTextAddress, setTempTextAddress] = useState();

  const [isAgeEditing, setIsAgeEditing] = useState(false);
  const [tempTextAge, setTempTextAge] = useState();

  const [isProfilePictureEditing, setIsProfilePictureEditing] = useState(false);
  const [tempProfilePicture, setTempProfilePicture] = useState();

  const handleEditInfoButton = (info) => {
    switch(info){
      case "firstName":
        setTempTextFirstName(regProfileData.firstName);
        setIsFirstNameEditing(true);
        break
      case "middleName":
        setTempTextMiddleName(regProfileData.middleName);
        setIsMiddleNameEditing(true);
        break
      case "surname":
        setTempTextSurname(regProfileData.surname);
        setIsSurnameEditing(true);
        break
      case "address":
        setTempTextAddress(regProfileData.address);
        setIsAddressEditing(true);
        break
      case "age":
        setTempTextAge(regProfileData.age);
        setIsAgeEditing(true);
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
      case "surname":
        setIsSurnameEditing(false);
        break
      case "address":
        setIsAddressEditing(false);
        break
      case "age":
        setIsAgeEditing(false);
        break;
      case "profilePicture":
        setTempProfilePicture(regProfileData.profilePicture);
        setIsProfilePictureEditing(true);
        break;
      default: 
        break;
    }
  }

  const handleSaveInfo = async (info) => {
    setLoadingButtons((prev) => [...prev, info]);
    const infoMapping = {
      firstName: { tempValue: tempTextFirstName, setEditing: setIsFirstNameEditing },
      middleName: { tempValue: tempTextMiddleName, setEditing: setIsMiddleNameEditing },
      surname: { tempValue: tempTextSurname, setEditing: setIsSurnameEditing },
      address: { tempValue: tempTextAddress, setEditing: setIsAddressEditing },
      age: { tempValue: tempTextAge, setEditing: setIsAgeEditing },
      profilePicture: { tempValue: tempProfilePicture, setEditing: setIsProfilePictureEditing },
    };

    const { tempValue: newInfo, setEditing } = infoMapping[info] || {};
    if (newInfo === undefined || !setEditing) {
      console.error("Invalid info type");
      return;
    }

    try {
      const response = await fetch(`/api/reg-update-info`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          infoToUpdate: info,
          newInfo,
        }),
      });

      if (response.ok) {
        setChange((prevChange) => !prevChange);
        Swal.fire({
          icon: "success",
          title: "Update completed!",
          text: "Your changes have been saved.",
        });
        setEditing(false);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Update failed!",
          text: "Failed to update your information, please try again.",
        });
      }
    } catch (e) {
      console.log(e);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while updating your information.",
      });
    } finally {
      setLoadingButtons((prev) => prev.filter((item) => item !== info));
    }
  };

  
  return(
    <div className={style.registrarEditContainer}>
    <div className={style.registrarEditBox}>
    <h2>Edit Registrar Information</h2>
      <div className={style.editItems}>
      <p>First Name: </p>
        { isFirstNameEditing ? 
          <div className={style.edit}>
            <input className={`${style.inputBar}`} type="text" value={tempTextFirstName} onChange={(e)=>setTempTextFirstName(e.target.value)} autoFocus />
            <button className={`${style.saveBtn}`} onClick={() => handleSaveInfo("firstName")} disabled={loadingButtons.includes("firstName")}>{loadingButtons.includes("firstName") ? "..." : "Save"}</button>
            <button className={`${style.cancelBtn}`} onClick={() => handleCancelEdit('firstName')}>Cancel</button>
          </div>
          :
          <div>
            <span>{regProfileData ?  `${regProfileData.firstName}` : `Loading...`} </span>
            <button id={style.editIcon} onClick={() => handleEditInfoButton("firstName")}><FaEdit /></button>
          </div>
        }  
      </div>  
      <div className={style.editItems}>
      <p>Middle Name: </p>
        { isMiddleNameEditing ? 
          <div className={style.edit}>
            <input className={`${style.inputBar}`} type="text" value={tempTextMiddleName} onChange={(e)=>setTempTextMiddleName(e.target.value)} autoFocus />
            <button className={`${style.saveBtn}`} onClick={() => handleSaveInfo("middleName")} disabled={loadingButtons.includes("middleName")}>{loadingButtons.includes("middleName") ? "..." : "Save"}</button>
            <button className={`${style.cancelBtn}`} onClick={() => handleCancelEdit('middleName')}>Cancel</button>
          </div>
          :
          <>
            <div className={`${style.userInfo}`}>{regProfileData ?  `${regProfileData.middleName}` : `Loading...`} </div>
            <button onClick={() => handleEditInfoButton("middleName")}><FaEdit /></button>
          </>
        }
      </div>
      <div className={style.editItems}>
      <p>Surname: </p>
        { isSurnameEditing ? 
          <div className={style.edit}>
            <input className={`${style.inputBar}`} type="text" value={tempTextSurname} onChange={(e)=>setTempTextSurname(e.target.value)} autoFocus />
            <button className={`${style.saveBtn}`} onClick={() => handleSaveInfo("surname")} disabled={loadingButtons.includes("surname")}>{loadingButtons.includes("lastName") ? "..." : "Save"}</button>
            <button className={`${style.cancelBtn}`} onClick={() => handleCancelEdit('surname')}>Cancel</button>
          </div>
          :
          <>
            <div className={`${style.userInfo}`}>{regProfileData ?  `${regProfileData.surname}` : `Loading...`} </div>
            <button onClick={() => handleEditInfoButton("surname")}><FaEdit /></button>
          </>
        }
      </div>
      <div className={style.editItems}>
      <p>Address: </p>
        { isAddressEditing ? 
          <div className={style.edit}>
            <input className={`${style.inputBar}`} type="text" value={tempTextAddress} onChange={(e)=>setTempTextAddress(e.target.value)} autoFocus />
            <button className={`${style.saveBtn}`} onClick={() => handleSaveInfo("address")} disabled={loadingButtons.includes("address")}>{loadingButtons.includes("address") ? "..." : "Save"}</button>
            <button className={`${style.cancelBtn}`} onClick={() => handleCancelEdit('address')}>Cancel</button>
          </div>
          :
          <div>
            <span>{regProfileData ?  `${regProfileData.address}` : `Loading...`} </span>
            <button onClick={() => handleEditInfoButton("address")}><FaEdit /></button>
          </div>
        }
      </div>
      <div className={style.editItems}>
      <p>Age: </p>
      {isAgeEditing ? (
        <div className={style.edit}>
          <input
            className="input-bar"
            type="number"
            value={tempTextAge}
            onChange={(e) => setTempTextAge(e.target.value)}
            autoFocus
          />
          <button className={`${style.saveBtn}`} onClick={() => handleSaveInfo("age")}>Save</button>
          <button className={`${style.cancelBtn}`} onClick={() => handleCancelEdit("age")}>Cancel</button>
        </div>
      ) : (
        <div>
          <span>{regProfileData?.age || "Loading..."}</span>
          <button onClick={() => handleEditInfoButton("age")}><FaEdit /></button>
        </div>
      )}
        </div>
      <div className={style.editItems}>
      <p>Profile Picture: </p>
      {isProfilePictureEditing ? (
        <div className={style.edit}>
          <input
            className="input-bar"
            type="text"
            value={tempProfilePicture}
            onChange={(e) => setTempProfilePicture(e.target.value)}
            autoFocus
          />
          <button className={`${style.saveBtn}`} onClick={() => handleSaveInfo("profilePicture")}>Save</button>
          <button className={`${style.cancelBtn}`} onClick={() => handleCancelEdit("profilePicture")}>Cancel</button>
        </div>
      ) : (
        <div>
          <span>{regProfileData?.profilePic.name || "Loading..."}</span>
          <button onClick={() => handleEditInfoButton("profilePicture")}><FaEdit /></button>
        </div>
      )}
        </div>
    </div>
    </div>
  )
}

export default ADEditInformation;