import React, { useEffect, useState } from "react";
import style from "../../styling/DataAnalytics/Statistics.module.css";

const UserCount = () => {
  const [userCount, setUserCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch("/users/count");
        if (!response.ok) {
          throw new Error("Failed to fetch user count");
        }
        const data = await response.json();
        setUserCount(data.totalUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={style.containerTotalApplicants}>
      <h2>Total Applicants </h2>
      <p>{userCount !== null ? ` ${userCount}` : "No data available"}</p>
    </div>
  );
};

export default UserCount;
