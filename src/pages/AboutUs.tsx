import React, { useEffect } from "react";
import { NavBar } from "../components/navigation/NavBar";
import { navItems } from "../components/navigation/NavItems";
import { teamMemberInfo } from "../components/about/TeamMemberInfo";
import { TeamMembers } from "../components/about/TeamMembers";

import {
  createStyles,
  Container,
  Title,
  Text,
  Image,
  Group,
} from "@mantine/core";

const musicNoteIcon = require("../images/BigMusicNote.png");
const greenTriangle = require("../images/GreenTriangle.png");
const blueTriangle = require("../images/BlueTriangle.png");

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
  },

  content: {
    maxWidth: "75%",

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : "#2F2F2F",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 600,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 23,
    },
  },

  subtitle: {
    color: theme.colorScheme === "dark" ? theme.white : "#2F2F2F",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 40,
    lineHeight: 1.2,
    fontWeight: 400,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 20,
    },
  },

  subheading: {
    fontSize: 22,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 16,
    },
  },

  blueText: {
    color: "#228BE6",
  },

  greenText: {
    color: "#40C057",
  },

  image: {
    paddingTop: 8,
    maxWidth: 70,

    [theme.fn.smallerThan("sm")]: {
      maxWidth: 35,
      marginLeft: "-10px",
    },
  },

  container: {
    marginTop: 120,
  },
}));

export function About() {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Image
        src={String(blueTriangle)}
        style={{
          width: "24%",
          position: "absolute",
          right: "0px",
          top: "80px",
        }}
      />
      <Image
        src={String(greenTriangle)}
        style={{ width: "24%", position: "absolute", top: "650px" }}
      />
      <Container sx={{ maxWidth: "75vw" }}>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.subtitle}>
              Meet the team of talented{" "}
              <span className={classes.greenText}>college students</span> behind
            </Title>
            <Group>
              <Title className={classes.title} mt="xl">
                COMPOSITION:<span className={classes.blueText}>TODAY</span>
              </Title>
              <Image
                src={String(musicNoteIcon)}
                className={classes.image}
                mt="xl"
              />
            </Group>
            <Text color="dimmed" mt="md" className={classes.subheading}>
              This website was revamped by a group of computer science students
              at the University of Central Florida for their senior design
              project.
            </Text>
          </div>
        </div>
      </Container>
      <TeamMembers teamMembers={teamMemberInfo.teamMembers} />
    </div>
  );
}
