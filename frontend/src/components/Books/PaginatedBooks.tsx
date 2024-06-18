import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { IoMdSettings } from "react-icons/io";
import Cookies from "js-cookie";

interface BOOK {
  id: number;
  name: string;
  author: string;
  publisher: string;
  publicationYear: number;
  subject: string;
}

const PaginatedBooks: React.FC = () => {
  const [books, setBooks] = useState<BOOK[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BOOK[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 10;

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, books]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books`, {
        params: {
          page: currentPage,
          pageSize: pageSize,
        },
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`
        }
      });
      console.log("Response data:", response.data);
      const { book, totalPages } = response.data;
      setBooks(book);
      setFilteredBooks(book);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery === "") {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full flex gap-4">
      <div className="w-[15%] p-4 h-screen bg-[#68c8f5] flex flex-col items-start">
        <span className="text-2xl text-white font-bold text-startflex ">BOOK-MIS</span>
        <div className="h-[45px] w-full cursor-pointer bg-[white] rounded-md mt-10 flex items-center px-4 gap-4">
          <span className="text-[#68c8f5]">Books</span>
        </div>
        <div className="h-[60em] w-full cursor-pointer rounded-md mt-15 flex items-end px-4 gap-4">
          <IoMdSettings color="white" />
          <span className="text-white">Settings</span>
        </div>
      </div>
      <div className="w-[70%] flex flex-col items-start flex-grow gap-4 py-4 px-4">
        <div className="w-full flex justify-between items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search books..."
            className="px-4 py-2 border rounded-md outline-none"
          />
        </div>
        <div className="w-full items-center justify-center mt-4">
          {filteredBooks.length === 0 && searchQuery && (
            <div className="text-center text-red-500">
              No books found for "{searchQuery}"
            </div>
          )}
          {filteredBooks.length > 0 && (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#68c8f5] hover:bg-indigo-300 text-white">
                  <th className="p-6 text-right text-nowrap">ID</th>
                  <th className="p-4 text-left text-nowrap">Name</th>
                  <th className="p-4 text-left text-nowrap">Author</th>
                  <th className="p-4 text-left text-nowrap">Publisher</th>
                  <th className="p-4 text-left text-nowrap">PublicationYear</th>
                  <th className="p-4 text-left text-nowrap">Subject</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="border-b">
                    <td className="py-2 px-4">{book.id}</td>
                    <td className="py-2 px-4">{book.name}</td>
                    <td className="py-2 px-4">{book.author || "-"}</td>
                    <td className="py-2 px-4">{book.publisher || "-"}</td>
                    <td className="py-2 px-4">{book.publicationYear}</td>
                    <td className="py-2 px-4">{book.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="w-full flex justify-center">
          <div className="">
            {Array.from(Array(totalPages).keys()).map((page) => (
              <button
                key={page}
                className={`mx-2 px-4 py-2 border ${currentPage === page + 1
                    ? "bg-[#68c8f5] hover:bg-indigo-300 text-white"
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

