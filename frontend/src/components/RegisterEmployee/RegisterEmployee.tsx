import React, { useState } from "react";
import axios from "axios";
import { getAuthorizationHeader } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

const RegisterEmployees: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    nationalIdentity: "",
    telephone: "",
    email: "",
    department: "",
    position: "",
    laptopManufacturer: "",
    model: "",
    serialNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/employees", formData, {headers: getAuthorizationHeader()});
      console.log("Form submitted successfully!");
      // Optionally, reset form fields after submission
      setFormData({
        firstname: "",
        lastname: "",
        nationalIdentity: "",
        telephone: "",
        email: "",
        department: "",
        position: "",
        laptopManufacturer: "",
        model: "",
        serialNumber: "",
      });
      navigate("/success")
    } catch (error: any) {
      console.log("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col h-fit mx-auto w-[50vw]">
      <h1 className="text-[#667EEA] font-bold mt-12">
        EQUIPMENT DEVELOPMENT SYSTEM
      </h1>
      <div className="p-8">
        <h2 className="font-bold">Register Employee</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="">
          <input
            type="text"
            name="firstname"
            className="border py-2 px-4 border-none bg-[#EDF2F7] w-full mb-8"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastname"
            className="border py-2 px-4 border-none bg-[#EDF2F7] w-full mb-8"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="nationalIdentity"
            className="border py-2 px-4 border-none bg-[#EDF2F7] w-full mb-8"
            placeholder="National ID"
            value={formData.nationalIdentity}
            onChange={handleChange}
          />
          <input
            type="text"
            name="telephone"
            className="border py-2 px-4 border-none bg-[#EDF2F7] w-full mb-8"
            placeholder="Telephone"
            value={formData.telephone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            className="border py-2 px-4 border-none bg-[#EDF2F7] w-full mb-8"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            className="border py-2 px-4 border-none bg-[#EDF2F7] w-full mb-8"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
          />
          <input
            type="text"
            name="position"
            className="border py-2 px-4 border-none bg-[#EDF2F7] w-full mb-8"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
          />
          <input
            type="text"
            name="laptopManufacturer"
            className="border py-2 px-4 border-none bg-[#EDF2F7] w-full mb-8"
            placeholder="Laptop Manufacturer"
            value={formData.laptopManufacturer}
            onChange={handleChange}
          />
          <input
            type="text"
            name="model"
            className="border py-2 px-4 border-none bg-[#EDF2F7] w-full mb-8"
            placeholder="Model"
            value={formData.model}
            onChange={handleChange}
          />
          <input
            type="text"
            name="serialNumber"
            className="border py-2 px-4 border-none bg-[#EDF2F7] w-full mb-8"
            placeholder="Serial Number"
            value={formData.serialNumber}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="border w-full py-2 px-4 text-white bg-[#667EEA]"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterEmployees;