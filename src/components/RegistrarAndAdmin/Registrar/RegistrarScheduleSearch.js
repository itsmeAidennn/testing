import React, { useState, useEffect } from 'react';
import Modal from '../../CustomModal';
import style from '../../../styling/RegistrarAndAdmin/RegistrarScheduleSearch.module.css';

const ScheduleSearch = () => {
  const [schedules, setSchedules] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ name: '', id: '', gender: '', strand: '', date: '' });
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [changeInfo, setChangeInfo] = useState(false);

  const fetchSchedules = async () => {
    try {
      const params = new URLSearchParams({
        ...filters,
        page,
        limit: 15,
      });

      const response = await fetch(`/api/fetchSchedules?${params.toString()}`);
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

    const handleAcceptOrReject = async (userID, document, decision, e) => {
      try {
        e.target.disabled = true;
        const response = await fetch('/api/RegistrarVerifiy', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            decision,
            userID,
            document
          })
        });
    
        if (response.ok) {
          const data = await response.json();
          setChangeInfo(!changeInfo);
          alert(data.message);
          e.target.disabled = false;
        } else {
          setChangeInfo(!changeInfo);
          alert('Failed to verify, please contact a dev.');
          e.target.disabled = false;
        }
      }
      catch (error) {
        console.error("Couldn't reach the server");
        e.target.disabled = false;
      }
    }
  


  useEffect(() => {
    fetchSchedules();
  }, [page, filters, changeInfo]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const handleViewDocuments = (schedule) => {
    setSelectedSchedule(schedule);
    setIsDocModalOpen(true);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  const closeDocModal = () => {
    setIsDocModalOpen(false);
    setSelectedSchedule(null);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className={style.scheduleContainer}>
      <h1>Verify Documents</h1>
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
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div>
      <table className={style.scheduleSearchTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Strand</th>
            <th>Schedule Dates</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr
              key={schedule._id}
              onClick={() => handleViewDocuments(schedule)}
              style={{ cursor: 'pointer' }}
            >
              <td>{`${schedule.userID.firstName} ${schedule.userID.middleName} ${schedule.userID.lastName}`}</td>
              <td>{schedule.userID.gender}</td>
              <td>{schedule.userID.strand}</td>
              <td>
                {schedule.scheduleDates
                  ?.map((date) =>
                    new Date(date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  )
                  .join(', ')}
              </td>
              {/* <td>{schedule.scheduleDates?.join(', ')}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className={style.btnContainer}> 
        {page < totalPages && (
          <button id={style.loadMorebtn} onClick={() => setPage((prev) => prev + 1)}>Load More</button>
        )}
      </div>

    <Modal isOpen={isDocModalOpen} onClose={closeDocModal}>
    {selectedSchedule && (
        <div className={style.documentsContainer}>
        <h2>Documents for {selectedSchedule.userID.firstName}</h2>
        {Object.keys(selectedSchedule.userID.documents).length === 0 ? (
            <p>No documents uploaded yet</p>
        ) : (
            <ul>
            {Object.keys(selectedSchedule.userID.documents).map((docType, index) => {
                const doc = selectedSchedule.userID.documents[docType];
                return (
                <li key={index} style={{ marginBottom: '1em' }}>
                    <h4>{docType}</h4>
                    <ul style={{ paddingLeft: '20px' }}>
                    {doc.front && (
                        <li>
                        <span
                            style={{ cursor: 'pointer', color: 'blue' }}
                            onClick={() => doc.front.base64Data && handleImageClick(doc.front.base64Data)}
                        >
                            Front: {doc.front.name ?? 'No name available'}
                        </span>
                        </li>
                    )}
                    {doc.back && (
                        <li>
                        <span
                            style={{ cursor: 'pointer', color: 'blue' }}
                            onClick={() => doc.back.base64Data && handleImageClick(doc.back.base64Data)}
                        >
                            Back: {doc.back.name ?? 'No name available'}
                        </span>
                        </li>
                    )}
                    {doc.name && (
                        <li>
                        <span
                            style={{ cursor: 'pointer', color: 'blue' }}
                            onClick={() => doc.base64Data && handleImageClick(doc.base64Data)}
                        >
                            {doc.name ?? 'No document name available'}
                        </span>
                        </li>
                    )}
                    </ul>
                    <div className={style.btns}>
                    <button id={style.btnAccept} onClick={(e) => handleAcceptOrReject(selectedSchedule.userID, docType, true, e)}>Accept</button>
                    <button id={style.btnReject} onClick={(e) => handleAcceptOrReject(selectedSchedule.userID, docType, false, e)}>Reject</button>
                    </div>
                </li>
                );  
            })}
            </ul>
        )}
        </div>
    )}
    </Modal>


      <Modal isOpen={isImageModalOpen} onClose={closeImageModal}>
        {selectedImage && (
          <div>
            <img src={`data:image/jpeg;base64,${selectedImage}`} alt="Document" style={{ width: '100%', height: "100%" }} />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ScheduleSearch;