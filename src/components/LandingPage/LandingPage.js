import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './HomeSection/Home';
import Chatbot from '../Chatbot/Chatbot'
import SecondSection from './SecondSection/SecondSection';
import UpdatesSection from './UpdatesSection/UpdatesSection';
import FeedbackSection from './FeedbackSection/Feedback';
import UDMCATResultLookup from './UDMCATResultLookup';


const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkSessionStatus = async () => {
      try{
        const response = await fetch('/api/sessionChecker', {
          method: 'POST',
          credentials: 'include',
        })
        if(response.ok) {
          const data = await response.json();
          if(data.isAuthenticated){
            navigate('/Dashboard');
          };
        }
      } catch (e) {
        alert("Couldn't Check the user authenticity for some reason")
        console.log(e);
      }
    }
    checkSessionStatus();
  }, []);
  return (
    <>
      <Home />
      <SecondSection />
      <UpdatesSection />
      <FeedbackSection /> 
      <Chatbot />
      <UDMCATResultLookup />
      {/* <Footer /> */}
    </>
  )
}

export default LandingPage;