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
import {useColorScheme, useHotkeys} from "@mantine/hooks";
import { ColorSchemeProvider, ColorScheme } from '@mantine/core';

export default function App() {
    const preferredColorScheme = useColorScheme();
    const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    const [loading, setLoading] = useState(true);


    useHotkeys([['mod+J', () => toggleColorScheme()]]);


    setTimeout(() => {
    setLoading(false);
  }, 2500);

    if (process.env.NODE_ENV !== "development") {
        console.log = () => {};
        console.debug = () => {};
        console.info = () => {};
        console.warn = () => {};
    }

  return (
    <>
      <Modal
        opened={loading}
        onClose={() => console.log("closing page load modal")}
        fullScreen
      >
        <LoadingOverlay
          visible={loading}
          overlayOpacity={1}
          overlayBlur={1}
          transitionDuration={400}
          loaderProps={{ variant: "bars" }}
          zIndex={2}
        />
      </Modal>

        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{
              colorScheme: colorScheme,
          }} withGlobalStyles withNormalizeCSS>
            <ModalsProvider>
              <NotificationsProvider>
                <BrowserRouter>

                    {/* This is the Navbar at the top of every Page*/}
                  <NavBar links={navItems.links} />

                    {/*This is the Container with all the event Listings*/}
                  <AnimatedRoutes />

                    {/*This is the footer at the bottom of the Webpage */}
                  <Footer data={footerInfo.data} />

                </BrowserRouter>
              </NotificationsProvider>
            </ModalsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
    </>
  );
}
