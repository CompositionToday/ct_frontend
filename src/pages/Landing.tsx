import { useEffect } from "react";
import { NavBar } from "../components/navigation/NavBar";
import { navItems } from "../components/navigation/NavItems";
import { Container } from "@mantine/core";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { RegisterCTA } from "../components/landing/RegisterCTA";
import { auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { footerInfo } from "../components/footer/FooterInfo";
import { Footer } from "../components/footer/Footer";

export function Landing() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;

      console.log(user?.email);
    });
  });

  return (
    <Container fluid style={{ padding: 0 }}>
      <NavBar links={navItems.links} />
      <Hero />
      <Container fluid style={{ backgroundColor: "#001E3C" }}>
        <Features />
      </Container>
      <RegisterCTA />
      <Footer data={footerInfo.data} />
    </Container>
  );
}
