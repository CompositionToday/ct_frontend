import {
  createStyles,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  Image,
} from "@mantine/core";

const jobIcon = require("../../images/JobIcon.png");
const ticketIcon = require("../../images/TicketIcon.png");
const trophyIcon = require("../../images/TrophyIcon.png");

const mockdata = [
  {
    title: "Search for Jobs",
    icon: jobIcon,
  },
  {
    title: "View Upcoming Festivals and Concerts",
    icon: ticketIcon,
  },
  {
    title: "Find Competitions",
    icon: trophyIcon,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 34,
    fontWeight: 900,
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
    width: 300,
    height: 300,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    fontSize: 23,
    textAlign: "center",
    marginTop: theme.spacing.sm,
  },

  featureCards: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flexWrap: "wrap",
  },

  image: {
    maxWidth: 110,
  },
}));

export function Features() {
  const { classes } = useStyles();
  const features = mockdata.map((feature) => (
    <Container>
      <Card key={feature.title} shadow="md" className={classes.card} p="xl">
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
      <Title order={2} className={classes.title} align="center" mt="xl">
        Explore Opportunities on <br />{" "}
        <span style={{ color: "#90CAF9" }}>Composition Today</span>
      </Title>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
