import React, { useState } from "react"; 
import { useForm } from "react-hook-form";
import axios from "axios";

const AddSchool = () => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);
      formData.append("image", data.image[0]);

      const res = await axios.post(`${API_URL}/schools`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message || "School added successfully");
      reset();
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Failed to add school");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Add New School</h2>
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        encType="multipart/form-data" // ✅ Add this
      >
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="School Name"
            {...register("name", { required: "Name is required" })}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Address"
            {...register("address", { required: "Address is required" })}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.address && <p style={{ color: "red" }}>{errors.address.message}</p>}
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="City"
            {...register("city", { required: "City is required" })}
            style={{ flex: 1, padding: "8px" }}
          />
          <select
            {...register("state", { required: "State is required" })}
            style={{ flex: 1, padding: "8px" }}
          >
            <option value="">Select State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>
        {(errors.city || errors.state) && <p style={{ color: "red" }}>City and State are required</p>}

        <div style={{ marginBottom: "10px" }}>
          <input
            type="tel"
            placeholder="Contact Number"
            {...register("contact", {
              required: "Contact is required",
              pattern: { value: /^[0-9]{10}$/, message: "Contact must be 10 digits" },
            })}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.contact && <p style={{ color: "red" }}>{errors.contact.message}</p>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            placeholder="Email"
            {...register("email_id", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
            })}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.email_id && <p style={{ color: "red" }}>{errors.email_id.message}</p>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            onChange={handleImageChange}
            style={{ width: "100%" }}
          />
          {errors.image && <p style={{ color: "red" }}>{errors.image.message}</p>}
        </div>

        {preview && (
          <div style={{ marginBottom: "10px", textAlign: "center" }}>
            <img src={preview} alt="Preview" style={{ width: "150px", borderRadius: "8px" }} />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Submitting..." : "Add School"}
        </button>
      </form>
    </div>
  );
};

export default AddSchool;
