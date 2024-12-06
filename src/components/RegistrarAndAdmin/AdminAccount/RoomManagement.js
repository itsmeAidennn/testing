import style from '../../../styling/RegistrarAndAdmin/Management.module.css';
import Swal from 'sweetalert2'

import React, { useState, useEffect } from 'react';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [roomPage, setRoomPage] = useState(1);
  const [roomHasMore, setRoomHasMore] = useState(true);
  const [roomForm, setRoomForm] = useState({ roomNumber: '', capacity: 25 });
  const [roomEditId, setRoomEditId] = useState(null);
  const [roomFormForEdit, setRoomFormForEdit] = useState({ roomNumber: '', capacity: 25 });

  const fetchRooms = async (page) => {
    try {
      const params = new URLSearchParams({
        page,
        limit: 10,
      });
      const response = await fetch(`/api/get-examination-rooms?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch rooms');
      const data = await response.json();
      if (roomPage === 1) {
        setRooms(data.rooms);
      } else {
        setRooms((prev) => [...prev, ...data.rooms]);
      }
      if (page >= data.totalPages) setRoomHasMore(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const searchRooms = async ({ roomNumber, capacity }) => {
    try {
      const params = new URLSearchParams({
        ...(roomNumber && { roomNumber }),
        ...(capacity && { capacity }),
      });
  
      const response = await fetch(`/api/search-rooms?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch search results');
      const data = await response.json();
  
      setRooms(data.rooms); 
      setRoomHasMore(false); 
    } catch (error) {
      console.error(error.message);
    }
  };

  const addRoom = async () => {
    try {
      const response = await fetch('/api/add-examination-rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomForm),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.error);
        throw new Error('Failed to add room');
        console.log(data.error);
      } 
      // alert(data.message);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Room successfully added.",
        showConfirmButton: false,
        timer: 1500
      });
      setRooms((prev) => [data.savedRoom, ...prev]);
      setRoomForm({ roomNumber: '', capacity: 25 });
    } catch (error) {
      console.error(error.message);
    }
  };


  const saveEditRoom = async () => {
    try {
      const response = await fetch(`/api/edit-room/${roomEditId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomFormForEdit),
      });
      if (!response.ok) throw new Error('Failed to edit room');
      const updatedRoom = await response.json();
      setRooms((prev) =>
        prev.map((room) => (room._id === updatedRoom._id ? updatedRoom : room))
      );
      setRoomEditId(null); 
      setRoomForm({ roomNumber: '', capacity: '' });
      // alert("Room edited succesffully!");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved.",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteRoom = async (id) => {
    try {
      const response = await fetch(`/api/delete-room/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete room');
      setRooms((prev) => prev.filter((room) => room._id !== id));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Room successfully deleted.",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchRooms(roomPage);
  }, [roomPage]); 

  return (
    <div className={style.RoomManagementContainer}>
      <form 
        className={style.formFunctions}
        onSubmit={(e) => {
          e.preventDefault();
          addRoom();
        }}
      >
        <input
          type="text"
          name="roomNumber"
          placeholder="Room Number"
          value={roomForm.roomNumber}
          onChange={(e) =>
            setRoomForm({ ...roomForm, roomNumber: e.target.value })
          }
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          // defaultValue={25}
          value={roomForm.capacity}
          onChange={(e) =>
            setRoomForm({ ...roomForm, capacity: Number(e.target.value) })
          }
        />
        <button className={style.btnAdd} type="submit">Add Room</button>
        <button
          className={style.btnSearch}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            searchRooms({
              roomNumber: e.target.form.roomNumber.value,
              capacity: e.target.form.capacity.value,
            });
          }}
        >
          Search
        </button>
      </form>

      {rooms.length > 0 ? (
        <div className={style.cardsGrid}>
          {rooms.map((room) => (
            <div key={room._id}>
              {roomEditId === room._id ? (
                <div className={style.cardsEdit}>
                  <input
                    type="text"
                    value={roomFormForEdit.roomNumber}
                    onChange={(e) =>
                      setRoomFormForEdit({ ...roomFormForEdit, roomNumber: e.target.value })
                    }
                    required
                  />
                  <input
                    type="number"
                    value={roomFormForEdit.capacity}
                    onChange={(e) =>
                      setRoomFormForEdit({ ...roomFormForEdit, capacity: +e.target.value })
                    }
                    required
                  />
                  <div className={style.btnsCardsEdit}>
                    <button id={style.btnCardsEditSave} onClick={saveEditRoom}>Save</button>
                    <button
                      id={style.btnCardsEditCancel}
                      onClick={() => {
                        setRoomEditId(null); 
                        setRoomFormForEdit({ roomNumber: '', capacity: '' });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                  <div  className={style.Cards}>
                    <p>
                      Room: {room.roomNumber}, Capacity: {room.capacity}
                    </p>
                    <div className={style.btns}>
                      <button
                        className={style.btnEdit}
                        onClick={() => {
                          setRoomEditId(room._id);
                          setRoomFormForEdit({ roomNumber: room.roomNumber, capacity: room.capacity });
                        }}
                      >
                        Edit
                      </button>
                      <button className={style.btnDelete} onClick={() => deleteRoom(room._id)}>Delete</button>
                    </div>
                  </div>
              )}
            </div>
          ))}
          {roomHasMore && (
            <div className={style.btnMore}>
              <button
                className={style.btn}
                onClick={() => {
                  setRoomPage((prev) => prev + 1);
                }}
              >
                More Rooms
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No rooms available. Add a new room to get started!</p>
      )}
    </div>
  );
};

export default RoomManagement;