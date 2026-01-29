import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login"
import Dashboard from "../pages/Dashboard/Dashboard";
import Users from "../pages/Users/Users";
import UserDetails from "../pages/UserDetails/UserDetails";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
