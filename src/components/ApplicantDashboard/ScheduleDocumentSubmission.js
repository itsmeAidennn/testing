import style from '../../styling/ApplicantDashboard/ScheduleDocumentSubmission.module.css';
import React, { useState, useEffect } from 'react';

const ScheduleDocumentSubmission = () => {
  const [verificationSummary, setVerificationSummary] = useState({
    nullStatus: [],
    trueStatus: [],
    verifiedStatus: []
  });
  const [messageFromTheEnd, setMessageFromTheEnd] = useState('');
  const [applicantSchedule, setApplicantSchedule] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/scheduleDocumentSubmission', {
          method: 'POST',
          credentials: 'include'
        });

        if (!response.ok) throw new Error('Failed to fetch schedule');

        const data = await response.json();

        setMessageFromTheEnd(data.message || 'No message provided');
        setApplicantSchedule(data.scheduleDates || []);
        setVerificationSummary(data.data || {
          nullStatus: [],
          trueStatus: [],
          verifiedStatus: []
        });
      } catch (error) {
        console.error('Error fetching schedule:', error);
        setMessageFromTheEnd('Error fetching your schedule.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const formatDate = (isoDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(isoDate).toLocaleDateString('en-US', options);
  };

  const summaryContent = (
    <div className={style.documentSubmission}>
      <div className={style.documentSummaryBox}>
        <h2>Document Verification Summary:</h2>
        <div className={style.documentSummary}>
          <div>
            <h3>Pending System Checking:</h3>
            {verificationSummary.nullStatus.length > 0 ? (
              <ul>
                {verificationSummary.nullStatus.map((doc, index) => (
                  <li key={index}>- {doc}</li>
                ))}
              </ul>
            ) : (
              <p>All documents have been reviewed.</p>
            )}
          </div>

          <div>
            <h3>Documents checked by the system:</h3>
            {verificationSummary.trueStatus.length > 0 ? (
              <ul>
                {verificationSummary.trueStatus.map((doc, index) => (
                  <li key={index}>- {doc}</li>
                ))}
              </ul>
            ) : (
              <p>Documents that are checked only by the system will be displayed here.</p>
            )}
          </div>

          <div>
            <h3>Fully Verified:</h3>
            {verificationSummary.verifiedStatus.length > 0 ? (
              <ul>
                {verificationSummary.verifiedStatus.map((doc, index) => (
                  <li key={index}>- {doc}</li>
                ))}
              </ul>
            ) : (
              <p>No documents are Verified by the Registrar yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            {summaryContent}
            {messageFromTheEnd && (
              <div className={style.messageBox}>
                <p>{messageFromTheEnd}</p>
              </div>
            )}
            {applicantSchedule.length > 0 ? (
              <>
                <p>Expect an email of response within the following days:</p>
                <ul>
                  {applicantSchedule.map((date, index) => (
                    <li key={index}>{formatDate(date)}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No schedule available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ScheduleDocumentSubmission;
