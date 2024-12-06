import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import style from '../../styling/RegistrarAndAdmin/Dashboard.module.css';
import UserSearch from './Registrar/UserSearch';
import PendingRegistrarAccounts from './AdminAccount/ReviewPendingRegistrarAccounts';
import CreateExaminationDetails from './AdminAccount/CreateExaminationDetails';
import ScheduleSearch from './Registrar/RegistrarScheduleSearch';
import RegistrarExamScheduling from './Registrar/RegistrarExamScheduling';
import ExaminationManagement from './Registrar/RegistrarManageExamination';
import WelcomeToDashboard from './Registrar/welcome';
import ComingSoon from './ComingSoon';
import RegistrarProfile from './Registrar/RegistrarProfile';
import RegistrarEditInfo from './Registrar/RegistrarEditInfo';


const RegistrarAndAdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboardContent, setDashboardContent] = useState(0);
  const [change, setChange] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [regProfileData, setRegProfileData] = useState();
  useEffect(()=>{
    const registrarDataFetch = async () => {
      try{
        const response = await fetch('/api/getRegProfile', {
          method: 'POST',
          credentials: 'include',
        })
        if(response.ok) {
          const data = await response.json();
          setRegProfileData(data.user);
        }
        else if (response.status === 401){
          alert("You are not authorized to be here, please do the login process.")
          navigate('/registrar-landing-page');
        } 
        else {
          const data = await response.json();
          alert(data.message)
        }
      } catch (e) {
        alert('Something went wrong with getting the user data.')
        console.log(e);
      }
    }
    registrarDataFetch();
  }, [change])
  if (!regProfileData) {
    return "Loading";
  }
  return (
    <div className={style.dashboardContainer}>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} regProfileData={regProfileData} setDashboardContent={setDashboardContent}  />

      {isSidebarOpen && (
        <div className={`${style.backdrop} ${isSidebarOpen ? style.slideIn : style.slideOut}`} onClick={toggleSidebar}></div>
      )}

      <div className={style.content}>
        {dashboardContent === 0 ? <WelcomeToDashboard regProfileData={regProfileData} />: null}
        {dashboardContent === 1 ? <RegistrarProfile regProfileData={regProfileData} />: null}
        {dashboardContent === 2 ? <RegistrarEditInfo regProfileData={regProfileData} setChange={setChange}/> : null}
        {dashboardContent === 3 ? <UserSearch />: null}
        {dashboardContent === 4 ? <ScheduleSearch />: null}
        {dashboardContent === 5 ? <RegistrarExamScheduling />: null}
        {dashboardContent === 6 ? <ExaminationManagement />: null}
        {dashboardContent === 7 ? <CreateExaminationDetails />: null}
        {dashboardContent === 8 ? <PendingRegistrarAccounts />: null}
        {dashboardContent === 100 ? <ComingSoon />: null}

      </div>
    </div>
  );
};

export default RegistrarAndAdminDashboard;
