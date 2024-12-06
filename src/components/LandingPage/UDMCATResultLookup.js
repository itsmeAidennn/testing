import React, { useState } from 'react';
import style from '../../styling/LandingPage/ExamResultLookup.module.css'; 
const ExamResultLookup = () => {
  const [uniqueID, setUniqueID] = useState('');
  const [examResult, setExamResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!uniqueID) {
      setError('Please enter a valid Unique ID.');
      setExamResult(null);
      return;
    }

    try {
      setError('');
      const response = await fetch(`/api/exam-result/${uniqueID}`);
      if (!response.ok) {
        throw new Error('Unable to fetch exam result.');
      }

      const data = await response.json();
      setExamResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      setExamResult(null);
    }
  };

  return (
    <div className={style.examResultContainer}>
      <h1 style={{ color: "White" }}>Exam Result Lookup</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="text"
          placeholder="Enter Unique ID"
          value={uniqueID}
          onChange={(e) => setUniqueID(e.target.value)}
          className={style.input}
        />
        <button type="submit" className={style.button} style={{ color: "White" }} >
          Submit
        </button>
      </form>
      {error && <p className={style.error}>{error}</p>}
      {examResult && (
        <div className={style.result}>
          <h2 style={{ color: "White" }}>Exam Result</h2>
          <p style={{ color: "White" }}><strong>Name:</strong> {examResult.firstName} {examResult.middleName} {examResult.lastName}</p>
          <p style={{ color: "White" }}><strong>Unique ID:</strong> {examResult.uniqueID}</p>
          <p style={{ color: "White" }}><strong>Status:</strong> {examResult.examStatus || 'In Progress'}</p>
        </div>
      )}
    </div>
  );
};

export default ExamResultLookup;
