import React, { useState } from "react";
import axios from "axios";
import { getAuthorizationHeader } from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password:""
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
      await axios.post("http://localhost:5000/api/sign-up", formData, {headers: getAuthorizationHeader()});
      console.log("Form submitted successfully!");
      // Optionally, reset form fields after submission
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
      navigate("/login")
    } catch (error: any) {
      console.log("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col h-fit mx-auto w-[50vw]">
      <h1 className="text-[#68c8f5] font-bold mt-12">
        Rwanda Coding Academy-mis
      </h1>
      <div className="p-8">
        <h2 className="font-bold">Register User</h2>
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
            name="email"
            className="border py-2 px-4 border-none bg-[#EDF2F7] w-full mb-8"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="border py-2 px-4 border-none bg-[#EDF2F7] w-full mb-8"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="border w-full py-2 px-4 text-white bg-[#68c8f5]"
        >
          Register
        </button>
        already have an account ?
       <Link to='/login' className="text-[#68c8f5]">login</Link> 
      </form>
    </div>
  );
};

export default Register;