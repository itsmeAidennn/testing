import style from '../../../styling/RegistrarAndAdmin/PendingRegistrarAccounts.module.css';

import React, { useState, useEffect } from "react";

const PendingRegistrarAccounts = () => {
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPendingAccounts(currentPage);
  }, [currentPage]);

  const fetchPendingAccounts = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/pendingRegistrars?page=${page}&limit=10`);
      if (response.ok) {
        const data = await response.json();
        setPendingAccounts((prev) => [...prev, ...data.pendingAccounts]);
        setHasMore(page < data.totalPages);
      } else {
        console.error("Failed to fetch pending accounts.");
      }
    } catch (error) {
      console.error("Error fetching pending accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (accountId, action) => {
    try {
      const response = await fetch("/api/registrarAccountAction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId, action }),
      });

      if (response.ok) {
        const message = action === "approve" ? "approved" : "rejected";
        alert(`Account successfully ${message}.`);
        setPendingAccounts((prev) =>
          prev.filter((account) => account._id !== accountId)
        );
      } else {
        alert("Failed to process the account action.");
      }
    } catch (error) {
      console.error("Error processing account action:", error);
    }
  };

  const loadMoreAccounts = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return (
    <div className={style.registrarPendingAccounts}>
      <h1>Pending Registrar Accounts</h1>
      {pendingAccounts.length === 0 && !loading ? (
        <p>No pending accounts to display.</p>
      ) : (
        <ul className={style.registrarAccounts}>
          {pendingAccounts.map((account) => (
            <li className={style.registrarAccountsCards} key={account._id}>
              <img
                src={`data:${account.profilePic.type};base64,${arrayBufferToBase64(
                  account.profilePic.data.data
                )}`}
                alt="Profile"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
              <p>
                <strong>Name:</strong> {`${account.firstName} ${account.middleName} ${account.surname}`}<br />
                <strong>Age:</strong> {account.age}<br />
                <strong>Address:</strong> {account.address}
              </p>
              <div className={style.btnsPendingRegistrarAccounts}>
                <button className={style.btnApprove} onClick={() => handleAction(account._id, "approve")}>
                  Approve
                </button>
                <button className={style.btnReject} onClick={() => handleAction(account._id, "reject")}>
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {loading && <p>Loading...</p>}
      {hasMore && !loading && (
        <button onClick={loadMoreAccounts}>Load More</button>
      )}
    </div>
  );
};

export default PendingRegistrarAccounts;
