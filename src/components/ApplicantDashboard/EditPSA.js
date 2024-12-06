import style from '../../styling/ApplicantDashboard/Edit.module.css';

const EditPSA = ({userData, handleFileUploadChange, psaFileInputRef, uploadImageButton, validatePSA, handleDeleteButton, handleOpenModal}) => {
  return (
    <div className={style.editdocumentOptions}>
      <div className={style.documentOptions}>
        
        <div className={`${style.documentOptionsFront}`}>
          <p>Current File:</p>
          <div className={style.psaImg}>{userData ? (userData.documents.psa.name ? (<button className={`${style.DocuemntURLPsa}`} onClick={() => handleOpenModal('psa', 'na')}>{userData.documents.psa.name}</button>) : 'No image uploaded') : 'Loading...'} </div>
          <button className={style.deleteBtn} id="psa"data-side={null} onClick={handleDeleteButton}>Delete</button>
          <input type='file' accept='.jpg,.jpeg' multiple={false} onChange={handleFileUploadChange} ref={psaFileInputRef} id='psaFile' />
          <button className={style.uploadBtn} id="psa" onClick={uploadImageButton} >Upload</button>
        </div>
      </div>  
      <div className={style.verifyDropdown}>
        <button id={style.verifyButtonPSA} onClick={validatePSA}>Check Document</button>
      </div>
    </div>
  )
}

export default EditPSA;