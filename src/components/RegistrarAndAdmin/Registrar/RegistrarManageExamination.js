import React, { useState, useEffect } from 'react';
import Modal from '../../CustomModal';
import style from '../../../styling/RegistrarAndAdmin/RegistrarManageExamination.module.css';
import Swal from 'sweetalert2'

const ScheduleSearch = () => {
  const [schedules, setSchedules] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ date: '', room: '', startTime: '', endTime: '' });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);
  const [deleteInput, setDeleteInput] = useState('');
  const [roomInput, setRoomInput] = useState('');

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [students, setStudents] = useState([]);

  const fetchSchedules = async () => {
    try {
      const params = new URLSearchParams({
        ...filters,
        page,
        limit: 5,
      });

      const response = await fetch(`/api/exam-schedules?${params.toString()}`);
      const data = await response.json();

      if (page === 1) {
        setSchedules(data.schedules);
      } else {
        setSchedules((prev) => [...prev, ...data.schedules]);
      }
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [page, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1); 
  };

  const handleDeleteClick = (schedule) => {
    setScheduleToDelete(schedule);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setScheduleToDelete(null);
    setDeleteInput('');
    setRoomInput('');
  };

  const openStudentModal = async (schedule) => {
    setSelectedSchedule(schedule);
    try {
      const response = await fetch(`/api/exam-schedules/${schedule._id}/students`);
      const data = await response.json();
      setStudents(data);
      setIsStudentModalOpen(true);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const closeStudentModal = () => {
    setIsStudentModalOpen(false);
    setSelectedSchedule(null);
    setStudents([]);
  };

  const confirmDelete = async () => {
    if (
      deleteInput.toLowerCase() === 'delete' &&
      roomInput === scheduleToDelete.room
    ) {
      try {
        const response = await fetch(`/api/exam-schedules/${scheduleToDelete._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setSchedules((prev) =>
            prev.filter((schedule) => schedule._id !== scheduleToDelete._id)
          );
          // alert('Schedule deleted successfully.');
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Examination schedule successfully deleted.",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          alert('Failed to delete schedule.');
        }
      } catch (error) {
        console.error('Error deleting schedule:', error);
      }
      setIsDeleteModalOpen(false);
      setScheduleToDelete(null);
      setDeleteInput('');
      setRoomInput('');
    } else {
      alert('Please type "delete" and the correct room number to confirm.');
    }
  };

  const handleRemoveStudent = async (scheduleID, studentID) => {
    if (!window.confirm("Are you sure you want to remove this student?")) {
      return;
    }

    try {
      const response = await fetch("/api/removeStudentFromSchedule", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scheduleID: scheduleID,
          studentID: studentID,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data.error);
        // alert("Couln't remove the student at the moment")
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Couln't remove the student at the moment."
        });
      }

      setStudents((prev) => prev.filter((student) => student._id !== studentID));
      // alert("Student removed successfully!");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Student successfully removed.",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error("Error removing student:", error);
      alert(error.message);
    }
  };
  
  return (
    <div className={style.manageExamContainer}>
      <h1>Search Exam Schedules</h1>
      <div className={style.manageExamBox}>
      <div className={style.manageExamFilter}>
        <div className={style.leftWrapper}> 
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="room"
            placeholder="Search by room"
            value={filters.room}
            onChange={handleFilterChange}
          />
        </div>
        <div className={style.rightWrapper}>
          <div className={style.label}><p>Start Time:</p></div>
          <input
            type="time"
            name="startTime"
            value={filters.startTime}
            onChange={handleFilterChange}
          />
          <div className={style.label}><p>End Time:</p></div>
          <input
            type="time"
            name="endTime"
            value={filters.endTime}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className={style.lowerBoxContainer}>
        {schedules.map((schedule) => (
          <div className={style.schedCards}>
          <div key={schedule._id} onClick={() => openStudentModal(schedule)}>
            <h3>Date: {new Date(schedule.date).toLocaleDateString()}</h3>
            <p>Room: {schedule.room}</p>
            <p>Time Slot: {schedule.timeSlot}</p>
            <p>Students Enrolled: {schedule.students.length}</p>
          </div>
            <button className={style.cardDeletebtn} onClick={() => handleDeleteClick(schedule)}>Delete</button>
          </div>
        ))}
      </div>
      {page < totalPages && (
        <button onClick={() => setPage((prev) => prev + 1)}>Load More</button>
      )}
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        {scheduleToDelete && (
          <div className={style.modalDelete}>
            <h2>Are you sure you want to delete this schedule?</h2>
            <p>Room: {scheduleToDelete.room}</p>
            <p>Time Slot: {scheduleToDelete.timeSlot}</p>
            <p>Date: {new Date(scheduleToDelete.date).toLocaleDateString()}</p>
            <p>
              Type <strong>"delete"</strong> and the room number to confirm.
            </p>
            <div className={style.input}>
              <input
                type="text"
                placeholder="Type 'delete'"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Room Number"
                value={roomInput}
                onChange={(e) => setRoomInput(e.target.value)}
              />
            </div>
            <div className={style.btns}>
              <button className={style.ConfirmDeleteBtn} onClick={confirmDelete}>Confirm Delete</button>
              <button className={style.CancelBtn} onClick={closeDeleteModal}>Cancel</button>
            </div>
            <p>Note: All of the students assigned to this schedule will be removed as well, leaving them with no examination schedule.</p>
          </div>
        )}
      </Modal>
      <Modal isOpen={isStudentModalOpen} onClose={closeStudentModal}>
        {selectedSchedule && (
          <div className={style.modalBox}>
            <h2>Students Assigned to Schedule</h2>
            <p><strong>Room:</strong> {selectedSchedule.room}</p>
            <p><strong>Date:</strong> {new Date(selectedSchedule.date).toLocaleDateString()}</p>
            <p><strong>Time Slot:</strong> {selectedSchedule.timeSlot}</p>
            <ul className={style.studentsList}>
              {students.length > 0 ? (
                students.map((student) => (
                  <div className={style.studentsListBox}>
                    <li key={student._id}>
                      {student.firstName} {student.lastName} - {student.uniqueID}
                      <button className={style.btnRemove} onClick={() => handleRemoveStudent( selectedSchedule._id, student._id)}>Remove</button>
                    </li>
                    {/* <button className={style.btnRemove} onClick={() => handleRemoveStudent( selectedSchedule._id, student._id)}>Remove</button> */}
                  </div>
                  
                ))
              ) : (
                <p>No students assigned to this schedule.</p>
              )}
            </ul>
            {/* <button onClick={closeStudentModal}>Close</button> */}
          </div>
        )}
      </Modal>
      </div>
    </div>
  );
};

export default ScheduleSearch;
