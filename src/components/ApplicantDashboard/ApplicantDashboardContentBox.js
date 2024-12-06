import style from '../../styling/ApplicantDashboard/ApplicantDashboardContentBox.module.css';
import WelcomeToDashboard from './WelcomeToDashbobard';
import ADApplicantProfile from './ADApplicantProfile';
import ADEditInformation from './ADEditInformation';
import ADEditDocuments from './ADEditDocuments';
import ScheduleDocumentSubmission from './ScheduleDocumentSubmission';
import ViewBatchResult from './ADViewBatchResults';
import UDMCATSchedule from './UDMCATSchedule';

const ApplicantDashboardContentBox = ({userData, applicantDocuments, setChange, ADSlide}) => {
  return (
    <div className={`${style.ApplicantDashboardContentBox}`}>
      {ADSlide === 0 ? <WelcomeToDashboard /> : null}
      {ADSlide === 1 ? <ADApplicantProfile userData={userData} applicantDocuments={applicantDocuments} /> : null}
      {ADSlide === 2 ? <ADEditInformation userData={userData} setChange={setChange} /> : null}
      {ADSlide === 3 ? <ADEditDocuments userData={userData} applicantDocuments={applicantDocuments} setChange={setChange} /> : null}
      {ADSlide === 5 ? <ScheduleDocumentSubmission /> : null}
      {ADSlide === 6 ? <UDMCATSchedule /> : null}
      {ADSlide === 7 ? <ViewBatchResult userData={userData} /> : null}
    </div>
  )
}

export default ApplicantDashboardContentBox;