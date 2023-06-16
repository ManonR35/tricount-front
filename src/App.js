import { Routes, Route } from "react-router-dom";
import "./App.css";
import CreateUser from "./pages/user/createUser.js";
import Users from "./pages/user/users.js";
import Categories from "./pages/category/categories.js";
import CreateCategory from "./pages/category/createCategory.js";
import CreateExpense from "./pages/expense/createExpense.js";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/user/create" element={<CreateUser />}></Route>
          <Route path="/category/create" element={<CreateCategory />}></Route>
          <Route path="/categories" element={<Categories />}></Route>
          <Route path="/expense/create" element={<CreateExpense />}></Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
