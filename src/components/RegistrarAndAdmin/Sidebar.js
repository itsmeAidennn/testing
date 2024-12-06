import { React, useState, useEffect } from 'react';
import style from '../../styling/RegistrarAndAdmin/RegistrarAndAdminSidebar.module.css';
import UDMLogo from '../../media/logo.png';
import AProfile from '../../media/applicantProfile.png';
import Schedule from '../../media/schedule.png';
import Pending from '../../media/pendingIcon.png';
import BatchResult from '../../media/batchResult.png';
import logoutBtn from '../../media/logoutBtn.png';
import Menu from '../../media/menu2.png';
import {useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ApplicantDashboardSideBar = ({ isSidebarOpen, toggleSidebar, setDashboardContent, regProfileData }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        // alert(data.message);
        Swal.fire({
          icon: "success",
          title: "You’ve been logged out.",
          text: "Please log in again to access your account.",
        });
        navigate('/registrar-landing-page');
      }
      else {
        // alert("Something went really wrong.")
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
    catch (e){
      console.log(e);
      // alert("The server is not up, probably restarting.")
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "The server is not up, probably restarting.",
      });
    }
  };

  return (
    <div className={`${style.sidebar} ${isSidebarOpen ? style.slideLeftIn : style.slideRightOut}`}>
      <div className={style.title}>
        <img src={Menu} alt="" className={`${style.menuLogo}`} onClick={toggleSidebar} />
        <div className={style.homeDashboard} onClick={()=> setDashboardContent(0)}>
          <img src={UDMLogo} alt="" onClick={()=> setDashboardContent(0)} />
            <label onClick={()=> setDashboardContent(0)}>Universidad de Manila</label>
        </div>
      </div>
      <div className={style.itemList}>
        <ul>
          <li>
            {regProfileData.isAdmin === "Yes" ? 
              (<div className={style.item}>
                <img src={BatchResult} alt="Applicant Profile" />
                <button className={style.sideBarLinks} onClick={() => setDashboardContent(7)}>Create Examination Details</button>
              </div>)
              :
              null
            }
            {regProfileData.isAdmin === "Yes" ? 
              (<div className={style.item}>
                <img src={Pending} alt="Applicant Profile" />
                <button className={style.sideBarLinks} onClick={() => setDashboardContent(8)}>Review Pending Accounts</button>
              </div>)
              :
              null
            }
            {/* <div className={style.item}>
              <img src={BatchResult} alt="Applicant Profile" />
              <button className={style.sideBarLinks} onClick={() => setDashboardContent(7)}>Create Examination Details</button>
            </div>
            <div className={style.item}>
              <img src={Schedule} alt="Applicant Profile" />
              <button className={style.sideBarLinks} onClick={() => setDashboardContent(8)}>Review Pending Accounts</button>
            </div> */}
            <div className={style.item}>
              <img src={AProfile} alt="Applicant Profile" />
              <button className={style.sideBarLinks} onClick={() => setDashboardContent(1)}>Registrar Profile</button>
            </div>
            <div className={style.depList}>
              <ul>
                <li>
                  <div className={style.item}>
                    <button id={style.depItem} onClick={() => setDashboardContent(2)}>&bull; Edit Information</button>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className={style.item}>
              <img src={Schedule} alt="Scheduling" />
              <button className={style.sideBarLinks} onClick={() => setDashboardContent(3)}>Schedule Management</button>
            </div>
            <div className={style.depList}>
              <ul>
                <li>
                  <div className={style.item}>
                    <button id={style.depItem} onClick={() => setDashboardContent(4)}>&bull; Verify Documents</button>
                  </div>
                </li>
                <li>
                  <div className={style.item}>
                    <button id={style.depItem} onClick={() => setDashboardContent(5)}>&bull; Give Examination Schedule</button>
                  </div>
                </li>
                <li>
                  <div className={style.item}>
                    <button id={style.depItem} onClick={() => setDashboardContent(6)}>&bull; Examination Schedule</button>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className={`${style.buttonContainer}`}  onClick={() => handleLogout()}>
        <img src={logoutBtn} />
        <button className={`${style.logoutButton}`}>Logout</button>
      </div>
    </div>
  );
};

export default ApplicantDashboardSideBar;
