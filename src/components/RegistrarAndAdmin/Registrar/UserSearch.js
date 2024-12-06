import React, { useState, useEffect } from 'react';
import Modal from '../../CustomModal';
import style from '../../../styling/RegistrarAndAdmin/UserSearch.module.css';

const UserSearch = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ name: '', id: '', gender: '', strand: '', examStatus: '' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams({
        ...filters,
        page,
        limit: 15,
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

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className={style.userContainer}>
      <h1>Applicants Information</h1>
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
          <select name="examStatus" value={filters.examStatus || ''} onChange={handleFilterChange}>
            <option value="">All Statuses</option>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
            <option value="InProgress">In Progress</option>
          </select>
        </div>
      </div>
      <div>
      <table className={style.userSearchTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Strand</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr 
                key={user.uniqueID} 
                onClick={() => handleUserClick(user)} 
                style={{ cursor: 'pointer' }}
              >
                <td>{user.firstName} {user.middleName} {user.lastName}</td>
                <td>{user.gender}</td>
                <td>{user.strand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={style.btnContainer}> 
        {page < totalPages && (
          <button id={style.loadMoreUserBtn} onClick={() => setPage((prev) => prev + 1)}>Load More</button>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedUser && (
          <div className={style.userProfileContainer}>
          <h2>
            {selectedUser.firstName} {selectedUser.middleName} {selectedUser.lastName} {selectedUser.nameSuffix}
          </h2>
          <div className={style.oneLine}>
            <h3>Unique ID: </h3>
            <p>{selectedUser.uniqueID}</p>
          </div>
          <div className={style.oneLine}>
            <h3>Address: </h3>
            <p>{selectedUser.address}</p>
          </div>
          <div className={style.oneLine}>
            <h3>Gender: </h3>
            <p>{selectedUser.gender}</p>
          </div>
          <div className={style.oneLine}>
            <h3>Contact No: </h3>
            <p>{selectedUser.contactNo}</p>
          </div>
          <div className={style.oneLine}>
            <h3>Email: </h3>
            <p>{selectedUser.email}</p>
          </div>
          <div className={style.oneLine}>
            <h3>Strand: </h3>
            <p>{selectedUser.strand}</p>
          </div>
          <h3>First Choice: </h3>
          <p>{selectedUser.courseFirstChoice}</p>
          <h3>Second Choice: </h3>
          <p>{selectedUser.courseSecondChoice}</p>
          <h3>Third Choice: </h3>
          <p>{selectedUser.courseThirdChoice}</p>
        </div>
        )}
      </Modal>
    </div>
  );
};

export default UserSearch;
