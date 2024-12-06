import { React } from 'react';
import style from '../../styling/ApplicantDashboard/WelcomeToDashboard.module.css'

const ViewBatchResult = ({ userData }) => {

  return (
    <>
      {userData.examStatus === null ? 
        <p>There is no result yet.</p>
        :
        null
      }
      {userData.examStatus === "Pass" ? 
        <p>Congratualtions you passed the exam.</p>
        :
        null
      }
      {userData.examStatus === 'Fail' ? 
        <p>We regret to say that you didn't reach the minimum requirement to pass the UDMCAT.</p>
        :
        null
      }
    </>
  )
}

export default ViewBatchResult;