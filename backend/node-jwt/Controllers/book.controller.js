const Book = require("../models/book");
const {v4} = require("uuid");

const createBook = async(req, res) => {
    try{
        const {name, author, publisher, publicationYear, subject} = req.body;

        const newBook = await Book.create({
            id: v4(),
            name,
            author,
            publisher,
            publicationYear,
            subject
        });

        return res.status(200).json({message: "Book created successfully", newBook});
    } catch(error) {
        console.error("Error in creating book: ", error);
        return res.status(500).json({error: "Error in creating book"});
    }
}


const getAllBooks = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const limit = parseInt(pageSize, 10) || 10;
    const offset = (pageNumber - 1) * limit;

    const { count, rows } = await Book.findAndCountAll({
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      book: rows,
      totalPages,
      currentPage: pageNumber,
      pageSize: limit,
      totalBooks: count,
    });
  } catch (error) {
    console.error("Error in retrieving Books:", error);
    return res.status(500).json({ error: "Error in retrieving Books" });
  }
};

module.exports = {createBook, getAllBooks};