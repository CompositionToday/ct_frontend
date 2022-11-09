import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
