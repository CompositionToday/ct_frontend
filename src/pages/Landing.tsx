import { useEffect } from "react";
import { Container } from "@mantine/core";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { RegisterCTA } from "../components/landing/RegisterCTA";
import { auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import {FeaturedCompositions} from "../components/landing/FeaturedCompositions";

export function Landing() {
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (!user) return;
  //   });
  // });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Container fluid style={{ padding: 0, marginTop: 120 }}>
        <Hero />
        <FeaturedCompositions/>

        <Container fluid style={{ backgroundColor: "#001E3C" }}>
          <Features />
        </Container>
        <RegisterCTA />
      </Container>
    </motion.div>
  );
}
