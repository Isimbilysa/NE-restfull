import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      const response = await axios.get(`http://localhost:4000/api/employees`, {
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
    <div className="container mx-auto py-8 overflow-x-auto">
      <nav className="flex space-y-4">
        <Link
          to="/register"
          className="text-white text-lg py-2 px-4 bg-[#667EEA] hover:bg-indigo-800 transition duration-300 w-full mb-8"
        >
          Add New Employee
        </Link>
      </nav>
      <table className="w-full table-fixed max-w-full">
        <thead>
          <tr className="bg-[#667EEA] hover:bg-indigo-800 text-white">
            <th className="w-1/12 py-2 px-4">ID</th>
            <th className="w-1/6 py-2 px-4">Firstname</th>
            <th className="w-1/6 py-2 px-4">Lastname</th>
            <th className="w-1/6 py-2 px-4">National Identity</th>
            <th className="w-1/6 py-2 px-4">Telephone</th>
            <th className="w-[35%] py-2 px-4">Email</th>
            <th className="w-1/6 py-2 px-4">Department</th>
            <th className="w-1/6 py-2 px-4">Position</th>
            <th className="w-1/6 py-2 px-4">Laptop Manufacturer</th>
            <th className="w-1/6 py-2 px-4">Model</th>
            <th className="w-1/6 py-2 px-4">Serial Number</th>
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
      {/* Pagination */}
      <div className="flex justify-center mt-4">
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
  );
};

export default PaginatedEmployees;
