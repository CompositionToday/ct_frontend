import { createStyles, Container, Title, Text, Image } from "@mantine/core";
import { Teeter } from "../animations/AnimateOnHover";

const heroLogo = require("../../images/HeroLogo.png");

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl,
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

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,
    minWidth: 480,

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

  blueText: {
    // fontWeight: 800,
    // color: "#228BE6",
  },

  textHighlight: {
    lineHeight: 0,
  },

  container: {
    maxWidth: 1080,
  },

  subheading: {
    fontSize: 25,
  },
}));

export function Hero() {
  const { classes } = useStyles();
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
          <Teeter rotation={5} timing={120}>
            <Image src={String(heroLogo)} className={classes.image} />
          </Teeter>
        </div>
      </Container>
    </div>
  );
}
