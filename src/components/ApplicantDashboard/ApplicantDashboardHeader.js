import style from '../../styling/ApplicantDashboard/ApplicantDashboardHeader.module.css';
import { React, useState } from 'react';
import Menu from '../../media/menu2.png';
import ProfileIcon from '../../media/profile.png';
import ApplicantDashboardSettings from './ApplicantDashboardSettings';
import { FaRegUserCircle } from "react-icons/fa";

const ApplicantDashboardHeader = ({ ADSlide }) => {
  const [show,setShow] = useState(false)
  return (
    <div className={`${style.DashboardHeader}`}>
      {/* <img src={Menu} alt="" className={`${style.headerLogo}`} /> */}
      {ADSlide === 1 ? (<p>Applicant Profile</p>) : null}
      {ADSlide === 2 ? (<p>Edit Profile Information</p>) : null}
      {ADSlide === 3 ? (<p>Edit Documents</p>) : null}
      {ADSlide === 5 ? (<p>Schedule Document Submission</p>): null}
      {ADSlide === 6 ? (<p>Schedule</p>) : null}
      {ADSlide === 7 ? (<p>View UDMCAT Result</p>) : null}
      <div className={`${style.headerNavigation}`}>            
        {/* <img src={ProfileIcon} alt="" className={`${style.headerImg}`} onClick = {() => setShow(!show)} /> */}
        <FaRegUserCircle className={style.profileIcon} onClick = {() => setShow(!show)}/>
      </div>
      {
        show? <ApplicantDashboardSettings />:null
      }
    </div>
  )
}

export default ApplicantDashboardHeader;