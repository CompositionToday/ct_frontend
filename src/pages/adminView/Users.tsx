import { useEffect } from "react";
import { Container, MediaQuery } from "@mantine/core";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { footerInfo } from "../../components/footer/FooterInfo";
import { Footer } from "../../components/footer/Footer";
import { UsersList } from "../../components/adminView/UsersList";
import { Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { setNavigationProgress } from "@mantine/nprogress";

const greenTriangle = require("../../images/GreenTriangle.png");
const blueTriangle = require("../../images/BlueTriangle.png");

export function Users() {
  const url = "http://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!user.emailVerified) {
          navigate("/verify");
        }

        let response = await fetch(
          `${url}/users?page_number=1&keyword=${user.email}`
        );

        let responseJson = await response.json();

        let userData = responseJson.listOfObjects[0];

        if (!userData.is_admin) {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    });
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Container fluid style={{ padding: 0 }}>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Image
            src={String(blueTriangle)}
            style={{
              width: "24%",
              position: "absolute",
              right: "0px",
            }}
          />
        </MediaQuery>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Image
            src={String(greenTriangle)}
            style={{ width: "24%", position: "absolute", bottom: "0px" }}
          />
        </MediaQuery>
        <UsersList />
      </Container>
    </motion.div>
  );
}
