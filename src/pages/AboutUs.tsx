import React, { useEffect } from "react";
import { NavBar } from "../components/navigation/NavBar";
import { navItems } from "../components/navigation/NavItems";

// Team Members Info for each SD Team
// V2: Fall 2022 - Spring 2023
// V3: Fall 2023 - Spring 2024
import { V2TeamMembersInfo } from "../components/about/V2TeamMembersInfo";
import { V3TeamMembersInfo } from "../components/about/V3TeamMembersInfo";

import { TeamMembers } from "../components/about/TeamMembers";

import {
  createStyles,
  Container,
  Title,
  Text,
  Image,
  Group, Tabs, Menu,
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

            {/*<Menu.Dropdown>*/}

            {/*  <Menu.Item*/}
            {/*  >*/}
            {/*    V2*/}
            {/*    <TeamMembers teamMembers={V2TeamMembersInfo.teamMembers} />*/}
            {/*  </Menu.Item>*/}
            {/*</Menu.Dropdown>*/}

            {/*<Tabs aria-label="Senior Design Teams">*/}
            {/*  /!*<Tab></Tab>*!/*/}
            {/*  <TeamMembers teamMembers={V2TeamMembersInfo.teamMembers} />*/}
            {/*</Tabs>*/}

            <Tabs aria-label="Senior Design Teams">
              <Tabs.List>

                <Tabs.Tab value="V2">
                  V2
                </Tabs.Tab>

                <Tabs.Tab value="V3">
                  V3
                </Tabs.Tab>

                <Tabs.Panel value="V2">
                  <TeamMembers teamMembers={V2TeamMembersInfo.teamMembers}/>
                </Tabs.Panel>

                <Tabs.Panel value="V3">
                  <TeamMembers teamMembers={V3TeamMembersInfo.teamMembers}/>
                </Tabs.Panel>


              </Tabs.List>
            </Tabs>

          </div>
        </div>
      </Container>


    </div>
  );
}
