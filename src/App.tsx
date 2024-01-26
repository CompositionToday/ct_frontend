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
import { MantineProvider, Modal } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { RecentPosts } from "./pages/adminView/RecentPosts";
import { MyPosts } from "./pages/MyPosts";
import { Footer } from "./components/footer/Footer";
import { footerInfo } from "./components/footer/FooterInfo";
import { useState } from "react";

import { LoadingOverlay } from "@mantine/core";
import AnimatedRoutes from "./AnimatedRoutes";

import { BrowserRouter } from "react-router-dom";

export default function App() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2500);
  return (
    <>
      <Modal
        opened={loading}
        onClose={() => console.log("closing page load modal")}
        fullScreen
      >

        {/* This is the loading screen when the website is first loaded */}
        <LoadingOverlay
          visible={loading}
          overlayOpacity={1}
          overlayBlur={1}
          transitionDuration={400}
          loaderProps={{ variant: "bars" }}
          zIndex={2}
        />
      </Modal>

      <MantineProvider theme={{
          colorScheme: 'dark',
      }} withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <NotificationsProvider>
            <HashRouter>

                {/* This is the Navbar at the top of every Page*/}
              <NavBar links={navItems.links} />

                {/*This is the Container with all the event Listings*/}
              <AnimatedRoutes />

                {/*This is the footer at the bottom of the Webpage */}
              <Footer data={footerInfo.data} />

            </HashRouter>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}
