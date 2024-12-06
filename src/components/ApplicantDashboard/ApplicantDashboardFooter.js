import style from '../../styling/ApplicantDashboard/ApplicantDashboardFooter.module.css'

const ApplicantDashboardFooter = () => {
  return(
    <div className={`${style.UniversalFooter}`}>
      <p>&copy; {new Date().getFullYear()}&nbsp; Universidad de Manila | Contact Us | Privacy Policy | Help Center</p>
    </div>
  );
}

export default ApplicantDashboardFooter;