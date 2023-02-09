import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { About } from "./pages/AboutUs";
import { NotFound } from "./pages/NotFound";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Jobs } from "./pages/Jobs";
import { Competitions } from "./pages/Competitions";
import { NavBar } from "./components/navigation/NavBar";
import { navItems } from "./components/navigation/NavItems";
import { Users } from "./pages/adminView/Users";
import { Festivals } from "./pages/Festivals";
import { CreateOpportunityPage } from "./pages/CreateOpportunityPage";
import { Concerts } from "./pages/Concerts";
import { JustinNavbar } from "./pages/JustinNavbar";
import { BannedPage } from "./pages/BannedPage";

export default function App() {
  return (
    <HashRouter>
      <NavBar links={navItems.links} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/festivals" element={<Festivals />} />
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/create-opportunity" element={<CreateOpportunityPage />} />
        <Route path="/navbar-mobile" element={<JustinNavbar />} />
        <Route path="/banned" element={<BannedPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}
