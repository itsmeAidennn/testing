import style from '../../styling/ApplicantDashboard/Edit.module.css';

const EditValidID = ({userData, handleFileUploadChange, validIDFrontFileInputRef, validIDBackFileInputRef, uploadImageButton, validIDType, setValidIDType, validateID, handleDeleteButton, handleOpenModal}) => {
  return (
    <div className={style.editdocumentOptions}>
      <div className={style.documentOptions}>
        <div className={`${style.documentOptionsFront}`}>
          <p>Front</p>
          <p>Current File:</p>

          <div className={style.psaImg}>{userData ? (userData.documents.validID.front.name ? (<button className="DocumentURL" onClick={() => handleOpenModal('validID', 'front')}>{userData.documents.validID.front.name}</button>) : 'No image uploaded') : 'Loading...'}</div>
          <button className={style.deleteBtn} id="validID" data-side="front" onClick={handleDeleteButton}>Delete</button>
          <input type='file' accept='.jpg,.jpeg' multiple={false} onChange={handleFileUploadChange} ref={validIDFrontFileInputRef} id='validIDFrontFile'/>
          <button className={style.uploadBtn} id="validID" data-side="front" onClick={uploadImageButton}>Upload</button>
        </div>
        <div className={`${style.documentOptionsBack}`}>
          <p className={style.frontLabel}>Back</p>
          <p>Current File:</p> 

          <div className={style.psaImg}>{userData ? (userData.documents.validID.back.name ? (<button className="DocumentURL" onClick={() => handleOpenModal('validID', 'back')}>{userData.documents.validID.back.name}</button>) : 'No image uploaded') : 'Loading...'}</div>
          <button className={style.deleteBtn} id="validID" data-side="back" onClick={handleDeleteButton}>Delete</button>
          <input type='file' accept='.jpg,.jpeg' multiple={false} onChange={handleFileUploadChange} ref={validIDBackFileInputRef} id='validIDBackFile'/>
          <button className={style.uploadBtn} id="validID" data-side="back" onClick={uploadImageButton} >Upload</button>
        </div>
      </div>
      <div className={style.verifyDropdown}>
          <select value={validIDType} onChange={(e)=>{setValidIDType(e.target.value)}}>
            <option value=''>Please Select the card you uploaded before doing the verify.</option>
            <option value='nationalID'>National ID</option>
            <option value='vaccineCard'>Vaccine Card</option>
          </select>
          <button onClick={validateID}>Check Document</button>
        </div>
    </div>   
  )
}

export default EditValidID;