import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import style from "../../styling/DataAnalytics/Statistics.module.css";

const DistrictCount = () => {
  const [districtCounts, setDistrictCounts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDistrictCounts = async () => {
      try {
        const response = await fetch("/users/district-count");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setDistrictCounts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDistrictCounts();
  }, []);

  if (loading) {
    return <p className={style.loading}>Loading...</p>;
  }

  if (error) {
    return <p className={style.error}>Error: {error}</p>;
  }

  // Transform districtCounts into an array suitable for the chart
  const chartData = Object.entries(districtCounts).map(([District, Total]) => ({
    District,
    Total,
  }));

  return (
    <div className={style.container}>
      <h2 className={style.title}>Applicants per District</h2>
      <div className={style.chart}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="District" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="Total" fill="#82ca9d" barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DistrictCount;
