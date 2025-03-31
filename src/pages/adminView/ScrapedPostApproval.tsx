import React, { useState } from "react";
import { useEffect } from "react";
import { Center, Container, MediaQuery, Select, createStyles } from "@mantine/core"; // assuming Select is a dropdown component from Mantine
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { footerInfo } from "../../components/footer/FooterInfo";
import { Footer } from "../../components/footer/Footer";
import { UsersList } from "../../components/adminView/UsersList";
import { Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { setNavigationProgress } from "@mantine/nprogress";
import { ScrapedNews } from "../../components/adminView/ScrapedNews";
import { ScrapedFestivals } from "../../components/adminView/ScrapedFestivals";
import { ScrapedJobs } from "../../components/adminView/ScrapedJobs";
import { ScrapedConcerts } from "../../components/adminView/ScrapedConcerts";
import { ScrapedCompetitions } from "../../components/adminView/ScrapedCompetitions";
import { ScrapedResearch } from "../../components/adminView/ScrapedResearch";

const greenTriangle = require("../../images/GreenTriangle.png");
const blueTriangle = require("../../images/BlueTriangle.png");

const useStyles = createStyles((theme) => ({
  container: {
    padding: "0px",
    marginTop: "40px",
    
    top: "10%",
    paddingLeft: '5%',
    paddingRight: '5%',
    zIndex: 999,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : "white",

    [theme.fn.smallerThan("md")]: {
      paddingLeft: "15px",
      paddingRight: "15px",
      
    },
  },

  search: {
    borderColor: "#939393",

    flexBasis: "100%",
    marginRight: "15px",

    [theme.fn.largerThan("md")]: {
      flexBasis: "40%",
    },
  },
  buttonsContainer: {
    marginLeft: "auto",
    [theme.fn.smallerThan("md")]: {
      marginRight: "15px",
    },
  },
}));

export function ScrapedPostApproval() {
  const [selectedOption, setSelectedOption] = useState("News");
  const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";
  const navigate = useNavigate();
  const { classes } = useStyles();

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

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

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
              position: "fixed",
              right: "0px",
            }}
          />
        </MediaQuery>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Image
            src={String(greenTriangle)}
            style={{ width: "24%", position: "fixed", bottom: "0px" }}
          />
        </MediaQuery>
        <Container
        className={classes.container}
      >
        <Select
          data={[
            { value: "News", label: "News" },
            { value: "Jobs", label: "Jobs" },
            { value: "Competitions", label: "Competitions" },
            { value: "Festivals", label: "Festivals" },
            { value: "Concerts", label: "Concerts" },
            { value: "Research", label:"Research Papers"},
          ]}
          value={selectedOption}
          onChange={handleSelectChange}
        />
      </Container>
        <div style={{ paddingBottom: "5%" }}>
        {selectedOption === "News" && (
          <>
            <Container
              style={{ textAlign: "center" }}
            >
              <h1 style={{ color: "#228be6", fontSize: "36px" }}>
                News
              </h1>
            </Container>
            <ScrapedNews />
          </>
        )}
        {selectedOption === "Jobs" && (
          <>
            <Container
              style={{ textAlign: "center" }}
            >
              <h1 style={{ color: "#228be6", fontSize: "36px" }}>
                Jobs
              </h1>
            </Container>
            <ScrapedJobs />
          </>
        )}
        {selectedOption === "Competitions" && (
          <>
            <Container
              style={{ textAlign: "center" }}
            >
              <h1 style={{ color: "#228be6", fontSize: "36px" }}>
                Competitions
              </h1>
            </Container>
            <ScrapedCompetitions />
          </>
        )}
        {selectedOption === "Festivals" && (
          <>
            <Container
              style={{ textAlign: "center" }}
            >
              <h1 style={{ color: "#228be6", fontSize: "36px" }}>
                Festivals
              </h1>
            </Container>
            <ScrapedFestivals />
          </>
        )}
        {selectedOption === "Concerts" && (
          <>
            <Container
              style={{ textAlign: "center" }}
            >
              <h1 style={{ color: "#228be6", fontSize: "36px" }}>
                Concerts
              </h1>
            </Container>
            <ScrapedConcerts />
          </>
        )}
        {selectedOption === "Research" && (
          <>
            <Container
              style={{ textAlign: "center" }}
            >
              <h1 style={{ color: "#228be6", fontSize: "36px" }}>
                Research Papers
              </h1>
            </Container>
            <ScrapedResearch />
          </>
        )}
        </div>
      </Container>
    </motion.div>
  );
}
