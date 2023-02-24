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
  Menu,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { IconUserCircle } from "@tabler/icons";

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
  const [userBanned, setUserBanned] = useState(false);

  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [signedIn, setSignedIn] = useState(false);
  const [userFirstName, setUserFirstName] = useState("Welcome");
  const [userAdmin, setUserAdmin] = useState(false);

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

    console.log(location.pathname);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user?.email);

        let response = await fetch(
          `${url}/users?page_number=1&keyword=${user.email}`
        );
        let responseJson = await response.json();

        let userData = responseJson.listOfObjects[0];

        setUserFirstName(userData.first_name);

        if (userData.is_admin) {
          setUserAdmin(true);
        } else {
          setUserAdmin(false);
        }

        if (userData.is_banned) {
          navigate("/banned");
          setUserBanned(true);
        } else {
          setUserBanned(false);
        }
      } else {
        setUserBanned(false);
        setUserAdmin(false);
        console.log("setting banned to false");
      }
    });

    console.log("pathname ", location.pathname);
    console.log("signedInn ", signedIn);
  }, [location.pathname, signedIn]);

  useEffect(() => {
    console.log("useeffect state: ", userBanned);
  }, [userBanned]);

  const HandleUserButton: React.FC = () => {
    return signedIn ? (
      <Group style={{ paddingRight: 25 }}>
        <Menu shadow="md" width={150} withArrow>
          <Menu.Target>
            <Button
              variant="subtle"
              sx={{ height: 30 }}
              size="md"
              leftIcon={<IconUserCircle />}
              color="gray.7"
            >
              Hi, {userFirstName}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Posts</Menu.Label>
            <Menu.Item
              style={{ fontSize: "12pt" }}
              onClick={() => navigate("/my-posts")}
            >
              My Posts
            </Menu.Item>
            <Menu.Item
              style={{ fontSize: "12pt" }}
              onClick={() => navigate("/create-opportunity")}
            >
              Create a Post
            </Menu.Item>
            {userAdmin && (
              <>
                <Menu.Divider />
                <Menu.Label>Admin</Menu.Label>
                <Menu.Item
                  style={{ fontSize: "12pt" }}
                  onClick={() => navigate("/admin/users")}
                >
                  Manage Users
                </Menu.Item>
                <Menu.Item
                  style={{ fontSize: "12pt" }}
                  onClick={() => navigate("/admin/recent-posts")}
                >
                  Recent Posts
                </Menu.Item>
              </>
            )}
            <Menu.Divider />
            <Menu.Item
              style={{ fontSize: "12pt" }}
              color="red"
              onClick={async () => {
                console.log("sign out button clicked");
                await signOut(auth);
                setSignedIn(false);
                console.log("redirecting to landing");
                navigate("/");
              }}
            >
              Sign Out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
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
    <Header
      height={HEADER_HEIGHT}
      sx={{ borderBottom: 0 }}
      mt={10}
      style={{ visibility: userBanned ? "hidden" : "visible" }}
    >
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
