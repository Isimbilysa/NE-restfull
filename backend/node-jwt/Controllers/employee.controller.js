const db = require("../models/index");

const createEmployee = async(req, res) => {
    try{
        const {firstname, lastname, nationalIdentity, telephone, email, department, position, laptopManufacturer, model, serialNumber} = req.body;

        const newEmployee = await db.Employee.create({
            firstname,
            lastname, 
            nationalIdentity,
            telephone,
            email,
            department,
            position,
            laptopManufacturer,
            model,
            serialNumber
        });

        return res.status(200).json({message: "Employee createsuccessfully"});
    } catch(error) {
        console.error("Error in creating employee: ", error);
        return res.status(500).json({error: "Error in creating employee"});
    }
}


const getAllEmployees = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const limit = parseInt(pageSize, 10) || 10;
    const offset = (pageNumber - 1) * limit;

    const { count, rows } = await db.Employee.findAndCountAll({
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      employees: rows,
      totalPages,
      currentPage: pageNumber,
      pageSize: limit,
      totalEmployees: count,
    });
  } catch (error) {
    console.error("Error in retrieving employees:", error);
    return res.status(500).json({ error: "Error in retrieving employees" });
  }
};

module.exports = {createEmployee, getAllEmployees};