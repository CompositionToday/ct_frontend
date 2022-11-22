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
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 32,
    fontWeight: 900,
    letterSpacing: 2,
    paddingBottom: 35,
    color: "white",
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24,
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
    width: 225,
    height: 225,
    border: `6px solid #FFFFFF`,

    "&:hover": {
      border: `6px solid #90CAF9`,
    },
  },

  cardTitle: {
    width: "100%",
    fontSize: 23,
    fontWeight: 500,
    color: "#2F2F2F",
    textAlign: "center",
  },

  featureCards: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flexWrap: "wrap",
  },

  featureContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    marginTop: -20,
    maxWidth: 80,
  },
}));

export function Features() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const features = mockdata.map((feature) => (
    <Container>
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
      size="lg"
      py="xl"
      style={{ paddingTop: 100, paddingBottom: 100 }}
    >
      <AnimateIn>
        <Title order={2} className={classes.title} align="center" mt="xl">
          Explore Opportunities on <br />{" "}
          <span style={{ color: "#90CAF9" }}>Composition Today</span>
        </Title>
      </AnimateIn>
      <AnimateIn>
        <Container mb="xl">
          <SimpleGrid
            cols={4}
            spacing="sm"
            mt={50}
            breakpoints={[{ maxWidth: "md", cols: 1 }]}
            className={classes.featureContainer}
          >
            {features}
          </SimpleGrid>
        </Container>
      </AnimateIn>
    </Container>
  );
}
