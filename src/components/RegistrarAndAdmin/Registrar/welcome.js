import { React } from 'react';
import style from '../../../styling/RegistrarAndAdmin/Welcome.module.css';
import ApplicantsPerDept  from '../../DataAnalytics/ApplicantsPerDept';
import ApplicantsPerStrand  from '../../DataAnalytics/ApplicantsPerStrand';
import DistrictsCount  from '../../DataAnalytics/DistrictsCount';
import NumberOfTotalApplicants  from '../../DataAnalytics/NumberOfTotalApplicants';
import PublicOrPrivate  from '../../DataAnalytics/PublicOrPrivate';
import ProfilePic from '../../../media/img1.jpg'

const WelcomeToDashboard = ({regProfileData}) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const lastName = capitalizeFirstLetter(regProfileData.firstName);
  return (
    <div className={`${style.container}`}>
        <div className={style.containerHeader}>
          <div className={style.profileCard}>
          <img src={`data:${regProfileData.profilePic.type};base64,${regProfileData.profilePic.data}`} alt="Profile"  />
            <div className={style.profile}>
              <div className={style.profileName}>
                <p className={`${style.welcomeText}`}> Good Day, &nbsp; <a href="#">  {lastName}</a></p>
                
              </div>
              <p>{regProfileData.isAdmin ? "Admin" : "Registrar"}</p>
            </div>
          </div>
          <div className={style.totalApplicants}>
            <NumberOfTotalApplicants />
          </div>
        </div>
        
        <div className={style.charts}>
          
          <div className={style.graphs}>
            <div className={style.chart}>
              <ApplicantsPerDept />
            </div>
            <div className={style.chart}>
              <ApplicantsPerStrand />
            </div>
            <div className={style.chart}>
              <PublicOrPrivate />
            </div>
            <div className={style.chart}>
            <DistrictsCount />
            </div>
          </div>
        </div>
    </div>
    
  )
}

export default WelcomeToDashboard; 