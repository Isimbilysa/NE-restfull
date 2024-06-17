import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAuthorizationHeader } from "../../lib/utils";


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/sign-in", {
        email,
        password,
      });

      // Assuming the token is returned in the response data
      const token = response.data.accessToken;

      // Set authorization header for subsequent requests
      setAuthorizationHeader(token);

      console.log("Login Successful ", response.data);

      // Redirect user to next page upon successful login
      navigate("/home");
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <div className="w-[50vw] flex flex-col justify-between h-fit mx-auto">
      <h1 className="text-[#667EEA] font-bold mt-12">
        EQUIPMENT DEVELOPMENT SYSTEM
      </h1>
      <div className="shadow-lg p-8 mt-12">
        <h2 className="font-bold mb-8">LOGIN</h2>
        <span className="mb-8 block">Sign in to your account</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            className="py-2 px-4 border-none bg-[#EDF2F7] w-full mb-8 outline-none"
            value={email}
            onChange={handleEmailChange}
            
          />
          <input
            type="password"
            placeholder="Password"
            className="py-2 border-none px-4 bg-[#EDF2F7] w-full mb-8 outline-none"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="border w-full py-2 px-4 text-white bg-[#667EEA]" type="submit">
            {" "}
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;