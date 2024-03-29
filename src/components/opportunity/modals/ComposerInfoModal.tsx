import { openConfirmationModal } from "../../modal/ConfirmationModal";
import { openModal } from "@mantine/modals";
import { FeaturedComposition } from "../../../FeaturedComposition";
import { IconExternalLink } from "@tabler/icons";

import {
  createStyles,
  Container,
  Title,
  Text,
  Image,
  Button,
  Badge,
} from "@mantine/core";

import MantineTheme from "@mantine/core";
import React from "react";
import {Carousel} from "@mantine/carousel";

export function openComposerModal(
  UID: string | undefined,
  fullName: string,
  awards: Array<FeaturedComposition> | undefined,
  bio: string | null,
  link: string | null,
  classes: any
)
{
  const useStyles = createStyles((theme) => ({
    inner: {
      display: "flex",
      justifyContent: "space-between",
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
      color: 'White',
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
      borderRadius:"md",
      textAlign:"center",
    },

    control: {
      [theme.fn.smallerThan("xs")]: {
        flex: 1,
      },
    },

    carousel: {
      backgroundColor:theme.colorScheme !== "dark" ? theme.colors.gray[0] : "#454545"
    },

    modalTitle: {
      justifyContent:"center"
    },

    modalHeader: {
      justifyContent:"center"
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
      textDecorationColor:"#90caf9"
    },

    cardSubHeading:{
      color:"#90caf9"
    },

    h4: {
      height: "2px",
      fontSize: 12
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

  const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";
  function createTable() {
    if (awards != null && awards.length > 0) {
      return awards.map((song) => {
        return (
            <Carousel.Slide
                sx={{
                  width: "100%",
                  height: "100%",
                  justifyContent:"center",
                  marginRight:"0px",
                  paddingRight:"0px"
                  // paddingLeft:"10%",
                  // paddingRight:"10%",
                }}
            >
              <div key={song.link} style={{textAlign:"center"}}>
                <div>
                  {song.awards ?
                      (<p>{song.title}, awards: {song.awards}</p>) :
                      (<div>
                          <h4>{song.title}</h4>
                      </div>)
                  }
                </div>
                <a href={song.link} target="blank">
                  <Button
                      radius="md"
                      sx={{
                        height: 30,
                        alignSelf: "flex-start",
                        margin: "15px 0px",
                      }}
                      size="md"
                      rightIcon={<IconExternalLink style={{ marginLeft: "-5px" }} />}
                  >
                    Link
                  </Button>
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
              <p className={classes.subheading}>
                Compositions:
                <br />
              </p>
            ) : (
              <div />
            )}

            <Carousel
                mx="auto"
                withIndicators
                height={350}
                align={"start"}
                slideSize="25%"
                slideGap="xl"
                slidesToScroll={4}
                sx={{
                  width: "100%",
                  height:"100%",
                  // paddingBottom: "6%",
                }}
            >
              {awardsSection}
            </Carousel>

            <br />
            {bio ? (
              <div>
                <p className={classes.subheading}>
                  Biography: <br />
                </p>
                {bio}
              </div>
            ) : (
              <div />
            )}
            {link ? (
              <div>
                <p className={classes.subheading}>
                  Website link: <br />
                </p>
                <a href={link} target="blank">
                  <Button
                    radius="md"
                    sx={{
                      height: 30,
                      alignSelf: "flex-start",
                      margin: "15px 0px",
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

  const title = fullName;
  const confirmLabel = "Close";
  const cancelLabel = "";
  const color = "blue";
  const children = createChildren();

  openModal({
    title,
    children,
    color,
    closeButtonLabel: "Close",
    size: "auto",
    classNames: {
      title:classes.modalTitle,
      header:classes.modalHeader,
    }
  });
}
