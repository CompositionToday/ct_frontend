import { AnimateIn } from "../animations/AnimateOnScroll";

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

const kiersten = require("../../images/Kiersten.png");
const joseph = require("../../images/Joseph.png");
const ragen = require("../../images/Ragen.png");
const amber = require("../../images/Amber.png");
const justin = require("../../images/Justin.png");

export function TeamMembers({ teamMembers }: UserInfoIconsProps) {
  const { classes } = useStyles();

  const team = teamMembers.map((member) => {
    let photo = kiersten;
    if (member.avatar === "kiersten") {
      photo = kiersten;
    } else if (member.avatar === "joseph") {
      photo = joseph;
    } else if (member.avatar === "ragen") {
      photo = ragen;
    } else if (member.avatar === "amber") {
      photo = amber;
    } else if (member.avatar === "justin") {
      photo = justin;
    }

    return (
      <div>
        <AnimateIn>
          <Group noWrap spacing={60} mt={100} className={classes.members}>
            <Image src={String(photo)} radius="md" className={classes.image} />
            <div>
              <Text weight={500} className={classes.name} mb="xl">
                {member.name}
              </Text>

              <Text weight={500} className={classes.role} color="dimmed">
                {member.role}
              </Text>
            </div>
          </Group>
        </AnimateIn>
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
