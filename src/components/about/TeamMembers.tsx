import { AnimateIn } from "../animations/AnimateOnScroll";
import {Teeter} from "../animations/AnimateOnHover";

import {
  createStyles,
  Image,
  Text,
  Group,
  Container,
  Space,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "50%",
    [theme.fn.smallerThan("md")]: {
      width: "70%",
    },
  },

  members: {
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 28,
    color: "#228BE6",

    [theme.fn.smallerThan("sm")]: {
      fontSize: 20,
    },
  },

  role: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 22,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 16,
    },
  },

  image: {
    maxWidth: 250,
    [theme.fn.smallerThan("sm")]: {
      maxWidth: 175,
    },
  },
}));

interface UserInfoIconsProps {
  teamMembers: {
    avatar: string;
    name: string;
    role: string;
  }[];
}

// CompositionToday V2 Team Members
const kierstenV2 = require("../../images/KierstenV2.png");
const josephV2 = require("../../images/JosephV2.png");
const ragenV2 = require("../../images/RagenV2.png");
const amberV2 = require("../../images/AmberV2.png");
const justinV2 = require("../../images/JustinV2.png");

// CompositionToday V3 Team Members
const johnV3 = require("../../images/JohnV3.png");
const michaelV3 = require("../../images/MichaelV3.png");
const justinV3 = require("../../images/JustinV3.png");
const treyV3 = require("../../images/TreyV3.png");
const valentinoV3 = require("../../images/ValentinoV3.png");

// CompositionToday V4 Team Members
const romanV4 = require("../../images/RomanAvatarV4.png");
const noahV4 = require("../../images/NoahAvatarV4.png");
const justinV4 = require("../../images/JustinAvatarV4.png");
const andyV4 = require("../../images/AndyAvatarV4.png");
const aintzaneV4 = require("../../images/AintzaneAvatarV4.png");

export function TeamMembers({ teamMembers }: UserInfoIconsProps) {
  const { classes } = useStyles();

  const team = teamMembers.map((member) => {
    let photo = kierstenV2;

    if (member.avatar === "kierstenV2") {
      photo = kierstenV2;
    } else if (member.avatar === "josephV2") {
      photo = josephV2;
    } else if (member.avatar === "ragenV2") {
      photo = ragenV2;
    } else if (member.avatar === "amberV2") {
      photo = amberV2;
    } else if (member.avatar === "justinV2") {
      photo = justinV2;
    } else if (member.avatar === "michaelV3") {
      photo = michaelV3;
    } else if (member.avatar === "johnV3") {
      photo = johnV3;
    } else if (member.avatar === "treyV3") {
      photo = treyV3;
    } else if (member.avatar === "justinV3") {
      photo = justinV3;
    } else if (member.avatar === "valentinoV3") {
      photo = valentinoV3;
    } else if (member.avatar === "aintzaneV4"){
      photo = aintzaneV4;
    } else if (member.avatar === "andyV4"){
      photo = andyV4;
    } else if (member.avatar === "justinV4"){
      photo = justinV4;
    } else if (member.avatar === "romanV4"){
      photo = romanV4;
    } else if (member.avatar === "noahV4"){
      photo = noahV4;
    }

    return (
      <div>
        <Group noWrap spacing={30} mt={100} className={classes.members}>

          {/*<Teeter rotation={15} timing={120}>*/}
            <Image src={String(photo)} radius="xl" className={classes.image} />
          {/*</Teeter>*/}

          <div>
            <Text weight={500} className={classes.name} mb="xl">
              {member.name}
            </Text>

            <Text weight={500} className={classes.role} color="dimmed">
              {member.role}
            </Text>
          </div>
        </Group>
      </div>
    );
  });

  return (
    <Container className={classes.container}>
      {team}
      <Space h={100} />
    </Container>
  );
}
