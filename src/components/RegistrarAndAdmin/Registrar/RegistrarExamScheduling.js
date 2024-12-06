import style from '../../../styling/RegistrarAndAdmin/RegistrarExamScheduling.module.css';
import Swal from 'sweetalert2'
import React, { useState, useEffect } from "react";

const ExaminationInfo = () => {
  const [examDates, setExamDates] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentID, setStudentID] = useState();
  const [slotLeft, setSlotLeft] = useState(null);

  const [formData, setFormData] = useState({
    date: "",
    room: "",
    timeSlot: "",
    studentID: "",
  });

  const [roomCapacities, setRoomCapacities] = useState({});

  const fetchExamDates = async () => {
    try {
      const response = await fetch("/api/reg-get-exam-dates");
      const data = await response.json();
      setExamDates(data.examDates);
    } catch (error) {
      console.error("Error fetching exam dates:", error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await fetch("/api/reg-get-examination-rooms");
      const data = await response.json();
      setRooms(data.rooms);

      const capacities = {};
      data.rooms.forEach((room) => {
        capacities[room.roomNumber] = room.capacity;
      });
      setRoomCapacities(capacities);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const fetchTimeSlots = async () => {
    try {
      const response = await fetch("/api/reg-get-time-slots");
      const data = await response.json();
      setTimeSlots(data.timeSlots);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/reg-get-users");
      const data = await response.json();
      setStudents(data.users);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ name: '', id: '', gender: '', strand: '' });

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams({
        ...filters,
        page,
        limit: 5,
      });

      const response = await fetch(`/api/users?${params.toString()}`);
      const data = await response.json();

      if (page === 1) {
        setUsers(data.users);
      } else {
        setUsers((prev) => [...prev, ...data.users]);
      }
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const checkSlotLeft = async () => {
    if (!formData.date || !formData.room || !formData.timeSlot) {
      alert('Please select a date, room, and time slot first.');
      return;
    }

    try {
      const response = await fetch(
        `/api/checkSlotLeft?date=${formData.date}&room=${formData.room}&timeSlot=${formData.timeSlot}`
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch slot information');
      }
  
      const data = await response.json();
      setSlotLeft(data.slotsLeft);
    } catch (error) {
      console.error('Error checking slot availability:', error);
      alert(error.message);
    }
  }

  const handleGiveSchedule = async () => {
    try {
      const response = await fetch("/api/giveSchedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      else {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Schedule assigned successfully.",
          showConfirmButton: false,
          timer: 1500
        });
     }
      setFormData({ date: "", room: "", timeSlot: "", studentID: "" });
    } catch (error) {
      console.error("Error assigning schedule:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    if (formData.date && formData.room && formData.timeSlot) {
      checkSlotLeft();
    }
    setSlotLeft(null);
  }, [formData.date, formData.room, formData.timeSlot]);

  useEffect(() => {
    fetchExamDates();
    fetchRooms();
    fetchTimeSlots();
    fetchStudents();
  }, []);

  return (
    <div className={style.schedulingContainer}>
      <h2>Examination Schedule Management</h2>
      <div className={style.schedulingBox}>
        <div className={style.schedulingContainer1}> 
          <div className={style.giveExamDate}>
            <h1>Preview</h1>
            <div className={style.giveDateList}>
              <p>Date: </p>
              <p>{formData.date}</p>
            </div>
            <div className={style.giveDateList}>
              <p>Room: </p>
              <p>{formData.room}</p>
            </div>
            <div className={style.giveDateList}>
              <p>TimeSlot: </p>
              <p>{formData.timeSlot}</p>
            </div>
            <div className={style.giveDateList}>
              <p>Student ID: </p>
              <p>{studentID}</p>
            </div>
            <div className={style.giveDateList}>
              <p>Slot Left: </p>
              {slotLeft ? <p>{slotLeft}</p> : null}
            </div>
            <div className={style.btnGiveSched}>
              {formData.date && formData.room && formData.timeSlot && formData.studentID && (
                <button className={style.btn} onClick={handleGiveSchedule}>Give Schedule</button>
              )}
            </div>
          </div>
          <div className={style.setExamDate}>
            <div className={style.setDateList}>
              <p>Date:</p>
              <select
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              >
                <option value="">Select a date</option>
                {examDates.map((date) => (
                  <option key={date._id} value={date.date}>
                    {new Date(date.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </option>
                ))}
              </select>
            </div>

            <div className={style.setDateList}>
              <p>Room:</p>
              <select
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                required
              >
                <option value="">Select a room</option>
                {rooms.map((room) => (
                  <option key={room._id} value={room.roomNumber}>
                    {room.roomNumber} (Capacity: {roomCapacities[room.roomNumber]})
                  </option>
                ))}
              </select>
            </div>

            <div className={style.setDateList}>
              <p>Time Slot:</p>
              <select
                value={formData.timeSlot}
                onChange={(e) =>
                  setFormData({ ...formData, timeSlot: e.target.value })
                }
                required
              >
                <option value="">Select a time slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot._id} value={`${slot.startTime}-${slot.endTime}`}>
                    {slot.startTime} - {slot.endTime}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>       
        <div className={style.schedulingContainer2}>
            <h1>List of Applicants</h1>
            
            <div className={style.searchWrapper}>
              <div className={style.leftWrapper}> 
                <input
                  type="text"
                  name="name"
                  placeholder="Search by name"
                  value={filters.name}
                  onChange={handleFilterChange}
                />

                <input
                  type="text"
                  name="id"
                  placeholder="Search by ID"
                  value={filters.id}
                  onChange={handleFilterChange}
                />
              </div>
              <div className={style.rightWrapper}>
                <select name="gender" value={filters.gender} onChange={handleFilterChange}>
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <select name="strand" value={filters.strand} onChange={handleFilterChange}>
                  <option value="">All Strands</option>
                  <option value="HUMMS">HUMMS</option>
                  <option value="ABM">ABM</option>
                  <option value="GAS">GAS</option>
                  <option value="ICT">ICT</option>
                  <option value="STEM">STEM</option>
                </select>
              </div>
            </div>
              <div className={style.schedulingTable}>
                <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Strand</th>
                    <th>Applicant ID</th>
                  </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                  <tr
                  key={user.uniqueID} onClick={() => {
                    setStudentID(user.uniqueID)
                    setFormData({...formData, studentID: user._id})
                  }} style={{ cursor: 'pointer' }}
                  >
                    <td>{user.firstName} {user.middleName} {user.lastName}</td>
     
                    <td>{user.gender}</td>
                    <td>{user.strand}</td>
                    <td>{user.uniqueID}</td>
                  </tr>
                  ))}
                </tbody>
                </table>
              </div>
            

            {page < totalPages && (
              <button id={style.tableMore} onClick={() => setPage((prev) => prev + 1)}>Load More</button>
            )}

          </div>
        </div>
    </div>
  );
};

export default ExaminationInfo;
