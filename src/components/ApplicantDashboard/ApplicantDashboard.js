import { React, useState, useEffect} from 'react';
import ApplicantDashboardSideBar from "./SideBar";
import ApplicantDashboardHeader from "./ApplicantDashboardHeader";
import ApplicantDashboardBody from "./ApplicantDashboardBody";
import ApplicantDashboardFooter from "./ApplicantDashboardFooter";
import style from   '../../styling/ApplicantDashboard/ApplicantDashboard.module.css';
import { useNavigate } from 'react-router-dom';

const ApplicantDashboard = () => {
  const [change, setChange] = useState(false);
  const [userData, setUserData] = useState(null);
  const [applicantDocuments, setApplicantDocuments] = useState(null);
  const [ADSlide, setADSlide] = useState(0);
  const navigate = useNavigate();
  useEffect(()=>{
    const userDataFetch = async () => {
      try{
        const response = await fetch('/api/profileInformations', {
          method: 'POST',
          credentials: 'include',
        })
        if(response.ok) {
          const data = await response.json();
          setUserData(data.user);
        }
        else if (response.status === 401){
          alert("You are not authorized to be here, please do the login process.")
          navigate('/');
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
    userDataFetch();
  }, [change])

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const response = await fetch('/api/profileImages', {
          method: 'POST',
        });
        if(response.ok) {
          const data = await response.json();
          setApplicantDocuments(data.images);
        }
        else if (response.status === 401){
          alert("You are not authorized to be here, please do the login process.")
          navigate('/');
        } 
        else{
          const data = await response.json();
          alert(data.message)
        }
      }
      catch(e){
        console.log(e);
        alert('Something went wrong with getting the documents');
      }
    }
    getDocuments();
  },[change]);

  return (
    <div className={`${style.DashboardBody}`}>
      <ApplicantDashboardSideBar ADSlide={ADSlide} setADSlide={setADSlide} />
      <div className={`${style.DashboardBodyRight}`}>
        <ApplicantDashboardHeader ADSlide={ADSlide} />
        <ApplicantDashboardBody userData={userData} applicantDocuments={applicantDocuments} setChange={setChange} ADSlide={ADSlide} />
        <ApplicantDashboardFooter />
      </div>
    </div>
  )
}

export default ApplicantDashboard;