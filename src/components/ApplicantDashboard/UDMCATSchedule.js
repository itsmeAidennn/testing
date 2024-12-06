import React, { useState, useEffect } from "react";

const UserSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserSchedule = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/user-schedule");

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch schedule");
        }

        const data = await response.json();
        setSchedule(data.schedule);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSchedule();
  }, []);

  if (loading) {
    return <p>Loading schedule...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>Your Schedule</h2>
      {schedule.length === 0 ? (
        <p>No schedule found.</p>
      ) : (
        <ul>
          {schedule.map((item, index) => (
            <li key={index}>
              <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
              <p><strong>Room:</strong> {item.room}</p>
              <p><strong>Time Slot:</strong> {item.timeSlot}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSchedule;