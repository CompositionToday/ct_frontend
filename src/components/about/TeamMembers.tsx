/**
 * List of Team Member Portraits and Descriptions
 * in the About Us Section
 */

import {
  createStyles,
  Image,
  Text,
  Group,
  Container,
  Space,
} from "@mantine/core";


const useStyles = createStyles((theme) => ({

  // container where all of the teamMember objects are dispalyed
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "80%",
    [theme.fn.smallerThan("md")]: {
      width: "70%",
    },
  },

  // group component for team members lists (vertical list growth)
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

  // team member name
  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 28,
    color: "#228BE6",
    [theme.fn.smallerThan("sm")]: {
      fontSize: 20,
    },
  },

  // team member role description
  role: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 22,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 16,
    },
  },

  // team member portrait
  image: {
    maxWidth: 250,
    [theme.fn.smallerThan("sm")]: {
      maxWidth: 175,
    },
  },
}));


// Props for teamMember object
interface UserInfoIconsProps {
  teamMembers: {
    avatar: string;
    name: string;
    role: string;
  }[];
}


export function TeamMembers({ teamMembers }: UserInfoIconsProps) {
  const { classes } = useStyles();

  // Generates a teamMember component for each member in the list, See V[x]TeamMembersInfo.tsx for the data
  const teamMemberList = teamMembers.map((member) => {

    // Get the correct team member photo file (.png)
    let photo = require("../../images/" + member.avatar +".png")
    // console.log("photo = " + photo)
    
    // Returns a single team member component
    return (
      <div>
        <Group noWrap spacing={60} mt={100} className={classes.members}>

          {/*Potrait*/}
          <Image src={String(photo)} radius="md" className={classes.image} />

          <div>
            {/*Team Member Name*/}
            <Text weight={500} className={classes.name} mb="xl">
              {member.name}
            </Text>

            {/*Team Member Description*/}
            <Text weight={500} className={classes.role} color="dimmed">
              {member.role}
            </Text>
          </div>

        </Group>
      </div>
    );
  });

  // Returns the list of teamMembers
  return (
    <Container className={classes.container}>
      {teamMemberList}
      <Space h={100} />
    </Container>
  );
}
