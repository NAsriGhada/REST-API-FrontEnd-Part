import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddUser from "./pages/AddUser";
import UsersList from "./pages/UsersList";
import Edit from "./pages/Edit";


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/update/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
