import { useState, useRef, useEffect } from "react";
import { createStyles, Container, Title, Text, Image } from "@mantine/core";
import { Teeter } from "../animations/AnimateOnHover";
import { IconScubaMask } from "@tabler/icons";
import { motion } from "framer-motion";
import ScubaMask from "../../images/scuba-mask.png";
import Eyes from "../../images/eyes.png";

const heroLogo = require("../../images/HeroLogo.png");
const scubaLogo = require("../../images/scuba-mask.png");

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
}));

export function Hero() {
  const { classes } = useStyles();
  const [rotateDegree, setRotateDegree] = useState(0);
  const [heroImageClick, setHeroImageClick] = useState(0);
  const [displayEasterEgg, setDisplayEasterEgg] = useState(0);

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
  };

  useEffect(() => {
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
      </Container>
    </div>
  );
}
