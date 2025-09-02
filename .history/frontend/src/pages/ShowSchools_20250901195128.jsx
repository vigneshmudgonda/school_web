import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await axios.get("http://localhost:5000/schools");
        setSchools(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSchools();
  }, []);

  return (
    <div className="schools-container">
      {schools.map((school) => (
        <div className="school-card" key={school.id}>
          <img
            src={`http://localhost:5000/uploads/${school.image}`}
            alt={school.name}
          />
          <h3>{school.name}</h3>
          <p>{school.address}</p>
          <p>{school.city}, {school.state}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowSchools;
