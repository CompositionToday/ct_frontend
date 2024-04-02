import { NavBar } from "./components/navigation/NavBar";
import { navItems } from "./components/navigation/NavItems";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Modal } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
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
