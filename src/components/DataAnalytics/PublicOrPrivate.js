import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import style from "../../styling/DataAnalytics/Statistics.module.css";

const SchoolCount = () => {
  const [counts, setCounts] = useState({ Public: 0, Private: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchoolCounts = async () => {
      try {
        const response = await fetch("/school-count");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCounts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolCounts();
  }, []);

  if (loading) return <p className={style.loading}>Loading...</p>;
  if (error) return <p className={style.error}>Error: {error}</p>;

  const data = [
    {
      name: "Public Schools",
      value: counts.Public,
    },
    {
      name: "Private Schools",
      value: counts.Private,
    },
  ];

  const COLORS = ['#00C49F', '#FFBB28'];

  return (
    <div className={style.container}>
      <h2 className={style.title}>School Types</h2>
      <div className={style.chart}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={50} // Reduced radius for a smaller pie
              label
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" height={30} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SchoolCount;
