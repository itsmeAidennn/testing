import style from '../../../styling/RegistrarAndAdmin/RegistrarProfile.module.css'

import { React }from 'react';

const RegistrarProfile = ({ regProfileData }) => {
  return (
    <div className={style.registrarProfile}>
      <div className={style.profileBox}>
        <h1>Registrar Profile</h1>

        <div className={style.profileSection}>
          {regProfileData.profilePic && regProfileData.profilePic.data ? (
            <img
              id={style.registrarImg}
              src={`data:${regProfileData.profilePic.contentType};base64,${regProfileData.profilePic.data}`}
              alt="Profile Picture"
              className="profile-picture"
            />
          ) : (
            <div className="profile-picture-placeholder">No Profile Picture</div>
          )}

        <div className={style.profileDetails}>
          <p><strong>Name:</strong> {`${regProfileData.firstName} ${regProfileData.middleName} ${regProfileData.surname}`}</p>
          <p><strong>Age:</strong> {regProfileData.age}</p>
          <p><strong>Address:</strong> {regProfileData.address}</p>
          <p><strong>Email:</strong> {regProfileData.email}</p>
          <p><strong>Unique ID:</strong> {regProfileData.uniqueID}</p>
          <p><strong>Admin Status:</strong> {regProfileData.isAdmin}</p>
          <p><strong>Account Created:</strong> {new Date(regProfileData.createdAt).toLocaleDateString()}</p>
        </div>
        </div>

        
      </div>
    </div>
  );
};

export default RegistrarProfile;
