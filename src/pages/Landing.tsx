import { NavBar } from "../components/navigation/NavBar";
import { navItems } from "../components/navigation/NavItems";
import { Container } from "@mantine/core";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";

export function Landing() {
  return (
    <Container fluid style={{ padding: 0 }}>
      <NavBar links={navItems.links} />
      <Hero />
      <Container fluid style={{ backgroundColor: "#001E3C" }}>
        <Features />
      </Container>
    </Container>
  );
}
