import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import style from "../../styling/DataAnalytics/Statistics.module.css";

const DepartmentCounts = () => {
  const [departmentCounts, setDepartmentCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const departmentAbbreviations = {
    "College of Health Sciences": "CHS",
    "College of Criminal Justice": "CCJ",
    "College of Engineering and Technology": "CET",
    "College of Business Administration": "CBA",
    "College of Education": "CED",
    "College of Hospitality Management": "CHM",
    "College of Arts and Sciences": "CAS",
  };

  const COLORS = ["#d0ed57", "#83a6ed", "#8dd1e1", "#82ca9d", "#ffc658", "#a4de6c",  "#8884d8"];

  useEffect(() => {
    const fetchDepartmentCounts = async () => {
      try {
        const response = await fetch("/users/department-count");
        if (!response.ok) {
          throw new Error("Failed to fetch department counts");
        }
        const data = await response.json();
        setDepartmentCounts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentCounts();
  }, []);

  if (loading) return <p className={style.loading}>Loading...</p>;
  if (error) return <p className={style.error}>Error: {error}</p>;

  const chartData = departmentCounts.map((dept) => ({
    department: departmentAbbreviations[dept._id] || dept._id,
    Applicants: dept.count,
  }));

  return (
    <div className={style.container}>
      <h2 className={style.title}>Applicants Per Department</h2>
      <div className={style.chart}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="Applicants" barSize={60}>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DepartmentCounts;
