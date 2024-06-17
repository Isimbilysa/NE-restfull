import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
// import { Route, Router, BrowserRouter } from "react-router-dom";
import Login from "./components/login/Login";
import RegisterEmployees from "./components/RegisterEmployee/RegisterEmployee";
import PaginatedEmployees from "./components/employees/PaginatedEmployee";
import Home from "./components/home/Home";
import SucessMessage from "./components/home/SuccessMessage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" Component={Home} />
          <Route path="/register" Component={RegisterEmployees} />
          <Route path="/employees" Component={PaginatedEmployees} />
          <Route path="/" Component={Login}/>
          <Route path="/success" Component={SucessMessage}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
