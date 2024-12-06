import style from '../../styling/ApplicantDashboard/SideBar.module.css';
import UDMLogo from '../../media/logo.png';
import AProfile from '../../media/applicantProfile.png';
import Schedule from '../../media/schedule.png';
import BatchResult from '../../media/batchResult.png';
import { FaFacebook, FaTwitter, FaGlobe } from "react-icons/fa";


const ApplicantDashboardSideBar = ({ADSlide, setADSlide}) => {

  return(
    <div className={`${style.sidebar}`}>
      <div className={`${style.title}`} onClick={()=> setADSlide(0)}>
      <img src={UDMLogo} alt="" onClick={()=> setADSlide(0)} />
        <label onClick={()=> setADSlide(0)}>Universidad de Manila</label>
      </div>
      <div className={`${style.itemList}`}>
        <ul>
          <li>
            <div className={`${style.item} ${ADSlide === 1 ? style.ADactive : ``}`} onClick={()=> setADSlide(1)}>
              <img src={AProfile} alt="" onClick={()=> setADSlide(1)} />  
              <button className={`${style.sideBarLinks}`} onClick={()=> setADSlide(1)}>Applicant Profile</button>
            </div>  
            <div className={`${style.depList}`}>
              <ul>
                <li>
                  <div className={`${style.item} ${ADSlide === 2 ? style.ADactive  : ``}`} onClick={()=> setADSlide(2)}><button id={`${style.depItem}`} onClick={()=> setADSlide(2)}>&bull; Edit Information</button></div>  
                </li>    
                <li>
                  <div className={`${style.item} ${ADSlide === 3 ? style.ADactive  : ``}`} onClick={()=> setADSlide(3)}><button id={`${style.depItem}`} onClick={()=> setADSlide(3)}>&bull; Edit Document</button></div>  
                </li>            
              </ul>
            </div>
          </li>
          <li>
              <div className={`${style.item}  ${ADSlide === 4 ? style.ADactive  : ``}`} onClick={()=> setADSlide(4)}>
                <img src={Schedule} alt="" onClick={()=> setADSlide(4)} />
                <button className={`${style.sideBarLinks}`} onClick={()=> setADSlide(4)}>Scheduling</button>
              </div>
              <div className={`${style.depList}`}>
              <ul>
                <li>
                  <div className={`${style.item} ${ADSlide === 5 ? style.ADactive  : ``}`} onClick={()=> setADSlide(5)}><button id={`${style.depItem}`} onClick={()=> setADSlide(5)}>&bull; Document Submission</button></div>  
                </li>    
                <li>
                  <div className={`${style.item} ${ADSlide === 6 ? style.ADactive  : ``}`} onClick={()=> setADSlide(6)}><button id={`${style.depItem}`} onClick={()=> setADSlide(6)}>&bull; UDMCAT Schedule</button></div>  
                </li>            
              </ul>
            </div>
          </li>
          <li>
              <div className={`${style.item} ${ADSlide === 7 ?style.ADactive : ``}`} onClick={()=> setADSlide(7)}>
                <img src={BatchResult} alt="" onClick={()=> setADSlide(7)} /> 
                <button className={`${style.sideBarLinks}`} onClick={()=> setADSlide(7)}>UDMCAT batch result</button>
              </div>
          </li>
        </ul>
        <div className={style.socialMedia}>
          <div className={style.udmLinks}>
            <FaFacebook />
            <p>Universidad de Manila</p>
          </div>
          <div className={style.udmLinks}>
            <FaTwitter />
            <p>@OfficialUDMla</p>
          </div>
          <div className={style.udmLinks}>
            <FaGlobe /> 
            <p>UDM Portal</p>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default ApplicantDashboardSideBar;