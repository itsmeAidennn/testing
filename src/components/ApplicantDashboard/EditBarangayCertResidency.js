import style from '../../styling/ApplicantDashboard/Edit.module.css';

const EditBarangayCertResidency = ({userData, handleFileUploadChange, barangayCertResidencyFrontFileInputRef, barangayCertResidencyBackFileInputRef, uploadImageButton, brgyCertIDType, setBrgyCertIDType, validateBrgyCertID, handleDeleteButton, handleOpenModal}) => {
  return (
    <div className={style.editdocumentOptions}>
      <div className={style.documentOptions}>
        <div className={`${style.documentOptionsFront}`}>
          <p className={style.frontLabel}>Front</p>
          <p>Current File:</p>
          <div className={style.psaImg}>{userData ? (userData.documents.barangayCertResidency.front.name ? (<button className="DocumentURL" onClick={() => handleOpenModal('barangayCertResidency', 'front')}>{userData.documents.barangayCertResidency.front.name}</button>) : 'No image uploaded') : 'Loading...'}</div>
          <button className={style.deleteBtn} id="barangayCertResidency" data-side="front" onClick={handleDeleteButton}>Delete</button>
          {/* <button onClick={()=>alert("Coming Soon...")}>Verify</button> */}
          <input type='file' accept='.jpg,.jpeg' multiple={false} onChange={handleFileUploadChange} ref={barangayCertResidencyFrontFileInputRef} id='barangayCertResidencyFrontFile'/>
          <button className={style.uploadBtn} id="barangayCertResidency" data-side="front" onClick={uploadImageButton}>Upload</button>
        </div>
        
        <div className={`${style.documentOptionsBack}`}>
          <p className={style.frontLabel}>Back</p>
          <p>Current File:</p>
          <div className={style.psaImg}>{userData ? (userData.documents.barangayCertResidency.back.name ? (<button className="DocumentURL" onClick={() => handleOpenModal('barangayCertResidency', 'back')}>{userData.documents.barangayCertResidency.back.name}</button>) : 'No image uploaded') : 'Loading...'}</div>
          <button className={style.deleteBtn} id="barangayCertResidency" data-side="back" onClick={handleDeleteButton}>Delete</button>
          <input type='file' accept='.jpg,.jpeg' multiple={false} onChange={handleFileUploadChange} ref={barangayCertResidencyBackFileInputRef} id='barangayCertResidencyBackFile'/>
          <button className={style.uploadBtn} id="barangayCertResidency" data-side="back" onClick={uploadImageButton} >Upload</button>
        </div>
      </div>  
      <div className={style.verifyDropdown}>
          <select value={brgyCertIDType} onChange={(e)=>{setBrgyCertIDType(e.target.value)}}>
              <option value=''>Please Select the card you uploaded before doing the verify.</option>
              <option value='cert'>Barangay Certificate</option>
              <option value='ID'>Barangay ID</option>
          </select>
          <button onClick={validateBrgyCertID}>Check Document</button>
        </div>
    </div>
  )
}

export default EditBarangayCertResidency;