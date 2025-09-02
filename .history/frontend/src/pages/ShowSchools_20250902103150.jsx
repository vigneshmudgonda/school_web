import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await axios.get(`${API_URL}/schools`);
        setSchools(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSchools();
  }, [API_URL]);

  return (
    <div className="schools-container">
      {schools.map((school) => (
        <div className="school-card" key={school.id}>
          <img src={school.image} alt={school.name} style={{ width: "200px" }} />
          <h3>{school.name}</h3>
          <p>{school.address}</p>
          <p>
            {school.city}, {school.state}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ShowSchools;
