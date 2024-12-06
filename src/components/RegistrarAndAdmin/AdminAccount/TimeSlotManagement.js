import style from '../../../styling/RegistrarAndAdmin/Management.module.css';
import Swal from 'sweetalert2'
import React, { useState, useEffect } from 'react';

const TimeSlotManagement = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [timeSlotPage, setTimeSlotPage] = useState(1);
  const [timeSlotHasMore, setTimeSlotHasMore] = useState(true);
  const [timeSlotForm, setTimeSlotForm] = useState({ startTime: '', endTime: '' });
  const [timeSlotEditId, setTimeSlotEditId] = useState(null);
  const [timeSlotFormEdit, setTimeSlotFormEdit] = useState({ startTime: '', endTime: '' });

  const fetchTimeSlots = async (page) => {
    try {
      const response = await fetch(`/api/get-time-slots?page=${page}&limit=10`);
      if (!response.ok) throw new Error('Failed to fetch time slots');
      const data = await response.json();
      if (page === 1) {
        setTimeSlots(data.timeSlots);
      } else {
        setTimeSlots((prev) => [...prev, ...data.timeSlots]);
      }
      if (page >= data.totalPages) setTimeSlotHasMore(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const searchTimeSlots = async ({ startTime, endTime }) => {
    try {
      const params = new URLSearchParams({
        ...(startTime && { startTime }),
        ...(endTime && { endTime }),
      });
  
      const response = await fetch(`/api/search-time-slots?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch search results');
      const data = await response.json();
  
      setTimeSlots(data.timeSlots); 
      setTimeSlotHasMore(false); 
    } catch (error) {
      console.error(error.message);
    }
  };

  const formatTime12Hour = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; 
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const addTimeSlot = async () => {
    try {
      const response = await fetch('/api/add-time-slot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(timeSlotForm),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.error);
        return;
      }
      // alert(data.message);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Time successfully added.",
        showConfirmButton: false,
        timer: 1500
      });
      setTimeSlots((prev) => [data.savedTimeSlot, ...prev]);
      setTimeSlotForm({ startTime: '', endTime: '' });
    } catch (error) {
      console.error(error.message);
    }
  };

  const saveEditTimeSlot = async () => {
    try {
      const response = await fetch(`/api/edit-time-slot/${timeSlotEditId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(timeSlotFormEdit),
      });
      if (!response.ok) throw new Error('Failed to edit time slot');
      const updatedTimeSlot = await response.json();
      setTimeSlots((prev) =>
        prev.map((slot) => (slot._id === updatedTimeSlot._id ? updatedTimeSlot : slot))
      );
      setTimeSlotEditId(null);
      setTimeSlotFormEdit({ startTime: '', endTime: '' });
      // alert('Time slot updated successfully');
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You work has been saved.",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTimeSlot = async (id) => {
    try {
      const response = await fetch(`/api/delete-time-slot/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete time slot');
      setTimeSlots((prev) => prev.filter((slot) => slot._id !== id));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Time successfully deleted.",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchTimeSlots(timeSlotPage);
  }, [timeSlotPage]);

  return (
    <div className={style.RoomManagementContainer}>
      <form
        className={style.formFunctions}
        onSubmit={(e) => {
          e.preventDefault();
          addTimeSlot();
        }}
      >
        <span>Start: </span>
        <input
          type="time"
          name="startTime"
          placeholder="Start Time"
          value={timeSlotForm.startTime}
          onChange={(e) => setTimeSlotForm({ ...timeSlotForm, startTime: e.target.value })}
          required
        />
        <span> End: </span>
        <input
          type="time"
          name="endTime"
          placeholder="End Time"
          value={timeSlotForm.endTime}
          onChange={(e) => setTimeSlotForm({ ...timeSlotForm, endTime: e.target.value })}
          required
        />
        <button className={style.btnAdd} type="submit">Add Time Slot</button>
        <button
          className={style.btnSearch}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            searchTimeSlots({
              roomNumber: e.target.form.startTime.value,
              capacity: e.target.form.endTime.value,
            });
          }}
        >
          Search
        </button>
      </form>

      {timeSlots.length > 0 ? (
        <div className={style.cardsGrid}>
          {timeSlots.map((slot) => (
            <div key={slot._id}>
              {timeSlotEditId === slot._id ? (
                <div className={style.cardsEdit}>
                  <input
                    type="time"
                    value={timeSlotFormEdit.startTime}
                    onChange={(e) =>
                      setTimeSlotFormEdit({ ...timeSlotFormEdit, startTime: e.target.value })
                    }
                    required
                  />
                  <input
                    type="time"
                    value={timeSlotFormEdit.endTime}
                    onChange={(e) =>
                      setTimeSlotFormEdit({ ...timeSlotFormEdit, endTime: e.target.value })
                    }
                    required
                  />
                  <div className={style.btnsCardsEdit}>
                    <button id={style.btnCardsEditSave} onClick={saveEditTimeSlot}>Save</button>
                    <button
                      id={style.btnCardsEditCancel}
                      onClick={() => {
                        setTimeSlotEditId(null);
                        setTimeSlotFormEdit({ startTime: '', endTime: '' });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className={style.Cards}>
                  <p>{formatTime12Hour(slot.startTime)} - {formatTime12Hour(slot.endTime)}</p>
                  <div className={style.btns}>
                    <button
                      className={style.btnEdit}
                      onClick={() => {
                        setTimeSlotEditId(slot._id);
                        setTimeSlotFormEdit({ startTime: slot.startTime, endTime: slot.endTime });
                      }}
                    >
                      Edit
                    </button>
                    <button className={style.btnDelete} onClick={() => deleteTimeSlot(slot._id)}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {timeSlotHasMore && (
            <button onClick={() => setTimeSlotPage((prev) => prev + 1)}>More Time Slots</button>
          )}
        </div>
      ) : (
        <p>No time slots available. Add one to get started!</p>
      )}
    </div>
  );
};

export default TimeSlotManagement;
