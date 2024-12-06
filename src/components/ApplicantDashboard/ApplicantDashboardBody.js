import style from '../../styling/ApplicantDashboard/ApplicantDashboardBody.module.css'
import ApplicantDashboardContentBox from './ApplicantDashboardContentBox';

const ApplicantDashboardBody = ({userData, applicantDocuments, setChange, ADSlide}) => {
  return (
    <div className={`${style.ApplicantDashboardBody}`}>
      <ApplicantDashboardContentBox userData={userData} applicantDocuments={applicantDocuments} setChange={setChange} ADSlide={ADSlide} />
    </div>
  )
}

export default ApplicantDashboardBody;