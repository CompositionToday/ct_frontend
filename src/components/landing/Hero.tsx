import { useState, useRef, useEffect } from "react";
import {
  createStyles,
  Container,
  Title,
  Text,
  Image,
  Button,
  Badge, Group,
} from "@mantine/core";
import { Teeter } from "../animations/AnimateOnHover";
import { IconExternalLink, IconScubaMask } from "@tabler/icons";
import { motion } from "framer-motion";
import ScubaMask from "../../images/scuba-mask.png";
import Eyes from "../../images/eyes.png";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { onAuthStateChanged } from "firebase/auth";
import { FeaturedComposition } from "../../FeaturedComposition";
import { auth } from "../../Firebase";
import genreIcon from "../../images/BigMusicNote.png";

let firstPass = true;
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

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
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

    // const eyes = document.querySelectorAll<HTMLElement>(`.eye`);
    // eyes.forEach((eye) => {
    //   eye.style.transform! = `rotate(${90 + angleDeg}deg)`;
    // });
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
    if (firstPass == true) {
      for (let i = 0; i < x; i++) {
        let val = new FeaturedComposition(
          deepCopyOfObject[i].title,
          deepCopyOfObject[i].link,
          deepCopyOfObject[i].first_name,
          deepCopyOfObject[i].last_name,
          deepCopyOfObject[i].genre,
          deepCopyOfObject[i].description
        );
        list.push(val);
      }
      firstPass = false;
      setList([...featuredlist, ...list]);
      console.log(featuredlist);
    }
  };
  // useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       try {
  //         let response = await fetch(`${url}/featuredcompositions`);
  //         let responseJson = await response.json();
  //         const deepCopyOfObject = JSON.parse(
  //           JSON.stringify(responseJson.listOfObjects)
  //         );
  //         let x = deepCopyOfObject.length;
  //         let list = new Array<FeaturedComposition>();
  //         if (firstPass == true) {
  //           for (let i = 0; i < x; i++) {
  //             let val = new FeaturedComposition(
  //               deepCopyOfObject[i].title,
  //               deepCopyOfObject[i].link,
  //               deepCopyOfObject[i].first_name,
  //               deepCopyOfObject[i].last_name,
  //               deepCopyOfObject[i].genre,
  //               deepCopyOfObject[i].description
  //             );
  //             list.push(val);
  //           }
  //           firstPass = false;
  //           setList([...featuredlist, ...list]);
  //           console.log(featuredlist);
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //   });
  // }, []);
  useEffect(() => {
    getFeaturedList();
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  // useEffect(() => {
  //   document.addEventListener("mousemove", handleMouseMove);

  //   return () => {
  //     document.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);
  useEffect(() => {
    if (heroImageClick >= 23) {
      setDisplayEasterEgg(1);
    }
  }, [heroImageClick]);
  var settings = {
    dots: true,
    dotsColor: "00000",
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "0px",
    
  };
  const featuredListStyle = {
    textalign: "center",
    backgroundColor: "blue",
  };
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
                  background: "black",
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
                  background: "black",
                  borderRadius: "10px",
                  padding: "0.45vw",
                }}
                className={classes.image}
              ></div>
            </div>
          </motion.div>
        </div>
        <div>
          <h2 style={{ textAlign: "center" }} className={classes.title}>
            Featured Compositions Of The Week
          </h2>
        </div>
        <div>
          <section className={classes.featuredList}>
            <Slider {...settings}>
              {featuredlist.map((featuredList) => (
                <div key={featuredList.title}>
                  <h1 className={classes.h3}>{featuredList.title}</h1>
                  <br />
                  <h3 className={classes.h3}>
                    <Badge
                      leftSection={
                        // <IconBriefcase
                        //   size={18}
                        //   color="#40C057"
                        //   style={{ marginBottom: "-3px" }}
                        // />
                        <img src={genreIcon} width={"20px"} />
                      }
                      color="gray"
                      sx={{
                        height: "25px",
                        margin: "3px 5px 3px 0px",
                      }}
                    ></Badge>
                    {featuredList.genre}
                  </h3>
                  <br />
                  {featuredList.awards ? (
                    <h3 className={classes.h3}>
                      Award/s: {featuredList.awards}
                    </h3>
                  ) : null}
                  <h3 style={{ height: "10px" }}>
                    <a href={featuredList.link} target="blank">
                      <Button
                        radius="md"
                        sx={{
                          height: 30,
                          alignSelf: "flex-start",
                          margin: "15px 0px",
                        }}
                        size="sm"
                        rightIcon={
                          <IconExternalLink style={{ marginLeft: "-5px" }} />
                        }
                      >
                        Link
                      </Button>
                    </a>
                  </h3>
                  <br />
                  <h3 className={classes.h3}>
                    by {featuredList.firstName} {featuredList.lastName}
                  </h3>
                  <br />
                  <h3 className={classes.h3}>{featuredList.description}</h3>
                </div>
              ))}
            </Slider>
            <div style={{ width: "100px" }}>
              <p style={{ color: "white" }}></p>
              <br />
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
