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
import { useLocation, useNavigate } from "react-router-dom";

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
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("md")]: {
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

    [theme.fn.smallerThan("sm")]: {
      fontSize: 14,
    },
  },

  grayText: {
    color: "#454545",
  },

  blueText: {
    color: "#228BE6",
  },

  image: {
    maxWidth: 30,

    [theme.fn.smallerThan("sm")]: {
      maxWidth: 25,
    },
  },

  logo: {
    [theme.fn.largerThan("md")]: {
      paddingLeft: "25px",
    },
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
  const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user?.email);

        let response = await fetch(
          `${url}/users?page_number=1&keyword=${user.email}`
        );
        let responseJson = await response.json();

        let userDate = responseJson.listOfObjects[0];

        if (userDate.is_banned) {
          navigate("/banned");
        }
      }
    });
  }, [location.pathname, signedIn]);

  const HandleUserButton: React.FC = () => {
    return signedIn ? (
      <Group style={{ paddingRight: 25 }}>
        <Button
          variant="subtle"
          sx={{ height: 30 }}
          size="md"
          onClick={async () => {
            console.log("sign out button clicked");
            await signOut(auth);
            setSignedIn(false);
            console.log("redirecting to landing");
            navigate("/");
          }}
        >
          Sign Out
        </Button>
      </Group>
    ) : (
      <Group style={{ paddingRight: 25 }} className={classes.links}>
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

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mt={10}>
      <Container className={classes.inner} fluid>
        <Group className={classes.logo}>
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
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
        <HandleUserButton />
      </Container>
    </Header>
  );
}
