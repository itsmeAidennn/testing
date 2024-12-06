import style from '../../styling/ApplicantDashboard/ApplicantDashboardSettings.module.css';
import {useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function AppliantDashboardSettings(){
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
        navigate('/');
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
    return(
        <div className={`${style.flex} ${style['flex-col']} ${style.profiletab}`}>
                <ul>
                    <li>
                        <div className={`${style.profiletabList}`}>
                            <a href="#">Upload Documents</a>
                        </div>
                    </li>
                    <li>
                    <div className={`${style.profiletabList}`}>
                            <a href="#">Review Documents</a>
                        </div>
                    </li>
                    <li>
                    <div className={`${style.profiletabList}`}>
                            <a href="#">Schedule</a>
                        </div>
                    </li>
                    <li>
                    <div className={`${style.profiletabList}`}>
                            <button onClick={handleLogout} >Logout</button>
                        </div>
                    </li>
                </ul>
        </div>
    );
}
export default AppliantDashboardSettings;