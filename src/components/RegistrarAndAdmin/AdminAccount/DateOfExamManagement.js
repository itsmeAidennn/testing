import style from '../../../styling/RegistrarAndAdmin/Management.module.css';
import Swal from 'sweetalert2'
import React, { useState, useEffect } from 'react';

const ExamDatesManagement = () => {
  const [examDates, setExamDates] = useState([]);
  const [examDatePage, setExamDatePage] = useState(1);
  const [examDateHasMore, setExamDateHasMore] = useState(true);
  const [examDateForm, setExamDateForm] = useState({ date: '', description: '' });
  const [examEditId, setExamEditId] = useState(null);
  const [examDateFormForEdit, setExamDateFormForEdit] = useState({ date: '', description: '' });

  const fetchExamDates = async (page) => {
    try {
      const params = new URLSearchParams({
        page,
        limit: 10,
      });
      const response = await fetch(`/api/get-exam-dates?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch exam dates');
      const data = await response.json();
      if (examDatePage === 1) {
        setExamDates(data.dates);
      } else {
        setExamDates((prev) => [...prev, ...data.dates]);
      }
      if (page >= data.totalPages) setExamDateHasMore(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; 
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // const searchExamDates = async (searchDate) => {
  //   try {
  //     const params = new URLSearchParams({ date: searchDate });
  
  //     const response = await fetch(`/api/search-exam-dates?${params.toString()}`);
  //     if (!response.ok) throw new Error('Failed to fetch search results');
  
  //     const data = await response.json();
  //     console.log('Search results:', data.examDates);
  //     setExamDates(data.examDates);
  //   } catch (error) {
  //     console.error('Error searching exam dates:', error);
  //   }
  // };

  const addExamDate = async () => {
    try {
      const response = await fetch('/api/add-exam-date', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(examDateForm),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.error);
        throw new Error('Failed to add exam date');
      }
      // alert(data.message);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Date successfully added.",
        showConfirmButton: false,
        timer: 1500
      });
      setExamDates((prev) => [data.savedDate, ...prev]);
      setExamDateForm({ date: '', description: '' });
    } catch (error) {
      console.error(error.message);
    }
  };

  const saveEditExamDate = async () => {
    try {
      const response = await fetch(`/api/edit-exam-date/${examEditId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(examDateFormForEdit),
      });
      if (!response.ok) throw new Error('Failed to edit exam date');
      const updatedDate = await response.json();
      setExamDates((prev) =>
        prev.map((date) => (date._id === updatedDate._id ? updatedDate : date))
      );
      setExamEditId(null);
      setExamDateFormForEdit({ date: '', description: '' });
      // alert('Exam date edited successfully!');
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

  const deleteExamDate = async (id) => {
    try {
      const response = await fetch(`/api/delete-exam-date/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete exam date');
      setExamDates((prev) => prev.filter((date) => date._id !== id));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Date successfully deleted.",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchExamDates(examDatePage);
  }, [examDatePage]);

  return (
    <div className={style.RoomManagementContainer}>
      <form
        className={style.formFunctions}
        onSubmit={(e) => {
          e.preventDefault();
          addExamDate();
        }}
      >
        <input
          type="date"
          name="date"
          placeholder="Exam Date"
          value={examDateForm.date}
          onChange={(e) => setExamDateForm({ ...examDateForm, date: e.target.value })}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={examDateForm.description}
          onChange={(e) =>
            setExamDateForm({ ...examDateForm, description: e.target.value })
          }
          required
        />
        <button className={style.btnAdd} type="submit">Add Exam Date</button>
        {/* <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            searchExamDates({
              date: e.target.form.date.value,
              description: e.target.form.description.value,
            });
          }}
        >
          Search
        </button> */}
      </form>

      {examDates.length > 0 ? (
        <div className={style.cardsGrid}>
          {examDates.map((exam) => (
            <div key={exam._id}>
              {examEditId === exam._id ? (
                <div className={style.cardsEdit}>
                  <input
                    type="date"
                    value={examDateFormForEdit.date}
                    onChange={(e) =>
                      setExamDateFormForEdit({ ...examDateFormForEdit, date: e.target.value })
                    }
                    required
                  />
                  <input
                    type="text"
                    value={examDateFormForEdit.description}
                    onChange={(e) =>
                      setExamDateFormForEdit({ ...examDateFormForEdit, description: e.target.value })
                    }
                    required
                  />
                  <div className={style.btnsCardsEdit}>
                    <button id={style.btnCardsEditSave} onClick={saveEditExamDate}>Save</button>
                    <button
                      id={style.btnCardsEditCancel}
                      onClick={() => {
                        setExamEditId(null);
                        setExamDateFormForEdit({ date: '', description: '' });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className={style.Cards}>
                  {/* <p>Date:</p> */}
                  <p>{formatDate(exam.date)}</p>
                  {/* <p>Description: </p> */}
                  <p>{exam.description}</p>
                  <div className={style.btns}>
                    <button
                      className={style.btnEdit}
                      onClick={() => {
                        setExamEditId(exam._id);
                        setExamDateFormForEdit({
                          date: exam.date,
                          description: exam.description,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button className={style.btnDelete} onClick={() => deleteExamDate(exam._id)}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {examDateHasMore && (
            <div className={style.btnMore}>
              <button
                className={style.btn}
                onClick={() => {
                  setExamDatePage((prev) => prev + 1);
                }}
              >
                More Exam Dates
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No exam dates available. Add a new date to get started!</p>
      )}
    </div>
  );
};

export default ExamDatesManagement;
