import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { About } from "./pages/AboutUs";
import { NotFound } from "./pages/NotFound";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Jobs } from "./pages/Jobs";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}
