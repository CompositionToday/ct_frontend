import { useState, useEffect } from "react";
import { auth } from "../../Firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
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
import { sign } from "crypto";

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
      cursor: `pointer`,
    },
  },

  linkLabel: {
    marginRight: 5,
  },

  title: {
    color: "#454545",
    fontSize: 18,
    textDecoration: "none",
    fontWeight: 600,
  },

  grayText: {
    color: "#454545",
  },

  blueText: {
    color: "#228BE6",
  },

  image: {
    maxWidth: 30,
  },

  logoGroup: {
    gap: 5,

    "&:hover": {
      cursor: `pointer`,
    },
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
  const [signedIn, setSignedIn] = useState(false);
  const items = links.map((link) => {
    return (
      <a
        key={link.label}
        className={classes.link}
        onClick={() => navigate(link.link)}
      >
        {link.label}
      </a>
    );
  });

  const HandleUserButton: React.FC = () => {
    return signedIn ? (
      <Group style={{ paddingRight: 25 }}>
        <Button
          variant="subtle"
          sx={{ height: 30 }}
          size="md"
          onClick={() => signOut(auth)}
        >
          Sign Out
        </Button>
      </Group>
    ) : (
      <Group style={{ paddingRight: 25 }}>
        <Button
          variant="subtle"
          sx={{ height: 30 }}
          size="md"
          color="blue"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          radius="md"
          sx={{ height: 30 }}
          size="md"
          // variant="gradient"
          // gradient={{ from: 'green', to: 'blue', deg: 60 }}
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Group>
    );
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    });
  }, []);

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mt={10}>
      <Container className={classes.inner} fluid>
        <Group style={{ paddingLeft: 25 }}>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Group spacing="xs" className={classes.logoGroup}>
            <a className={classes.title} onClick={() => navigate("/")}>
              COMPOSITION:
              <span className={classes.blueText}>TODAY</span>
            </a>
            <Image src={String(musicNoteIcon)} className={classes.image} />
          </Group>
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <HandleUserButton />
      </Container>
    </Header>
  );
}
