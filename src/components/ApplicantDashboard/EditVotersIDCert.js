import style from '../../styling/ApplicantDashboard/Edit.module.css';

const EditVotersIDCert = ({userData, handleFileUploadChange, votersIDCertFrontFileInputRef, votersIDCertBackFileInputRef, uploadImageButton, votersCertIDType, setVotersIDCertType, validateVotersIDCert, handleDeleteButton, handleOpenModal}) => {
  return (
    <div className={style.editdocumentOptions}>
      <div className={style.documentOptions}>
        <div className={`${style.documentOptionsFront}`}>
        <p className={style.frontLabel}>Front</p>
        <p>Current File:</p>
        <div className={style.psaImg}>{userData ? (userData.documents.votersIDCert.front.name ? (<button className="DocumentURL" onClick={() => handleOpenModal('votersIDCert', 'front')}>{userData.documents.votersIDCert.front.name}</button>) : 'No image uploaded') : 'Loading...'}</div>
          <button className={style.deleteBtn} id="votersIDCert" data-side="front" onClick={handleDeleteButton}>Delete</button>
          {/* <button onClick={()=>alert("Coming Soon...")}>Verify</button> */}
          <input type='file' accept='.jpg,.jpeg' multiple={false} onChange={handleFileUploadChange} ref={votersIDCertFrontFileInputRef} id='votersIDCertFrontFile'/>
          <button className={style.uploadBtn} id="votersIDCert" data-side="front" onClick={uploadImageButton}>Upload</button>
        </div>
        
        <div className={`${style.documentOptionsBack}`}>
          <p className={style.frontLabel}>Back</p>
          <p>Current File:</p>
          <div className={style.psaImg}>{userData ? (userData.documents.votersIDCert.back.name ? (<button className="DocumentURL" onClick={() => handleOpenModal('votersIDCert', 'back')}>{userData.documents.votersIDCert.back.name}</button>) : 'No image uploaded') : 'Loading...'}</div>
          <button className={style.deleteBtn} id="votersIDCert" data-side="back" onClick={handleDeleteButton}>Delete</button>
          <input type='file' accept='.jpg,.jpeg' multiple={false} onChange={handleFileUploadChange} ref={votersIDCertBackFileInputRef} id='votersIDCertBackFile'/>
          <button className={style.uploadBtn} id="votersIDCert" data-side="back" onClick={uploadImageButton} >Upload</button>
        </div>
      </div>  
      <div className={style.verifyDropdown}>
          <select value={votersCertIDType} onChange={(e)=>{setVotersIDCertType(e.target.value)}}>
              <option value=''>Please Select the card you uploaded before doing the verify.</option>
              <option value='cert'>Voters' Certificate</option>
              <option value='ID'>Voters' ID</option>
          </select>
          <button onClick={validateVotersIDCert}>Check Document</button>
        </div>
    </div>  
  )
}

export default EditVotersIDCert;