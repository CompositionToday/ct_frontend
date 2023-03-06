import { AnimateIn } from "../animations/AnimateOnScroll";

import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";
import image from "../../images/SignUp.png";
import { useNavigate } from "react-router-dom";

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
    color: "#454545",

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
    [theme.fn.smallerThan("sm")]: {
      maxWidth: 250,
    },
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
              variant="outline"
              size="xl"
              mt="xl"
              className={classes.control}
              onClick={() => navigate("/register")}
            >
              Create an Account
            </Button>
          </div>
          <div className={classes.centerImage}>
            <Image src={image} className={classes.image} />
          </div>
        </SimpleGrid>
      </AnimateIn>
    </Container>
  );
}
