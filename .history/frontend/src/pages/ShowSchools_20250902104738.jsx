import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/schools`);
        setSchools(res.data);
      } catch (err) {
        console.error("Fetch error:", err.response || err.message);
        setError("Failed to fetch schools");
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, [API_URL]);

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p style={{ textAlign: "center" }}>Loading schools...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "0 20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Schools Directory</h2>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search by school name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredSchools.map((school) => (
          <div
            key={school.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={school.image || "https://via.placeholder.com/300x200"}
              alt={school.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover", // ✅ full image fills card nicely
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <h3>{school.name}</h3>
            <p>{school.address}</p>
            <p>
              {school.city}, {school.state}
            </p>
            <p>Contact: {school.contact}</p>
            <p>Email: {school.email_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSchools;
