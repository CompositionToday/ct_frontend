import { useEffect } from "react";
import { NavBar } from "../../components/navigation/NavBar";
import { navItems } from "../../components/navigation/NavItems";
import { Container } from "@mantine/core";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { footerInfo } from "../../components/footer/FooterInfo";
import { Footer } from "../../components/footer/Footer";
import { UsersList } from "../../components/adminView/UsersList";
import { Image } from "@mantine/core";

const greenTriangle = require("../../images/GreenTriangle.png");
const blueTriangle = require("../../images/BlueTriangle.png");

export function Users() {
  return (
    <Container fluid style={{ padding: 0 }}>
      <Image
        src={String(blueTriangle)}
        style={{
          width: "24%",
          position: "absolute",
          right: "0px",
        }}
      />
      <Image
        src={String(greenTriangle)}
        style={{ width: "24%", position: "absolute", bottom: "0px" }}
      />
      <UsersList />
      <Footer data={footerInfo.data} />
    </Container>
  );
}
