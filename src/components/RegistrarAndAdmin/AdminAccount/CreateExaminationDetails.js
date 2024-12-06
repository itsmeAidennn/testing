import React, { useState } from 'react';
import RoomManagement from './RoomManagement';
import TimeSlotManagement from './TimeSlotManagement';
import ExamDatesManagement from './DateOfExamManagement';
import style from '../../../styling/RegistrarAndAdmin/ExaminationManagement.module.css';

const ExaminationManagement = () => {
  const [toggleState, setToggleState] = useState(1); 

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className={style.ExamManagementContainer}>
      <h1>Examination Management</h1>
    <div className={style.ExamManagementBox}>
      
      <div className={style.blockTabs}>
        <button
          className={toggleState === 1 ? style.TABSactive : style.tabs}
          onClick={() => toggleTab(1)}
        >
          Rooms
        </button>
        <button
          className={toggleState === 2 ? style.TABSactive : style.tabs}
          onClick={() => toggleTab(2)}
        >
          Time Slots
        </button>
        <button
          className={toggleState === 3 ? style.TABSactive : style.tabs}
          onClick={() => toggleTab(3)}
        >
          Examination Dates
        </button>
      </div>

      <div className={style.contentTabs}>
        {toggleState === 1 && (
          <div className={style.CONTENTactive}>
            <RoomManagement />
          </div>
        )}
        {toggleState === 2 && (
          <div className={style.CONTENTactive}>
            <TimeSlotManagement />
          </div>
        )}
        {toggleState === 3 && (
          <div className={style.CONTENTactive}>
            <ExamDatesManagement />
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default ExaminationManagement;
