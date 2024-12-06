import { FaEye, FaEyeSlash, FaExclamationTriangle, FaRegCircle ,FaCheckCircle } from "react-icons/fa";
import { MdFileDownloadOff, MdPending } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import style from '../../styling/ApplicantDashboard/ADApplicantProfile.module.css';
import { useState, useEffect } from "react";
import Modal from '../CustomModal';

const ApplicantProfile = ({userData, applicantDocuments}) => {
  const [imageInModal, setImageInModal] = useState('');
  
  const [hideUID, setHideUID] = useState(true);
  const UIDToggle = () => {
    setHideUID(!hideUID);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = async (imageType, side) => {
    if(imageType === "psa" && side === "na") {
      setImageInModal(applicantDocuments[imageType]);
      setIsModalOpen(true);
    } else {
      setImageInModal(applicantDocuments[imageType][side]);
      setIsModalOpen(true);
    }
    
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setImageInModal('');
  }

  const [toggleState, setToggleState] = useState(1); 

  const toggleTab = (index) => {
    setToggleState(index);
  }

  return (
    <div className={`${style.ApplicantProfileBox}`}>
      {/* <h2>Applicant Profile</h2> */}
      <div className={style.blockTabs}>
        <div className={toggleState === 1 ? style.TABSactive : style.tabs}
        onClick = {() => toggleTab(1)}
        >Applicant Information</div>
        <div className={toggleState === 2 ? style.TABSactive : style.tabs}
        onClick = {() => toggleTab(2)}
        >Applicant Documents</div>
      </div>

      <div className={style.contentTabs}>
        <div className={toggleState === 1 ? style.CONTENTactive : style.content}>
          <div className={style.contentWrapper}>
            <div className={style.profileBox}>
              <div id={style.profileImg}>
                <img src={`data:${userData.documents.pictures.type};base64,${applicantDocuments.pictures.front}`} alt="Profile" />
              </div>
              <div className={style.applicantName}>
                  <span className={`${style.SimpleText}`}> {userData ?  `${userData.lastName}, ${userData.firstName} ${userData.middleName} ${userData.nameSuffix}` : `Loading...`}</span>
              </div>
            </div>
            <div className={`${style.ApplicantInformation}`}>
            <div className={style.applicantEmail}>
            <p>
              <div>
                {userData.isEmailVerified === null ? <FaExclamationTriangle size={15} title="Verification pending"/> : ""}
                {userData.documents.validID.isVerified === "verified" ? <MdPending size={18} title="Verified"/> : ""}
              </div>
              Email:
            </p>
            <span className={`${style.SimpleText}`}> {userData ? `${userData.email}` : `Loading...`}</span>
            </div>
            <div className={style.applicantGender}>
            <p>Gender: </p>
            <span className={`${style.SimpleText}`}> {userData ? `${userData.gender}` : `Loading...`}</span>
            </div>
            <div className={style.applicantAddress}>
            <p>Address: </p>
            <span className={`${style.SimpleText}`}> {userData ? `${userData.address}` : `Loading...`} </span>
            </div>
            <div className={style.applicantContactNumber}>
            <p>Contact Number: </p>
            <span className={`${style.SimpleText}`}> {userData ? `${userData.contactNo}` : `Loading...`}</span>
            </div>
            <div className={style.applicantID}>
            <p>Unique ID: </p>
            <span className={`${style.SimpleText}`}> {userData ? `${hideUID ? '*'.repeat((userData.uniqueID).length) : userData.uniqueID}` : `Loading...`} <button onClick={UIDToggle}> {hideUID ? <FaEye /> : <FaEyeSlash />}</button></span>
            </div>
            </div>
          </div>
        </div>

        <div className={toggleState === 2 ? style.CONTENTactive : style.content}>
          <div className={`${style.ApplicantDocuments}`}>
          <p>
            <div>
              {userData.documents.psa.isVerified === null ? <FaExclamationTriangle color="red" size={15} title="Verification pending"/> : ""}
              {userData.documents.psa.isVerified === "true" ? <MdPending size={18} title="Verification in progress"/> : ""}
              {userData.documents.psa.isVerified === "verified" ? <FaCheckCircle size={15} title="Verified"/> : ""}
            </div>
            PSA
          </p>  
          <div className={`${style.DocumentSides}`}>
          <div className="">{userData ? (userData.documents.psa.name ? (<button className={`${style.DocumentURLPsa}`} onClick={() => handleOpenModal('psa', 'na')}>{userData.documents.psa.name}</button>) : 'No image uploaded') : 'Loading...'} </div>
          {applicantDocuments ? (applicantDocuments.psa ? <a href={`data:image/jpeg;base64,${applicantDocuments.psa}`} download={`${userData.documents.psa.name}`} target="_blank" rel="noopener noreferrer" className={`${style.downloadLogo}`}><IoMdDownload /></a> : null): null}  
          </div>
          <p>
            <div>
              {userData.documents.validID.isVerified === null ? <FaExclamationTriangle color="red" size={15} title="Verification pending"/> : ""}
              {userData.documents.validID.isVerified === "true" ? <MdPending size={18} title="Verification in progress"/> : ""}
              {userData.documents.validID.isVerified === "verified" ? <FaCheckCircle size={15} title="Verified"/> : ""}
            </div>
            Valid ID
          </p>
          <div className={`${style.frontAndBackContainer}`}>
            <div className={`${style.frontAndBack}`}>
              <span className={`${style.frontLabel}`}>
                Front:
              </span>
              {userData ? (userData.documents.validID.front.name ? (<button className={`${style.DocumentURL}`} onClick={() => handleOpenModal('validID', 'front')}>{userData.documents.validID.front.name}</button>) : <span className={`${style.NoImageUploaded}`}>No image uploaded</span>) : 'Loading...'}
              {applicantDocuments ? (
                applicantDocuments.validID.front ? (
                  <a href={`data:image/jpeg;base64,${applicantDocuments.validID.front}`} download={`${userData.documents.validID.front.name}`} target="_blank" rel="noopener noreferrer" className={`${style.downloadLogo}`}>
                    <IoMdDownload />
                  </a>
                ) : null): null}
            </div>
            <div className={`${style.frontAndBack} ${style.backSide}`}>
            <span className={`${style.frontLabel}`}>Back:</span>
            {userData ? (userData.documents.validID.back.name ? (<button className={`${style.DocumentURL}`} onClick={() => handleOpenModal('validID', 'back')}>{userData.documents.validID.back.name}</button>) : <span className={`${style.NoImageUploaded}`}>No image uploaded</span>) : 'Loading...'}
              {applicantDocuments ? (
                applicantDocuments.validID.back ? (
                  <a href={`data:image/jpeg;base64,${applicantDocuments.validID.back}`} download={`${userData.documents.validID.back.name}`} target="_blank" rel="noopener noreferrer" className={`${style.downloadLogo}`}>
                    <IoMdDownload />
                  </a>
                ) : null): null}
            </div>
          </div>
          <p>
            <div>
              {userData.documents.academicCard.isVerified === null ? <FaExclamationTriangle color="red" size={15} title="Verification pending"/> : ""}
              {userData.documents.academicCard.isVerified === "true" ? <MdPending size={18} title="Verification in progress"/> : ""}
              {userData.documents.academicCard.isVerified === "verified" ? <FaCheckCircle size={15} title="Verified"/> : ""}
            </div>
            School Card
          </p>
          <div className={`${style.frontAndBackContainer}`}>
            <div className={`${style.frontAndBack}`}>
              <span className={`${style.frontLabel}`}>Front:</span>
              {userData ? (userData.documents.academicCard.front.name ? (<button className={`${style.DocumentURL}`} onClick={() => handleOpenModal('academicCard', 'front')}>{userData.documents.academicCard.front.name}</button>) : <span className={`${style.NoImageUploaded}`}>No image uploaded</span>) : 'Loading...'}
              {applicantDocuments ? (
                applicantDocuments.academicCard.front ? (
                  <a href={`data:image/jpeg;base64,${applicantDocuments.academicCard.front}`} download={`${userData.documents.academicCard.front.name}`} target="_blank" rel="noopener noreferrer" className={`${style.downloadLogo}`}>
                    <IoMdDownload />
                  </a>
                ) : null): null}
            </div>
            <div className={`${style.frontAndBack} ${style.backSide}`}>
            <span className={`${style.frontLabel}`}>Back:</span>
              {userData ? (userData.documents.academicCard.back.name ? (<button className={`${style.DocumentURL}`} onClick={() => handleOpenModal('academicCard', 'back')}>{userData.documents.academicCard.back.name}</button>) : <span className={`${style.NoImageUploaded}`}>No image uploaded</span>) : 'Loading...'}
              {applicantDocuments ? (
                applicantDocuments.academicCard.back ? (
                  <a href={`data:image/jpeg;base64,${applicantDocuments.academicCard.back}`} download={`${userData.documents.academicCard.back.name}`} target="_blank" rel="noopener noreferrer" className={`${style.downloadLogo}`}>
                    <IoMdDownload />
                  </a>
                ) : null): null}
            </div>
          </div>
          <p>
            <div>
              {userData.documents.barangayCertResidency.isVerified === null ? <FaExclamationTriangle color="red" size={15} title="Verification pending"/> : ""}
              {userData.documents.barangayCertResidency.isVerified === "true" ? <MdPending size={18} title="Verification in progress"/> : ""}
              {userData.documents.barangayCertResidency.isVerified === "verified" ? <FaCheckCircle size={15} title="Verified"/> : ""}
            </div>
            Brgy ID or Certificate
          </p>
          <div className={`${style.frontAndBackContainer}`}>
            <div className={`${style.frontAndBack}`}>
              <span className={`${style.frontLabel}`}>Front:</span>
              {userData ? (userData.documents.barangayCertResidency.front.name ? (<button className={`${style.DocumentURL}`} onClick={() => handleOpenModal('barangayCertResidency', 'front')}>{userData.documents.barangayCertResidency.front.name}</button>) : <span className={`${style.NoImageUploaded}`}>No image uploaded</span>) : 'Loading...'}
              {applicantDocuments ? (
                applicantDocuments.barangayCertResidency.front ? (
                  <a href={`data:image/jpeg;base64,${applicantDocuments.barangayCertResidency.front}`} download={`${userData.documents.barangayCertResidency.front.name}`} target="_blank" rel="noopener noreferrer" className={`${style.downloadLogo}`}>
                    <IoMdDownload />
                  </a>
                ) : null): null}
            </div>
            <div className={`${style.frontAndBack} ${style.backSide}`}>
            <span className={`${style.frontLabel}`}>Back:</span>
              {userData ? (userData.documents.barangayCertResidency.back.name ? (<button className={`${style.DocumentURL}`} onClick={() => handleOpenModal('barangayCertResidency', 'back')}>{userData.documents.barangayCertResidency.back.name}</button>) : <span className={`${style.NoImageUploaded}`}>No image uploaded</span>) : 'Loading...'}
              {applicantDocuments ? (
                applicantDocuments.barangayCertResidency.back ? (
                  <a href={`data:image/jpeg;base64,${applicantDocuments.barangayCertResidency.back}`} download={`${userData.documents.barangayCertResidency.back.name}`} target="_blank" rel="noopener noreferrer" className={`${style.downloadLogo}`}>
                    <IoMdDownload />
                  </a>
                ) : null): null}
            </div>
          </div>
          <p>
            <div>
              {userData.documents.votersIDCert.isVerified === null ? <FaExclamationTriangle color="red" size={15} title="Verification pending"/> : ""}
              {userData.documents.votersIDCert.isVerified === "true" ? <MdPending size={18} title="Verification in progress"/> : ""}
              {userData.documents.votersIDCert.isVerified === "verified" ? <FaCheckCircle size={15} title="Verified"/> : ""}
            </div>
            Voter's ID or Certificate
          </p>
          <div className={`${style.frontAndBackContainer}`}>
            <div className={`${style.frontAndBack}`}>
              <span className={`${style.frontLabel}`}>Front:</span>
              {userData ? (userData.documents.votersIDCert.front.name ? (<button className={`${style.DocumentURL}`} onClick={() => handleOpenModal('votersIDCert', 'front')}>{userData.documents.votersIDCert.front.name}</button>) : <span className={`${style.NoImageUploaded}`}>No image uploaded</span>) : 'Loading...'}
              {applicantDocuments ? (
                applicantDocuments.votersIDCert.front ? (
                  <a href={`data:image/jpeg;base64,${applicantDocuments.votersIDCert.front}`} download={`${userData.documents.votersIDCert.front.name}`} target="_blank" rel="noopener noreferrer" className={`${style.downloadLogo}`}>
                    <IoMdDownload />
                  </a>
                ) : null): null}
            </div>
            <div className={`${style.frontAndBack} ${style.backSide}`}>
            <span className={`${style.frontLabel}`}>Back:</span>
              {userData ? (userData.documents.votersIDCert.back.name ? (<button className={`${style.DocumentURL}`} onClick={() => handleOpenModal('votersIDCert', 'back')}>{userData.documents.votersIDCert.back.name}</button>) : <span className={`${style.NoImageUploaded}`}>No image uploaded</span>) : 'Loading...'}
              {applicantDocuments ? (
                applicantDocuments.votersIDCert.back ? (
                  <a href={`data:image/jpeg;base64,${applicantDocuments.votersIDCert.back}`} download={`${userData.documents.votersIDCert.back.name}`} target="_blank" rel="noopener noreferrer" className={`${style.downloadLogo}`}>
                    <IoMdDownload />
                  </a>
                ) : null): null}
            </div>
          </div>
        </div>
        </div>

        <div className={style.content}>
          <h2>Content 3</h2>
          <hr />
          <span className={`${style.SimpleText}`}> {userData ? `${userData.email}` : `Loading...`}</span>
        </div>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {applicantDocuments ?
            <img src={`data:image/jpeg;base64,${imageInModal}`} alt="Uploaded Document" />
            :
            <p>Loading...</p>
          }
        </Modal>
      </div>
    </div>
  )
}

export default ApplicantProfile;

// Sa Barangay chuchu 'to
// {userData.documents.barangayCertResidency.isVerified === null ? <FaExclamationCircle /> : ""}
// {userData.documents.barangayCertResidency.isVerified === "true" ? <FaRegCircle /> : ""}
// {userData.documents.barangayCertResidency.isVerified === "verified" ? <FaCheckCircle /> : ""}

// Sa email 'to
//{userData.isEmailVerified === null ? <FaExclamationCircle /> : ""}
// {userData.documents.validID.isVerified === "verified" ? <FaCheckCircle /> : ""}

// Sa Valid ID 'to
// {userData.documents.validID.isVerified === null ? <FaExclamationCircle /> : ""}
// {userData.documents.validID.isVerified === "true" ? <FaRegCircle /> : ""}
// {userData.documents.validID.isVerified === "verified" ? <FaCheckCircle /> : ""}

// Sa PSA 'to
// {userData.documents.psa.isVerified === null ? <FaExclamationCircle /> : ""}
// {userData.documents.psa.isVerified === "true" ? <FaRegCircle /> : ""}
// {userData.documents.psa.isVerified === "verified" ? <FaCheckCircle /> : ""}

// Sa Academic Card 'to
// {userData.documents.academicCard.isVerified === null ? <FaExclamationCircle /> : ""}
// {userData.documents.academicCard.isVerified === "true" ? <FaRegCircle /> : ""}
// {userData.documents.academicCard.isVerified === "verified" ? <FaCheckCircle /> : ""}

// Voters ID or Certificate
// {userData.documents.votersIDCert.isVerified === null ? <FaExclamationCircle /> : ""}
// {userData.documents.votersIDCert.isVerified === "true" ? <FaRegCircle /> : ""}
// {userData.documents.votersIDCert.isVerified === "verified" ? <FaCheckCircle /> : ""}