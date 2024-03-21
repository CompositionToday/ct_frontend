import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { UpdateInfo } from "./pages/UpdateInfo";
import { Route, Routes, useLocation } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { About } from "./pages/AboutUs";
import { NotFound } from "./pages/NotFound";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Jobs } from "./pages/Jobs";
import { Competitions } from "./pages/Competitions";
import { Users } from "./pages/adminView/Users";
import { Festivals } from "./pages/Festivals";
import { CreateOpportunityPage } from "./pages/CreateOpportunityPage";
import { Concerts } from "./pages/Concerts";
import { BannedUser } from "./pages/BannedUser";
import { RecentPosts } from "./pages/adminView/RecentPosts";
import { MyPosts } from "./pages/MyPosts";
import { AnimatePresence } from "framer-motion";
import { VerifyEmail } from "./pages/VerifyEmail";
import { Compositions } from "./pages/Compositions";
import { Reported } from "./pages/adminView/Reported";
import { News } from "./pages/News";
import { Blog } from "./pages/Blog";
import {CreateBlogOpportunityPage} from "./pages/CreateBlogOpportunityPage";
import { ScrapedPostApproval } from "./pages/adminView/ScrapedPostApproval";
import {NewsOpportunity} from "./components/opportunity/NewsOpportunity";

export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/updateinfo" element={<UpdateInfo />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/festivals" element={<Festivals />} />
        <Route path="/admin/reported" element={<Reported />} />
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/compositions" element={<Compositions />} />
        <Route path="/admin/scrapedPosts" element={<ScrapedPostApproval />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/create-opportunity" element={<CreateOpportunityPage />} />
        <Route path="/admin/recent-posts" element={<RecentPosts />} />
        <Route path="/admin/create-blog-post" element={<CreateBlogOpportunityPage/>} />
        <Route path="/my-posts" element={<MyPosts/>} />
        <Route path="/banned" element={<BannedUser />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/news" element={<NewsOpportunity apiEndpoint={"news"}/>} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}
