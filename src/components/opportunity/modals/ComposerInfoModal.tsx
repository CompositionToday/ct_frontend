import { openModal } from "@mantine/modals";
import { FeaturedComposition } from "../../../FeaturedComposition";
import { IconArrowLeft, IconExternalLink, IconTrophy } from "@tabler/icons";

import {
  createStyles,
  Container,
  Button,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";

import React from "react";
import { Carousel } from "@mantine/carousel";

export function openComposerModal(
  UID: string | undefined,
  fullName: string,
  awards: Array<FeaturedComposition> | undefined,
  bio: string | null,
  link: string | null,
  classes: any
) {
  const useStyles = createStyles((theme) => ({
    inner: {
      display: "flex",
      justifyContent: "center",
      // paddingTop: theme.spacing.xl,
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
      color: "White",
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: 25,
      // lineHeight: 1.2,
      fontWeight: 500,

      [theme.fn.smallerThan("sm")]: {
        fontSize: 36,
      },
    },

    card: {
      color: theme.white,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      borderRadius: "md",
      textAlign: "center",
    },

    control: {
      [theme.fn.smallerThan("xs")]: {
        flex: 1,
      },
    },

    carousel: {
      backgroundColor:
        theme.colorScheme !== "dark" ? theme.colors.gray[0] : "#454545",
    },

    modalTitle: {
      justifyContent: "center",
      textAlign: "center",
    },

    modalHeader: {
      justifyContent: "center",
      textAlign: "center",
    },

    image: {
      flex: 1,
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

    textHighlight: {
      lineHeight: 0,
    },

    h3: {
      height: "2px",
      color: "#EEEEEE",
    },

    link: {
      color: "#90caf9",
      textDecoration: "underline",
      textDecorationColor: "#90caf9",
    },

    cardSubHeading: {
      color: "#90caf9",
    },

    h4: {
      height: "2px",
      fontSize: 12,
    },

    container: {
      maxWidth: "75vw",

      [theme.fn.smallerThan("md")]: {
        maxWidth: "85vw",
      },
    },

    subheading: {
      fontSize: 25,

      [theme.fn.smallerThan("sm")]: {
        fontSize: 22,
      },
    },

    featuredList: {
      justifyContent: "center",
      background: theme.colorScheme !== "dark" ? theme.colors.dark[7] : "white",
    },
  }));

  function createTable() {
    if (awards != null && awards.length > 0) {
      return awards.map((song) => {
        return (
          <Carousel.Slide
            sx={{
              width: "33.333%",
              height: "100%",
              //justifyContent: "center",
              paddingLeft: "20%",
              paddingRight: "20%",
            }}
          >
            <div key={song.link} style={{ textAlign: "center" }}>
              {song.awards ? (
                <p
                  style={{
                    fontSize: 14,
                    //fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  <a
                    href={song.link}
                    style={{
                      textDecoration: "none",
                      textDecorationColor: "#90caf9",
                      color: "inherit",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "italic",
                        fontSize: "25px",
                        color: "blue",
                      }}
                    >
                      {song.title}
                    </span>
                  </a>
                  <br />
                  <Button
                    rightIcon={<IconTrophy />}
                    variant="light"
                    color={"yellow"}
                    style={{
                      marginTop: "0.25rem",
                    }}
                  >
                    {song.awards}
                  </Button>
                  <br />
                  {song.genre}
                  <br />
                  {song.description}
                </p>
              ) : (
                <div>
                  <p
                    style={{
                      fontSize: 14,
                      //fontStyle: "italic",
                      fontWeight: 400,
                    }}
                  >
                    <a
                      href={song.link}
                      style={{
                        textDecoration: "none",
                        textDecorationColor: "#90caf9",
                        color: "inherit",
                      }}
                    >
                      <span
                        style={{
                          fontStyle: "italic",
                          fontSize: "25px",
                          color: "blue",
                        }}
                      >
                        {song.title}
                      </span>
                    </a>
                    <br />
                    {song.genre}
                    <br />
                    {song.description}
                  </p>
                </div>
              )}
              <a href={song.link} target="blank">
                {/*<Button*/}
                {/*    radius="md"*/}
                {/*    sx={{*/}
                {/*      height: 30,*/}
                {/*      alignSelf: "flex-end",*/}
                {/*      margin: "15px 0px",*/}
                {/*    }}*/}
                {/*    size="md"*/}
                {/*    rightIcon={<IconExternalLink style={{ marginLeft: "-5px" }} />}*/}
                {/*>*/}
                {/*  Link*/}
                {/*</Button>*/}
              </a>
            </div>
          </Carousel.Slide>
        );
      });
    } else return <div></div>;
  }

  const awardsSection = createTable();
  const createChildren = () => {
    return (
      <div>
        <Container>
          <div>
            {awards ? (
              <p
                className={classes.subheading}
                style={{
                  fontWeight: "500",
                  marginBlockEnd: "0rem",
                }}
              >
                Compositions:
                <br />
              </p>
            ) : (
              <div />
            )}

            <Carousel
              mx="auto"
              height={"auto"}
              align={"start"}
              slideSize="100%"
              slideGap={"xl"}
              slidesToScroll={1}
              sx={{
                //width: "100%",
                width: "100%",
                height: "100%",
              }}
              styles={{
                control: {
                  "&[data-inactive]": {
                    opacity: 0,
                    cursor: "default",
                  },
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  color: "black",
                  // backgroundColor: "gray"
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  backgroundColor: "white",
                },
                container: { margin: "0px" },
                //root: { carouselHeight: "auto", carouselWidth: "auto" },
                viewport: { height: "auto" },
                slide: {
                  border: "1px",
                  borderStyle: "solid",
                  borderColor: "black",
                },
              }}
            >
              {awardsSection}
            </Carousel>

            {bio ? (
              <div>
                <p
                  className={classes.subheading}
                  style={{
                    fontWeight: "500",
                  }}
                >
                  Bio: <br />
                </p>
                {bio}
              </div>
            ) : (
              <div />
            )}
            {link ? (
              <div>
                <p
                  className={classes.subheading}
                  style={{
                    fontWeight: "500",
                    marginBlockEnd: "0.5rem",
                  }}
                >
                  Website link: <br />
                </p>
                <a href={link} target="blank">
                  <Button
                    radius="md"
                    sx={{
                      height: 30,
                      alignSelf: "flex-start",
                      margin: "15px 0px",
                      marginBlockStart: "0rem",
                    }}
                    size="md"
                    rightIcon={
                      <IconExternalLink style={{ marginLeft: "-5px" }} />
                    }
                  >
                    Composer Website
                  </Button>
                </a>
              </div>
            ) : (
              <div />
            )}
            <br />
          </div>
        </Container>
      </div>
    );
  };

  const createTitle = () => {
    return (
      <h2
        className={classes.link}
        style={{
          color: "#228be6",
          textDecoration: "none",
          fontWeight: "700",
          textDecorationColor: "#228be6",
        }}
      >
        {fullName}
      </h2>
    );
  };

  const title = createTitle();
  const confirmLabel = "Close";
  const cancelLabel = "";
  const color = "blue";
  const children = createChildren();

  openModal({
    title,
    children,
    color,
    closeButtonLabel: "Close",
    size: "lg",
    styles: {
      header: { justifyContent: "center", marginBottom: "-25px" },
    },
  });
}
