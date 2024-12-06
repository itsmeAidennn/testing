import style from '../../styling/ApplicantDashboard/Edit.module.css';

const EditAcademicCard = ({userData, handleFileUploadChange, academicCardFrontFileInputRef, academicCardBackFileInputRef, uploadImageButton, validateAcademicCard, handleDeleteButton, handleOpenModal}) => {
  return (
    <div className={style.editdocumentOptions}>
      <div className={style.documentOptions}>
        <div className={`${style.documentOptionsFront}`}>
          <p className={style.frontLabel}>Front</p>
          <p>Current File:</p>
          <div className={style.psaImg}>{userData ? (userData.documents.academicCard.front.name ? (<button className="DocumentURL" onClick={() => handleOpenModal('academicCard', 'front')}>{userData.documents.academicCard.front.name}</button>) : 'No image uploaded') : 'Loading...'}</div>
          <button className={style.deleteBtn} id="academicCard" data-side="front" onClick={handleDeleteButton}>Delete</button>
          <input type='file' accept='.jpg,.jpeg' multiple={false} onChange={handleFileUploadChange} ref={academicCardFrontFileInputRef} id='academicCardFrontFile'/>
          <button className={style.uploadBtn} id="academicCard" data-side="front" onClick={uploadImageButton}>Upload</button>
        </div>
        
        <div className={`${style.documentOptionsBack}`}>
          <p className={style.frontLabel}>Back</p>
          <p>Current File:</p>  
          <div className={style.psaImg}>{userData ? (userData.documents.academicCard.back.name ? (<button className="DocumentURL" onClick={() => handleOpenModal('academicCard', 'back')}>{userData.documents.academicCard.back.name}</button>) : 'No image uploaded') : 'Loading...'}</div>
          <button className={style.deleteBtn} id="academicCard" data-side="back" onClick={handleDeleteButton}>Delete</button>
          <input type='file' accept='.jpg,.jpeg' multiple={false} onChange={handleFileUploadChange} ref={academicCardBackFileInputRef} id='academicCardBackFile'/>
          <button className={style.uploadBtn} id="academicCard" data-side="back" onClick={uploadImageButton} >Upload</button>
        </div>
      </div>  
      <div className={style.verifyDropdown}>
        <button id={style.verifyButton} onClick={validateAcademicCard}>Checking Document</button>
      </div>
    </div>
  )
}

export default EditAcademicCard;