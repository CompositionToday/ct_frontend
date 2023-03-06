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
import { useState } from "react";

import { LoadingOverlay } from "@mantine/core";
import AnimatedRoutes from "./AnimatedRoutes";

export default function App() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2500);
  return (
    <>
      <LoadingOverlay
        visible={loading}
        overlayOpacity={1}
        overlayBlur={1}
        transitionDuration={400}
        loaderProps={{ variant: "bars" }}
      />
      <MantineProvider>
        <ModalsProvider>
          <NotificationsProvider>
            <HashRouter>
              <NavBar links={navItems.links} />
              <AnimatedRoutes />
              <Footer data={footerInfo.data} />
            </HashRouter>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}
