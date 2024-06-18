import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
// import { Route, Router, BrowserRouter } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import PaginatedBooks from "./components/Books/PaginatedBooks"
import Home from "./components/home/Home";
// import SucessMessage from "./components/home/SuccessMessage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" Component={Home} />
          <Route path="/" Component={Register} />
          
          <Route path="/login" Component={Login}/>
          <Route path="/books" Component={PaginatedBooks} />
          {/* <Route path="/success" Component={SucessMessage}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
