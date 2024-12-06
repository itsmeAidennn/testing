import style from '../../../styling/LandingPage/HomeSection/VerifyEmail.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('Waiting...');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/verify-email/${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (data.success) {
          setMessage('Email verified successfully! This tab will close in 5 seconds...');
          startCountdown();
        } else {
          setMessage(`${data.message}`);
          startCountdown();
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        setMessage('An error occurred during email verification.');
        startCountdown();
      }
    };

    const startCountdown = () => {
      let countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(countdownInterval);
            window.close();
          }
          return prevCountdown - 1;
        });
      }, 1000);
    };

    verifyEmail();
  }, [token]);

  return (
    <div className={style.VerifyEmailContainer}>
      <h2>Email Verification</h2>
      <p>{message}</p>
      {countdown <= 5 && countdown > 0 && <p>Closing in {countdown}...</p>}
    </div>
  );
};

export default VerifyEmail;
