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
    Menu, Grid,
} from "@mantine/core";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { IconUserCircle } from "@tabler/icons";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from '@mantine/core';
import { ToggleThemeButton } from '../button/ToogleThemeButton';

const musicNoteIcon = require("../../images/MusicNote.png");

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    [theme.fn.largerThan("md")]: {
      marginLeft: "25px",
      marginRight: "20px",
    },
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

  menuLink: {
    fontSize: "12pt",
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },

  linkLabel: {
    marginRight: 5,
  },

  title: {
      color:
      theme.colorScheme === "dark"
          ? theme.colors.gray[0]
          : "#454545",
    // color: "#454545",
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

  logoGroup: {
    gap: 5,

    "&:hover": {
      cursor: `pointer`,
    },
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 4,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("md")]: {
      display: "none",
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

  const { classes, cx } = useStyles();
  const [signedIn, setSignedIn] = useState(false);

  const [userFirstName, setUserFirstName] = useState("Welcome");
  const [userAdmin, setUserAdmin] = useState(false);

  const [active, setActive] = useState("/");
  const theme = useMantineTheme();

  const items = links.map((link) => {
    return (
      <Link
        to={link.link}
        key={link.label}
        className={cx(classes.link, {
          [classes.linkActive]: active === link.link,
        })}
      >
        {link.label}
      </Link>
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

  // This useEffect is to force users to be redirected to the banned page (assuming they are signed into a banned account), whenever they try to change the url, check if the current user is an admin, and make sure a user is scrolled to the top of the page whenever they redirect to a new page
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        let response = await fetch(`${url}/users/${user.uid}`);
        let responseJson = await response.json();

        let userData = responseJson.listOfObjects[0];

        setUserFirstName(userData.first_name);

        if (userData.is_admin) {
          setUserAdmin(true);
        } else {
          setUserAdmin(false);
        }

        if (userData.is_banned) {
          setUserBanned(true);
          navigate("/banned");
        } else {
          setUserBanned(false);
        }
      } else {
        setUserBanned(false);
        setUserAdmin(false);
      }
    });

    // This is here so that no matter what page a user goes to, they will be redirect to the top of the page. The reason this has to be here is because for some reason, rediecting to a new page doesn't allows have them scrolled to the top of the page
    window.scrollTo(0, 0);
  }, [location.pathname, signedIn]);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    // Logic to remove and re-add the Statcounter script goes here
    // This is conceptual and may require adjustments
    const existingScript = document.getElementById('statcounterScript');
    existingScript?.parentNode?.removeChild(existingScript);

    const script = document.createElement('script');
    script.id = 'statcounterScript';
    script.src = "//www.statcounter.com/counter/counter.js";
    script.async = true;
    document.head.appendChild(script);
  }, [location]); // Triggered by route change

  const displayBurger = useMediaQuery("(max-width: 992px)");

  const [opened, setOpened] = useState(false);

  const DisplayBurger: React.FC = () => {
    return (
      <Menu.Dropdown>
      <Menu.Item
          className={cx(classes.menuLink, {
              [classes.linkActive]: active === "/news",
          })}
          onClick={() => {
              navigate("/news");
          }}
      >
          News
      </Menu.Item>
      <Menu.Item
          className={cx(classes.menuLink, {
              [classes.linkActive]: active === "/blog",
          })}
          onClick={() => {
              navigate("/blog");
          }}
      >
          Blog
      </Menu.Item>
        <Menu.Item
          className={cx(classes.menuLink, {
            [classes.linkActive]: active === "/jobs",
          })}
          onClick={() => {
            navigate("/jobs");
          }}
        >
          Jobs
        </Menu.Item>
        <Menu.Item
          className={cx(classes.menuLink, {
            [classes.linkActive]: active === "/competitions",
          })}
          onClick={() => {
            navigate("/competitions");
          }}
        >
          Competitions
        </Menu.Item>
        <Menu.Item
          className={cx(classes.menuLink, {
            [classes.linkActive]: active === "/festivals",
          })}
          onClick={() => {
            navigate("/festivals");
          }}
        >
          Festivals
        </Menu.Item>
        <Menu.Item
          className={cx(classes.menuLink, {
            [classes.linkActive]: active === "/concerts",
          })}
          onClick={() => {
            navigate("/concerts");
          }}
        >
          Concerts
        </Menu.Item>
        <Menu.Item
          className={cx(classes.menuLink, {
            [classes.linkActive]: active === "/compositions",
          })}
          onClick={() => {
            navigate("/compositions");
          }}
        >
          Compositions
        </Menu.Item>
        <Menu.Item
          className={cx(classes.menuLink, {
            [classes.linkActive]: active === "/researchpapers",
          })}
          onClick={() => {
            navigate("/researchpapers");
          }}
        >
          Compositions
        </Menu.Item>
        <Menu.Divider />

        {signedIn ? (
          <DisplaySignedIn />
        ) : (
          <>
             {/*<Menu.Label>Account</Menu.Label>*/}
            <Menu.Item
              className={cx(classes.menuLink, {
                [classes.linkActive]: active === "/login",
              })}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Menu.Item>

            <Menu.Item
              className={cx(classes.menuLink, {
                [classes.linkActive]: active === "/register",
              })}
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    );
  };

  const DisplaySignedIn: React.FC = () => {
    return (
      <>
        <Menu.Label>Posts</Menu.Label>
        <Menu.Item
          className={cx(classes.menuLink, {
            [classes.linkActive]: active === "/my-posts",
          })}
          onClick={() => {
            navigate("/my-posts");
          }}
        >
          My Posts
        </Menu.Item>
        <Menu.Item
          className={cx(classes.menuLink, {
            [classes.linkActive]: active === "/create-opportunity",
          })}
          onClick={() => {
            navigate("/create-opportunity");
          }}
        >
          Create a Post
        </Menu.Item>
        {userAdmin && (
          <>
            <Menu.Divider />
            <Menu.Label>Admin</Menu.Label>
            <Menu.Item
              className={cx(classes.menuLink, {
                [classes.linkActive]: active === "/admin/scrapedPosts",
              })}
              onClick={() => {
                navigate("/admin/scrapedPosts");
              }}
            >
              Scraped Posts
            </Menu.Item>
            <Menu.Item
              className={cx(classes.menuLink, {
                [classes.linkActive]: active === "/admin/scrapedLinks",
              })}
              onClick={() => {
                navigate("/admin/scrapedLinks");
              }}
            >
              Scraped Links
            </Menu.Item>
            <Menu.Item
              className={cx(classes.menuLink, {
                [classes.linkActive]: active === "/admin/users",
              })}
              onClick={() => {
                navigate("/admin/users");
              }}
            >
              Manage Users
            </Menu.Item>
            
            <Menu.Item
              className={cx(classes.menuLink, {
                [classes.linkActive]: active === "/admin/reported",
              })}
              onClick={() => {
                navigate("/admin/reported");
              }}
            >
              Reported Posts
            </Menu.Item>
            
            <Menu.Item
              className={cx(classes.menuLink, {
                [classes.linkActive]: active === "/admin/recent-posts",
              })}
              onClick={() => {
                navigate("/admin/recent-posts");
              }}
            >
              Recent Posts
            </Menu.Item>

            <Menu.Item
                className={cx(classes.menuLink, {
                  [classes.linkActive]: active === "/admin/recent-posts",
                })}
                onClick={() => {
                  navigate("/admin/create-blog-post");
                }}
            >
              Create Blog Post
            </Menu.Item>
          </>
        )}
        <Menu.Item
          className={cx(classes.menuLink, {
            [classes.linkActive]: active === "/updateinfo",
          })}
          onClick={() => {
            navigate("/updateinfo");
          }}
        >
          Update Profile
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          style={{ fontSize: "12pt" }}
          color="red"
          onClick={async () => {
            await signOut(auth);
            setSignedIn(false);
            navigate("/");
          }}
        >
          Sign Out
        </Menu.Item>
      </>
    );
  };

  const DisplayMenuButton: React.FC = () => {
    return signedIn ? (
      <Group>

          <ToggleThemeButton/>

          <Menu shadow="md" width={150} withArrow>
          <Menu.Target>
            <Button
              variant="subtle"
              sx={{ height: 30 }}
              size="md"
              leftIcon={<IconUserCircle />}
              color={theme.colorScheme === "dark" ? 'dark.0' : 'gray.7'}
              className = "hiName"

            >
              Hi, {userFirstName}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <DisplaySignedIn />
          </Menu.Dropdown>
        </Menu>
      </Group>
    ) : (
      <Group style={{ paddingRight: 25 }} className={classes.links}>

          <ToggleThemeButton/>

          <Button
          variant="subtle"
          sx={{ height: 30 }}
          size="md"
          color="blue"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>

        <Button
          radius="md"
          sx={{ height: 30 }}
          size="md"
          variant={theme.colorScheme==='dark'?'outline':'filled'}
          // gradient={{ from: 'green', to: 'blue', deg: 60 }}
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </Button>
      </Group>
    );
  };

  return (
    <>
      <Header
        height={HEADER_HEIGHT}
        sx={{ borderBottom: 0 }}
        mt={10}
        style={{ visibility: userBanned ? "hidden" : "visible" }}
      >
        <Container className={classes.inner} fluid>
        <Group>
          <Group spacing="xs" className={classes.logoGroup}>
            <Link to="/" className={classes.title}>
              COMPOSITION:
              <span className={classes.blueText}>TODAY</span>
            </Link>
            <Link to="/"> {}
              <Image
                src={String(musicNoteIcon)}
                className={classes.image}
              />
            </Link>
          </Group>
        </Group>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          {displayBurger ? (
            <Menu
              shadow="md"
              width="100vw"
              onClose={() => {
                setOpened(false);
              }}
            >
                <Grid justify="flex-end" align="center">
                    <Grid.Col span={"auto"}>
                        <ToggleThemeButton/>
                    </Grid.Col>

                    <Grid.Col span={"auto"}>
                        <Menu.Target>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                            />
                        </Menu.Target>
                    </Grid.Col>
                </Grid>
              <DisplayBurger />
            </Menu>
          ) : (
            <DisplayMenuButton />
          )}
        </Container>
      </Header>
    </>
  );
}
