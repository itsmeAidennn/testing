import { React, useState, useRef } from 'react';
import Modal from '../CustomModal';
import style from '../../styling/ApplicantDashboard/ADEditDocuments.module.css';
import EditPSA from './EditPSA';
import EditValidID from './EditValidID';
import EditAcademicCard from './EditAcademicCard';
import EditBarangayCertResidency from './EditBarangayCertResidency';
import EditVotersIDCert from './EditVotersIDCert';

const ADEditDocuments = ({userData, applicantDocuments, setChange}) => {
  const [imageInModal, setImageInModal] = useState('');
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

  const [psaUpload, setPsaUpload] = useState(null);
  const psaFileInputRef = useRef(null);

  const [validIDFrontUpload, setValidIDFrontUpload] = useState(null);
  const validIDFrontFileInputRef = useRef(null);
  const [validIDBackUpload, setValidIDBackUpload] = useState(null);
  const validIDBackFileInputRef = useRef(null);
  const [validIDType, setValidIDType] = useState('');
  
  const [academicCardFrontUpload, setAcademicCardFrontUpload] = useState(null);
  const academicCardFrontFileInputRef = useRef(null);
  const [academicCardBackUpload, setAcademicCardBackUpload] = useState(null);
  const academicCardBackFileInputRef = useRef(null);

  const [barangayCertResidencyFrontUpload, setbarangayCertResidencyFrontUpload] = useState(null);
  const barangayCertResidencyFrontFileInputRef = useRef(null);
  const [barangayCertResidencyBackUpload, setbarangayCertResidencyBackUpload] = useState(null);
  const barangayCertResidencyBackFileInputRef = useRef(null);
  const [brgyCertIDType, setBrgyCertIDType] = useState('');

  const [votersIDCertFrontUpload, setvotersIDCertFrontUpload] = useState(null);
  const votersIDCertFrontFileInputRef = useRef(null);
  const [votersIDCertBackUpload, setvotersIDCertBackUpload] = useState(null);
  const votersIDCertBackFileInputRef = useRef(null);
  const [votersCertIDType, setVotersIDCertType] = useState('');

  const handleFileUploadChange = (e) => {
    const file = e.target.files[0];
    const fileKind = e.target.id;
    if(file && file.type === "image/jpeg"){
      switch(fileKind) {
        case 'psaFile':
          setPsaUpload(file);
          break;
        case 'validIDFrontFile':
          setValidIDFrontUpload(file);
          break;
        case 'validIDBackFile':
          setValidIDBackUpload(file);
          break;
        case 'academicCardFrontFile':
          setAcademicCardFrontUpload(file);
          break;
        case 'academicCardBackFile':
          setAcademicCardBackUpload(file);
          break;
        case 'barangayCertResidencyFrontFile':
          setbarangayCertResidencyFrontUpload(file);
          break;
        case 'barangayCertResidencyBackFile':
          setbarangayCertResidencyBackUpload(file);
          break;
        case 'votersIDCertFrontFile':
          setvotersIDCertFrontUpload(file);
          break;  
        case 'votersIDCertBackFile':
          setvotersIDCertBackUpload(file);
          break;
        default:
          alert('Invalid file type.');
      }
    }
    else {
      alert("Please select a valid JPG or JPEG file");
    }
  };

  const uploadImageButton = async (e) => {
    e.disabled = true;
    e.innerText = "...";
    const formData = new FormData();
    const fileKind = e.target.id;
    const fileSide = e.target.dataset.side || null;
    let fileUpload = null;
    let fileInputRef = null;
    switch(fileKind) {
      case 'psa':
        fileUpload = psaUpload;
        fileInputRef = psaFileInputRef;
        break;
      case 'validID':
        if (fileSide === 'front') {
          fileUpload = validIDFrontUpload;
          fileInputRef = validIDFrontFileInputRef;
        } else if (fileSide === 'back') {
          fileUpload = validIDBackUpload;
          fileInputRef = validIDBackFileInputRef;
        }
        break;
      case 'academicCard':
        if (fileSide === 'front') {
          fileUpload = academicCardFrontUpload;
          fileInputRef = academicCardFrontFileInputRef;
        } else if (fileSide === 'back') {
          fileUpload = academicCardBackUpload;
          fileInputRef = academicCardBackFileInputRef;
        }
        break;
      case 'barangayCertResidency':
        if (fileSide === 'front') {
          fileUpload = barangayCertResidencyFrontUpload;
          fileInputRef = barangayCertResidencyFrontFileInputRef;
        } else if (fileSide === 'back') {
          fileUpload = barangayCertResidencyBackUpload;
          fileInputRef = barangayCertResidencyBackFileInputRef;
        }
        break;
      case 'votersIDCert':
        if (fileSide === 'front') {
          fileUpload = votersIDCertFrontUpload;
          fileInputRef = votersIDCertFrontFileInputRef;
        } else if (fileSide === 'back') {
          fileUpload = votersIDCertBackUpload;
          fileInputRef = votersIDCertBackFileInputRef;
        }
        break;
      default:
        alert('Invalid file type.')
        e.disabled = false;
        return
    }
    if(!fileUpload) {
      alert("No file detected");
      e.disabled = false;
      return
    }
    formData.append('file', fileUpload)
    formData.append('fileKind', fileKind)
    if (fileSide) formData.append('fileSide', fileSide);
    try {
      const response = await fetch('/api/ImageFileUpload', {
        method: 'PUT',
        body: formData,
      });
      if (response.ok) {
        alert('Image uploaded successfully');
        fileInputRef.current.value = '';
        setChange(prevChange => !prevChange);
        e.disabled = false;
        e.innerText = "Upload";
      } else {
        alert('Failed to upload Image');
        e.disabled = false;
        e.innerText = "Upload";
      }
    } catch (error) {
      console.error('Error uploading Image:', error);
      e.disabled = false;
      e.innerText = "Upload";
    }
  } 

  const validatePSA = async (e) => {
    e.disabled = true;
    e.innerText = "...";
    alert('Processing your request ...');
    try {
      const response = await fetch('/api/validatePSA', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include'
      })
      if(response.ok) {
        const data = await response.json();
        alert(data.message);
        e.disabled = false;
        e.innerText = "Save";
        setChange(prevChange => !prevChange);
      }
      else{
        const data = await response.json();
        alert(data.message);
        e.disabled = false;
        e.innerText = "Save";
      }
    }
    catch (e) {
      console.log(e);
      alert('Could not reach the server');
      e.disabled = false;
      e.innerText = "Save";
    }
  }

  const validateID = async (e) => {
    e.disabled = true;
    e.innerText = "...";
    alert('Processing your request ...');
    if(!validIDType) {
      alert('Please select the ID type you want to verify first!');
      return
    }
    try {
      const response = await fetch('/api/validateID', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({validIDType}),
        credentials: 'include'
      })
      if(response.ok) {
        const data = await response.json();
        alert(data.message);
        e.disabled = false;
        e.innerText = "Save";
        setChange(prevChange => !prevChange);
      }
      else{
        const data = await response.json();
        alert(data.message);
        e.disabled = false;
        e.innerText = "Save";
      }
    }
    catch (e) {
      console.log(e);
      alert('Could not reach the server');
      e.disabled = false;
      e.innerText = "Save";
    }
  }

  const validateAcademicCard = async (e) => {
    e.disabled = true;
    e.innerText = "...";
    alert('Processing your request ...');
    try {
      const response = await fetch('/api/validateAcademicCard', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include'
      })
      if(response.ok) {
        const data = await response.json();
        alert(data.message);
        e.disabled = false;
        e.innerText = "Save";
        setChange(prevChange => !prevChange);
      }
      else{
        const data = await response.json();
        alert(data.message);
        e.disabled = false;
        e.innerText = "Save";
      }
    }
    catch (e) {
      console.log(e);
      alert('Could not reach the server');
      e.disabled = false;
      e.innerText = "Save";
    }
  }
  
  const validateBrgyCertID = async (e) => {
    e.disabled = true;
    e.innerText = "...";
    alert('Processing your request ...');
    if(!brgyCertIDType) {
      alert('Please select type you want to verify first!');
      return
    }
    try {
      const response = await fetch('/api/validateBrgyCertID', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({brgyCertIDType}),
        credentials: 'include'
      })
      if(response.ok) {
        const data = await response.json();
        alert(data.message);
        e.disabled = false;
        e.innerText = "Save";
        setChange(prevChange => !prevChange);
      }
      else{
        const data = await response.json();
        alert(data.message);
        e.disabled = false;
        e.innerText = "Save";
      }
    }
    catch (e) {
      console.log(e);
      alert('Could not reach the server');
      e.disabled = false;
      e.innerText = "Save";
    }
  }

  const validateVotersIDCert = async (e) => {
    e.disabled = true;
    e.innerText = "...";
    alert('Processing your request ...');
    if(!votersCertIDType) {
      alert('Please select type you want to verify first!');
      return
    }
    try {
      const response = await fetch('/api/validateVotersCertID', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({votersCertIDType}),
        credentials: 'include'
      })
      if(response.ok) {
        const data = await response.json();
        alert(data.message);
        e.disabled = false;
        e.innerText = "Save";
        setChange(prevChange => !prevChange);
      }
      else{
        const data = await response.json();
        alert(data.message);
        e.disabled = false;
        e.innerText = "Save";
      }
    }
    catch (e) {
      console.log(e);
      alert('Could not reach the server');
      e.disabled = false;
      e.innerText = "Save";
    }
  }

  const handleDeleteButton = async (e) => {
    e.disabled = true;
    const formData = new FormData();
    const fileKind = e.target.id;
    const fileSide = e.target.dataset.side || null;
    formData.append('fileKind', fileKind);
    if (fileSide) formData.append('fileSide', fileSide);
    try {
      const response = await fetch('/api/ImageFileDelete', {
        method: 'PUT',
        body: formData,
      });
      if (response.ok) {
        alert("Image deleted successfuly");
        setChange(prevChange => !prevChange);
        e.disabled = false;
      } else {
        alert('Failed to upload Image');
        e.disabled = false;
      }
    } catch (error) {
      console.error('Error uploading Image:', error);
      e.disabled = false;
    }
  }

  const [documentToEdit, setDocumentToEdit] = useState('');
  const handleDocumentToEditChange = (e) => {
    setDocumentToEdit(e.target.value);
  } 

  return(
    <div className={`${style.editDocumentContainer}`}>
      <p>What document would you want to work with?</p>
      <select onChange={handleDocumentToEditChange}>
        <option >Select a document:</option>
        <option value="psa">PSA</option>
        <option value="validID">Valid ID</option>
        <option value="academicCard">School Card</option>
        <option value="barangayCertResidency">Barangay Certificate or residency</option>
        <option value="votersIDCert">Voter's ID or Certification</option>
      </select>
      
      {documentToEdit === "psa" ? <EditPSA userData={userData} handleFileUploadChange={handleFileUploadChange} psaFileInputRef={psaFileInputRef} uploadImageButton={uploadImageButton} validatePSA={validatePSA} handleDeleteButton={handleDeleteButton} handleOpenModal={handleOpenModal} /> : null}
      
      {documentToEdit === "validID" ? <EditValidID userData={userData} handleFileUploadChange={handleFileUploadChange} validIDFrontFileInputRef={validIDFrontFileInputRef} validIDBackFileInputRef={validIDBackFileInputRef} uploadImageButton={uploadImageButton} validIDType={validIDType} setValidIDType={setValidIDType} validateID={validateID} handleDeleteButton={handleDeleteButton} handleOpenModal={handleOpenModal} /> : null}

      {documentToEdit === "academicCard" ? <EditAcademicCard userData={userData} handleFileUploadChange={handleFileUploadChange} academicCardFrontFileInputRef={academicCardFrontFileInputRef} academicCardBackFileInputRef={academicCardBackFileInputRef} uploadImageButton={uploadImageButton} validateAcademicCard={validateAcademicCard} handleDeleteButton={handleDeleteButton} handleOpenModal={handleOpenModal} /> : null}

      {documentToEdit === "barangayCertResidency" ? <EditBarangayCertResidency userData={userData} handleFileUploadChange={handleFileUploadChange} barangayCertResidencyFrontFileInputRef={barangayCertResidencyFrontFileInputRef} barangayCertResidencyBackFileInputRef={barangayCertResidencyBackFileInputRef} uploadImageButton={uploadImageButton} brgyCertIDType={brgyCertIDType} setBrgyCertIDType={setBrgyCertIDType} validateBrgyCertID={validateBrgyCertID} handleDeleteButton={handleDeleteButton} handleOpenModal={handleOpenModal} /> : null}

      {documentToEdit === "votersIDCert" ? <EditVotersIDCert userData={userData} handleFileUploadChange={handleFileUploadChange} votersIDCertFrontFileInputRef={votersIDCertFrontFileInputRef} votersIDCertBackFileInputRef={votersIDCertBackFileInputRef} uploadImageButton={uploadImageButton} votersCertIDType={votersCertIDType} setVotersIDCertType={setVotersIDCertType} validateVotersIDCert={validateVotersIDCert} handleDeleteButton={handleDeleteButton} handleOpenModal={handleOpenModal} /> : null}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {applicantDocuments ?
            <img src={`data:image/jpeg;base64,${imageInModal}`} alt="Uploaded Document" />
            :
            <p>Loading...</p>
          }
        </Modal>
    </div>
  );
}

export default ADEditDocuments;