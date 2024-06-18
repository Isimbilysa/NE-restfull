import * as React from "react";
import { Link } from "react-router-dom";

const SucessMessage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-8 text-green-500">
        User Created Successfully
      </h1>
      <nav className="flex flex-col items-center space-y-4">
        {/* <Link
          to="/register"
          className="text-white text-lg py-2 px-4 bg-[#667EEA] rounded-md hover:bg-indigo-600 transition duration-300"
        >
          Add New
        </Link> */}
        <Link
          to="/employees"
          className="text-white text-lg py-2 px-4 bg-[#667EEA] rounded-md hover:bg-indigo-600 transition duration-300"
        >
          Display All Employees
        </Link>
      </nav>
    </div>
  );
};

export default SucessMessage;
