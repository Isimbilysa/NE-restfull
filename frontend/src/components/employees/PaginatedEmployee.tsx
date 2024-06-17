import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaLaptop } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

interface Employee {
  id: number;
  firstname: string;
  lastname: string | null;
  nationalIdentity: string | null;
  telephone: string;
  email: string;
  department: string;
  position: string;
  laptopManufacturer: string;
  model: string;
  serialNumber: string;
}

const PaginatedEmployees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchEmployees();
  }, [currentPage]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employees`, {
        params: {
          page: currentPage,
          pageSize: pageSize,
        },
      });
      console.log("Response data:", response.data); // Log the response data
      const { employees, totalPages } = response.data;
      setEmployees(employees);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex gap-4">
      <div className="w-[20rem] p-4 h-screen bg-[#667EEA] flex flex-col items-start">
        <span className="text-2xl text-white font-bold text-startflex ">MIS</span>
<div className="h-[45px] w-full cursor-pointer bg-[white] rounded-md mt-10 flex items-center px-4 gap-4">
<FaUser color="#667EEA"/>
  <span className="text-[#667EEA]">Employees</span>
</div>
<div className="h-[40px] w-full cursor-pointer rounded-md mt-10 flex items-center px-4 gap-4">
<FaLaptop color="white" />
  <span className="text-white">Laptops</span>
</div>
<div className="h-[40px] w-full cursor-pointer rounded-md mt-10 flex items-center px-4 gap-4">
<IoMdSettings color="white"/>
  <span className="text-white">Settings</span>
</div>
      </div>
      <div className="flex flex-col items-end flex-grow gap-4 py-4 px-4">
     <button className="h-[50px] w-[10rem] bg-[#667EEA] hover:bg-indigo-800 rounded-md text-white">Add Employee</button>
      <div className="max-w-full overflow-x-scroll">
      <table className="border-collapse">
        <thead>
          <tr className="bg-[#667EEA] hover:bg-indigo-800 text-white">
            <th className="p-4 text-left text-nowrap">ID</th>
            <th className="p-4 text-left text-nowrap">Firstname</th>
            <th className="p-4 text-left text-nowrap">Lastname</th>
            <th className="p-4 text-left text-nowrap">National Identity</th>
            <th className="p-4 text-left text-nowrap">Telephone</th>
            <th className="p-4 text-left text-nowrap">Email</th>
            <th className="p-4 text-left text-nowrap">Department</th>
            <th className="p-4 text-left text-nowrap">Position</th>
            <th className="p-4 text-left text-nowrap">Laptop Manufacturer</th>
            <th className="p-4 text-left text-nowrap">Model</th>
            <th className="p-4 text-left text-nowrap">Serial Number</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b">
              <td className="py-2 px-4">{employee.id}</td>
              <td className="py-2 px-4">{employee.firstname}</td>
              <td className="py-2 px-4">{employee.lastname || "-"}</td>
              <td className="py-2 px-4">{employee.nationalIdentity || "-"}</td>
              <td className="py-2 px-4">{employee.telephone}</td>
              <td className="py-2 px-4">{employee.email}</td>
              <td className="py-2 px-4">{employee.department}</td>
              <td className="py-2 px-4">{employee.position}</td>
              <td className="py-2 px-4">{employee.laptopManufacturer}</td>
              <td className="py-2 px-4">{employee.model}</td>
              <td className="py-2 px-4">{employee.serialNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
     
      {/* Pagination */}
      <div className="w-full flex justify-center">
      <div className="">
        {Array.from(Array(totalPages).keys()).map((page) => (
          <button
            key={page}
            className={`mx-2 px-4 py-2 border ${
              currentPage === page + 1
                ? "bg-[#667EEA] hover:bg-indigo-800 text-white"
                : "bg-gray-200 hover:bg-gray-800 text-#[667EEA]"
            }`}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </button>
        ))}
      </div>
      </div>
      
      </div> 
    </div>
  );
};

export default PaginatedEmployees;
