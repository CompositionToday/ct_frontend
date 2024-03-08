import { AnimateIn } from "../animations/AnimateOnScroll";

import {
  createStyles,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  Image,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const jobIcon = require("../../images/JobIcon.png");
const ticketIcon = require("../../images/TicketIcon.png");
const trophyIcon = require("../../images/TrophyIcon.png");
const instrumentIcon = require("../../images/InstrumentIcon.png");
const compositionsIcon = require("../../images/CompositionsIcon.png");
const blogIcon = require("../../images/BlogIcon.png");
const newsIcon = require("../../images/NewsIcon.png");

const mockdata = [
  {
    link: "/jobs",
    title: "Jobs",
    icon: jobIcon,
  },
  {
    link: "/competitions",
    title: "Competitions",
    icon: trophyIcon,
  },
  {
    link: "/festivals",
    title: "Festivals",
    icon: ticketIcon,
  },
  {
    link: "/concerts",
    title: "Concerts",
    icon: instrumentIcon,
  },
  {
    link: "/news",
    title: "News",
    icon: newsIcon,
  },
  {
    link: "/blog",
    title: "Blog",
    icon: blogIcon,
  },
  {
    link: "/competitions",
    title: "Compositions",
    icon: compositionsIcon,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 32,
    fontWeight: 900,
    letterSpacing: 2,
    paddingBottom: 35,
    color: "white",
    [theme.fn.smallerThan("sm")]: {
      fontSize: 22,
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    borderRadius: "50%",
    width: 200,
    height: 200,
    border: `10px solid #228BE6`,
    borderStyle: "double",

    "&:hover": {
      border: `6px solid #90CAF9`,
      cursor: `pointer`,
    },

    [theme.fn.smallerThan("sm")]: {
      width: 145,
      height: 145,
    },
  },

  cardTitle: {
    width: "100%",
    fontSize: 18,
    fontWeight: 500,
    color: "#454545",
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      fontSize: 14,
    },
  },

  featureCards: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flexWrap: "wrap",
    padding: 0,
  },

  feature: {
    padding: 0,

    [theme.fn.smallerThan("sm")]: {
      padding: 0,
    },
  },

  featureContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%",
  },

  image: {
    marginTop: -20,
    maxWidth: 80,

    [theme.fn.smallerThan("sm")]: {
      marginTop: -10,
      maxWidth: 55,
    },
  },

  container: {
    maxWidth: "100%",

    [theme.fn.smallerThan("sm")]: {
      padding: 0,
    },
  },

  grid: {
    gap: 50,

    [theme.fn.smallerThan("md")]: {
      gap: "40px 60px",
    },
    [theme.fn.smallerThan("sm")]: {
      gap: "40px 16px",
    },
  },
}));

export function Features() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const features = mockdata.map((feature) => (
    <Container className={classes.feature}>
      <Card
        key={feature.title}
        shadow="md"
        className={classes.card}
        p="xl"
        onClick={() => navigate(feature.link)}
      >
        <Container className={classes.featureCards}>
          <Image src={String(feature.icon)} className={classes.image} />
          <Text className={classes.cardTitle} mt="md">
            {feature.title}
          </Text>
        </Container>
      </Card>
    </Container>
  ));
  return (
    <Container
      py="xl"
      style={{ paddingTop: 100, paddingBottom: 100 }}
      className={classes.container}
    >

      {/*Button List of all the Tabs on the Homepage*/}
      <AnimateIn>
        <Title order={2} className={classes.title} align="center" mt="xl">
          Explore Opportunities and Events on <br />{" "}
          <span style={{ color: "#90CAF9" }}>Composition Today</span>
        </Title>
      </AnimateIn>

      {/*7x1 Row of the Buttons for each category*/}
      <AnimateIn>
        <Container mb="xl" className={classes.featureContainer}>
          <SimpleGrid
            cols={4}
            mt={50}
            className={classes.grid}
            breakpoints={[{ maxWidth: "md", cols: 2 }]}
          >
            {features.slice(0,4)}
          </SimpleGrid>

        </Container>
        <Container mb="xl" className={classes.featureContainer}>
          <SimpleGrid
              cols={3}
              className={classes.grid}
              breakpoints={[{ maxWidth: "md", cols: 2 }]}
          >
            {features.slice(4,7)}
          </SimpleGrid>
        </Container>
      </AnimateIn>

    </Container>
  );
}
