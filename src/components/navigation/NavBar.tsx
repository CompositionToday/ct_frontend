import {
  createStyles,
  Header,
  Container,
  Group,
  Button,
  Burger,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

const musicNoteIcon = require("../../images/MusicNote.png");

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },

  title: {
    color: "#2F2F2F",
    fontSize: 18,
    textDecoration: "none",
    fontWeight: 600,
  },

  grayText: {
    color: "#2F2F2F",
  },

  blueText: {
    color: "#228BE6",
  },

  image: {
    maxWidth: 30,
  },
}));

interface HeaderActionProps {
  links: {
    link: string;
    label: string;
  }[];
}

export function NavBar({ links }: HeaderActionProps) {
  const navigate = useNavigate();

  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const items = links.map((link) => {
    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={() => navigate(link.link)}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mt={10} mb={120}>
      <Container className={classes.inner} fluid>
        <Group style={{ paddingLeft: 25 }}>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Group spacing="xs">
            <a
              href={"/about"}
              className={classes.title}
              onClick={() => navigate("/about")}
            >
              COMPOSITION:<span className={classes.blueText}>TODAY</span>
            </a>
            {/* <Title order={5} className={classes.grayText}>
              COMPOSITION:<span className={classes.blueText}>TODAY</span>
            </Title> */}
            <Image src={String(musicNoteIcon)} className={classes.image} />
          </Group>
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <Group style={{ paddingRight: 25 }}>
          <Button
            variant="subtle"
            sx={{ height: 30 }}
            size="md"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            radius="md"
            sx={{ height: 30 }}
            size="md"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Group>
      </Container>
    </Header>
  );
}
