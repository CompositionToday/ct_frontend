import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { HashRouter, Route, Routes } from "react-router-dom";
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
import { BannedUser } from "./pages/BannedUser";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { RecentPosts } from "./pages/adminView/RecentPosts";
import { MyPosts } from "./pages/MyPosts";
import { Footer } from "./components/footer/Footer";
import { footerInfo } from "./components/footer/FooterInfo";

export default function App() {
  return (
    <MantineProvider>
      <ModalsProvider>
        <NotificationsProvider>
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
              <Route
                path="/create-opportunity"
                element={<CreateOpportunityPage />}
              />
              <Route path="/admin/recent-posts" element={<RecentPosts />} />
              <Route path="/my-posts" element={<MyPosts />} />
              <Route path="/banned" element={<BannedUser />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer data={footerInfo.data} />
          </HashRouter>
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
