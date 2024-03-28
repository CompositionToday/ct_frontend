import { useState, useRef, useEffect } from "react";
import {
  createStyles,
  Container,
  Title,
  Text,
  Image,
  Button, Badge, Group, useMantineTheme, useMantineColorScheme,

} from "@mantine/core";
import { Teeter } from "../animations/AnimateOnHover";
import { IconExternalLink, IconScubaMask } from "@tabler/icons";
import { motion } from "framer-motion";
// @ts-ignore
import { useWindowSize } from "@uidotdev/usehooks";
import ScubaMask from "../../images/scuba-mask.png";
import Eyes from "../../images/eyes.png";

import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FeaturedComposition } from "../../FeaturedComposition";
import { auth } from "../../Firebase";
import genreIcon from "../../images/BigMusicNote.png";
import {Carousel} from "@mantine/carousel";
import {useColorScheme} from "@mantine/hooks";

// let firstPass = true;
const heroLogo = require("../../images/HeroLogo.png");
const scubaLogo = require("../../images/scuba-mask.png");
const appStoreButton = require("../../images/iosAppButton.png");
const googleplayStoreButton = require("../../images/androidAppButton.png");
const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";
const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    // paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl * 6,
  },

  content: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    flexWrap: "wrap",

    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : "#454545",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 55,
    lineHeight: 1.2,
    fontWeight: 800,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 36,
    },
  },

  card: {
    color: theme.colorScheme === "dark" ? theme.white : "#454545",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    borderRadius:"md",
    textAlign:"center",
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  carousel: {
    backgroundColor:theme.colorScheme === "dark" ? theme.colors.gray[0] : "#454545"
  },

  image: {
    flex: 1,
    // maxWidth: "40vw",
    // marginLeft: 40,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },

  textHighlight: {
    lineHeight: 0,
  },

  h3: {
    height: "2px",
    color: theme.colorScheme === "dark" ? "#909296" : "#454545",
  },

  a: {
    // width:"200px",
    width:"45%",
    height:"52px",
  },

  container: {
    maxWidth: "75vw",

    [theme.fn.smallerThan("md")]: {
      maxWidth: "85vw",
    },
  },

  subheading: {
    fontSize: 25,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 22,
    },
  },
  featuredList: {
    justifyContent: "center",
    background: theme.colorScheme === "dark" ? theme.colors.dark[7] : "white",
  },
}));

export function Hero() {
  const { classes } = useStyles();
  const [rotateDegree, setRotateDegree] = useState(0);
  const [heroImageClick, setHeroImageClick] = useState(0);
  const [displayEasterEgg, setDisplayEasterEgg] = useState(0);
  const [featuredlist, setList] = useState<FeaturedComposition[]>([]);
  const theme = useColorScheme();
  const windowSize = useWindowSize();


  function angle(cx: number, cy: number, ex: number, ey: number) {
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx);
    const deg = (rad * 180) / Math.PI;
    return deg;
  }

  const handleMouseMove = (e: MouseEvent) => {
    const anchor = document.getElementById("anchor");
    const rect = anchor?.getBoundingClientRect();

    const anchorX = rect?.left! + rect?.width! / 2;
    const anchorY = rect?.top! + rect?.height! / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);

    setRotateDegree(angleDeg);
    console.log("moving event mouse");
  };
  const getFeaturedList = async () => {
    let response = await fetch(`${url}/featuredcompositions`);
    let responseJson = await response.json();
    const deepCopyOfObject = JSON.parse(
      JSON.stringify(responseJson.listOfObjects)
    );
    let x = deepCopyOfObject.length;
    let list = new Array<FeaturedComposition>();
      for (let i = 0; i < x; i++) {
        let val = new FeaturedComposition(
          deepCopyOfObject[i].title,
          deepCopyOfObject[i].link,
          deepCopyOfObject[i].first_name,
          deepCopyOfObject[i].last_name,
          deepCopyOfObject[i].genre,
          deepCopyOfObject[i].description,
  null,
  i%2
        );
        list.push(val);
      }
    setList([...featuredlist, ...list]);
  };

  useEffect(() => {
    getFeaturedList();
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (heroImageClick >= 23) {
      setDisplayEasterEgg(1);
    }
  }, [heroImageClick]);

  return (
    <div>
      <Container className={classes.container}>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title} mb="xl">
              The Best Way to Discover{" "}
              {/* <span className={classes.blueText}>Music Opportunities</span> */}
              <Text
                span
                fw={800}
                className={classes.textHighlight}
                variant="gradient"
                gradient={{ from: "cyan", to: "blue", deg: 45 }}
              >
                Music{" "}
              </Text>
              <Text
                span
                fw={800}
                className={classes.textHighlight}
                variant="gradient"
                gradient={{ from: "green", to: "blue", deg: 45 }}
              >
                Opportunities
              </Text>
            </Title>

            <Text color="dimmed" mt="xl" className={classes.subheading}>
              An online hub for musicians to find jobs, competitions, festivals,
              and concerts.
            </Text>

            <Text mt="xl" className={classes.subheading}>
              Now available on {" "}

              <Text
                  span
                  fw={800}
                  className={classes.textHighlight}
                  variant="gradient"
                  gradient={{ from: 'teal', to: 'lime', deg: 45 }}
              >
                Android
              </Text>


              {" "} and {" "}

              <Text
                  span
                  fw={800}
                  className={classes.textHighlight}
                  variant="gradient"
                  gradient={{ from: 'grape', to: 'indigo', deg: 45 }}
              >
                iOS
              </Text>
              !
            </Text>


            <Group spacing={"xs"} className={classes.subheading}>
              <a
                  href={"https://play.google.com"}
                  className={classes.a}
                  style={{paddingTop:"2%"}}
              >
                <img
                    src={googleplayStoreButton}
                    height={"auto"}
                    width={"100%"}
                />
              </a>

              <a
                  href={"https://www.apple.com/app-store/"}
                  className={classes.a}
                  style={{paddingTop:"2%"}}
              >
                <img
                    src={appStoreButton}
                    height={"auto"}
                    width={"100%"}
                />
              </a>
            </Group>


          </div>
          <div
            style={{
              display: !displayEasterEgg ? "block" : "none",
              opacity: !displayEasterEgg ? 1 : 0,
            }}
          >
            <Teeter rotation={5} timing={120}>
              <Image
                src={String(heroLogo)}
                className={classes.image}
                onClick={() => setHeroImageClick(heroImageClick + 1)}
              />
            </Teeter>
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
            <IconScubaMask
              size="lg"
              color="#359fec"
              className={classes.image}
              id="anchor"
            />
            {/* <img src={Eyes} style={{ position: "absolute" }} /> */}
            <div
              style={{
                position: "absolute",
                padding: "0px",
                paddingTop: "9%",
                borderRadius: "10px",
                top: "40%",
                left: "23%",
                transform: `rotate(${90 + rotateDegree}deg)`,
              }}
              className="eye"
            >
              <div
                style={{
                  background: useMantineTheme().colorScheme === "dark" ? "white" : "black",
                  borderRadius: "10px",
                  padding: "0.45vw",
                }}
                className={classes.image}
              ></div>
            </div>
            <div
              style={{
                position: "absolute",
                padding: "0px",
                paddingTop: "9%",
                borderRadius: "10px",
                top: "40%",
                right: "39%",
                transform: `rotate(${90 + rotateDegree}deg)`,
              }}
              className="eye"
            >
              <div
                style={{
                  background: useMantineTheme().colorScheme === "dark" ? "white" : "black",
                  borderRadius: "10px",
                  padding: "0.45vw",
                }}
                className={classes.image}
              ></div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
