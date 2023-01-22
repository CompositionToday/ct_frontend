import { useEffect } from "react";
import { NavBar } from "../../components/navigation/NavBar";
import { navItems } from "../../components/navigation/NavItems";
import { Container } from "@mantine/core";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { footerInfo } from "../../components/footer/FooterInfo";
import { Footer } from "../../components/footer/Footer";
import { UsersList } from "../../components/adminView/UsersList";

export function Users() {
  return (
    <Container fluid style={{ padding: 0 }}>
      <UsersList />
      <Footer data={footerInfo.data} />
    </Container>
  );
}
