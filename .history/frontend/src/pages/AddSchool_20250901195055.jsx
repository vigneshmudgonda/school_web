import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddSchool = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      const res = await axios.post("http://localhost:5000/schools", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert(res.data.message);
      reset();
    } catch (err) {
      console.error(err);
      alert("Failed to add school");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New School</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          type="text"
          placeholder="School Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <input
          type="text"
          placeholder="Address"
          {...register("address", { required: "Address is required" })}
        />
        {errors.address && <p className="error">{errors.address.message}</p>}

        <input
          type="text"
          placeholder="City"
          {...register("city", { required: "City is required" })}
        />
        {errors.city && <p className="error">{errors.city.message}</p>}

        <input
          type="text"
          placeholder="State"
          {...register("state", { required: "State is required" })}
        />
        {errors.state && <p className="error">{errors.state.message}</p>}

        <input
          type="number"
          placeholder="Contact Number"
          {...register("contact", {
            required: "Contact is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Contact must be 10 digits"
            }
          })}
        />
        {errors.contact && <p className="error">{errors.contact.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email_id", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format"
            }
          })}
        />
        {errors.email_id && <p className="error">{errors.email_id.message}</p>}

        <input
          type="file"
          accept="image/*"
          {...register("image", { required: "Image is required" })}
        />
        {errors.image && <p className="error">{errors.image.message}</p>}

        <button type="submit">Add School</button>
      </form>
    </div>
  );
};

export default AddSchool;
