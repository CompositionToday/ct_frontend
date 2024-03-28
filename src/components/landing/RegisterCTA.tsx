import { AnimateIn } from "../animations/AnimateOnScroll";

import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid, useMantineTheme,
} from "@mantine/core";

import React, { useEffect, useState } from "react";
import image from "../../images/SignUp.png";
import { useNavigate } from "react-router-dom";
import {IconMoodSmile, IconPlanet} from "@tabler/icons";
import { motion } from "framer-motion";


const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 100,
    paddingBottom: 40,
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 1080,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "90vw",
    },
  },


  title: {
    fontWeight: 800,
    fontSize: 44,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    // color: "#454545",
    // color: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    // color: "white",
    color: theme.colorScheme === "dark" ? "#FFFFFF" :"#228be6",
    [theme.fn.smallerThan("sm")]: {
      fontSize: 22,
    },

    [theme.fn.smallerThan("sm")]: {
      fontSize: 28,
    },
  },

  subtitle: {
    fontSize: 25,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 18,
    },
  },

  control: {
    fontSize: 18,
  },

  image: {
    maxWidth: 450,
    [theme.fn.smallerThan("sm")]: { maxWidth: 250, },
  },

  musicBarsImg: {
    maxWidth: 470,
    marginLeft: "-20px",
    marginBottom: "40px",
    [theme.fn.smallerThan("sm")]: {
      marginLeft: "0px",
      maxWidth: 270,
    },
  },

  centerText: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    flexWrap: "wrap",
  },

  centerImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    [theme.fn.smallerThan("md")]: {
      paddingLeft: 30,
      paddingRight: 30,
    },
  },
}));

const musicBars = require("../../images/MusicBars.png");

export function RegisterCTA() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [heroImageClick, setHeroImageClick] = useState(0);
  const [displayEasterEgg, setDisplayEasterEgg] = useState(0);

  useEffect(() => {
    if (heroImageClick >= 24) {
      setDisplayEasterEgg(1);
    }
  }, [heroImageClick]);

  return (
      <Container className={classes.root}>
        <AnimateIn>
          <SimpleGrid
              spacing={80}
              cols={2}
              breakpoints={[{ maxWidth: "sm", cols: 1, spacing: 40 }]}
              className={classes.container}
          >
            <div className={classes.centerText}>
              <Image src={String(musicBars)} className={classes.musicBarsImg} />
              <Title className={classes.title}>Want to contribute?</Title>
              <Text color="dimmed" className={classes.subtitle}>
                Create an account with us today to post opportunities you've come
                across.
              </Text>
              <Button
                  variant = {useMantineTheme().colorScheme === "dark" ? "outline" : "filled"}
                  size="xl"
                  radius={"lg"}
                  mt="xl"
                  className={classes.control}
                  onClick={() => navigate("/register")}
              >
                Create an Account
              </Button>
            </div>
            <div
                className={classes.centerImage}
                style={{
                  display: !displayEasterEgg ? "block" : "none",
                  opacity: !displayEasterEgg ? 1 : 0,
                }}

            >
              <Image
                  src={image}
                  className={classes.image}
                  onClick={() => setHeroImageClick(heroImageClick + 1)}
              />
            </div>
            <motion.div
                key={displayEasterEgg}
                initial={{ opacity: 0, scale: 0, rotate: 270 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  transition: { duration: 1 },
                }}
                className={classes.image}
                style={{
                  position: "relative",
                  display: displayEasterEgg ? "block" : "none",
                }}
            >
              <IconMoodSmile
                  size="md"
                  color="#359fec"
                  className={classes.image}
                  id="anchor"
              />
              {/*<p>FILLER EASTER EGG MESSAGE</p>*/}
          </motion.div>

          </SimpleGrid>
        </AnimateIn>
      </Container>
  );
}