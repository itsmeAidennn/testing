import { React } from 'react';
import style from '../../styling/ApplicantDashboard/WelcomeToDashboard.module.css';

const WelcomeToDashboard = () => {
  return (
    <p className={`${style.welcomeText}`}> Welcome to the UDM Admission System!</p>
  )
}

export default WelcomeToDashboard; 