import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaLaptop } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

interface BOOK {
  id: number;
  name: string;
  author: string;
  publisher: string;
  publicationYear: number;
  subject: string;
}

const PaginatedBooks: React.FC = () => {
  const [books, setbooks] = useState<BOOK[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books`, {
        params: {
          page: currentPage,
          pageSize: pageSize,
        },
      });
      console.log("Response data:", response.data); // Log the response data
      const { books, totalPages } = response.data;
      setbooks(books);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex gap-4">
      <div className="w-[20rem] p-4 h-screen bg-[#68c8f5] flex flex-col items-start">
        <span className="text-2xl text-white font-bold text-startflex ">MIS</span>
<div className="h-[45px] w-full cursor-pointer bg-[white] rounded-md mt-10 flex items-center px-4 gap-4">
<FaUser color="[#68c8f5]"/>
  <span className="text-[#68c8f5]">Books</span>
</div>
<div className="h-[40px] w-full cursor-pointer rounded-md mt-10 flex items-center px-4 gap-4">
<FaLaptop color="white" />
  <span className="text-white"></span>
</div>
<div className="h-[40px] w-full cursor-pointer rounded-md mt-10 flex items-center px-4 gap-4">
<IoMdSettings color="white"/>
  <span className="text-white">Settings</span>
</div>
      </div>
      <div className="flex flex-col items-end flex-grow gap-4 py-4 px-4">
     <button className="h-[50px] w-[10rem] bg-[#68c8f5] hover:bg-indigo-800 rounded-md text-white">Add Employee</button>
      <div className="max-w-1/2 overflow-x-scroll">
      <table className="border-collapse">
        <thead>
          <tr className="bg-[#68c8f5] hover:bg-indigo-800 text-white">
            <th className="p-6 text-right text-nowrap">ID</th>
            <th className="p-4 text-left text-nowrap">Name</th>
            <th className="p-4 text-left text-nowrap">Author</th>
            <th className="p-4 text-left text-nowrap">Publisher</th>
            <th className="p-4 text-left text-nowrap">PublicationYear</th>
            <th className="p-4 text-left text-nowrap">Subject</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-b">
              <td className="py-2 px-4">{book.id}</td>
              <td className="py-2 px-4">{book.name}</td>
              <td className="py-2 px-4">{book.author|| "-"}</td>
              <td className="py-2 px-4">{book.publisher || "-"}</td>
              <td className="py-2 px-4">{book.publicationYear}</td>
              <td className="py-2 px-4">{book.subject}</td>
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
                ? "bg-[#68c8f5] hover:bg-indigo-800 text-white"
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

export default PaginatedBooks;
