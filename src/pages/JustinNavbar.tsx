import React from "react";
import { Menu, Button, Burger, Text, createStyles } from '@mantine/core';
//import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons'; icons that im not using 
// <Button style={{ width: "80%" , height: "200px" }}>whopper</Button>
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

export function JustinNavbar() {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure(false);
  const useStyles = createStyles((theme) => ({
    burger: {
      [theme.fn.largerThan("sm")]: {
        display: "none",
      },
    },
  }));
  const { classes } = useStyles();
  return (
    <Menu shadow="xl"
    radius={"lg"}
    width={200} >
      <Menu.Target>
      <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="lg"
          />
      </Menu.Target>
      <Menu.Dropdown >
        <Menu.Item onClick={() => navigate("/")}>Home</Menu.Item>
        <Menu.Item onClick={() => navigate("/jobs")}>Jobs</Menu.Item>
        <Menu.Item onClick={() => navigate("/competitions")}>Competitions</Menu.Item>
        <Menu.Item onClick={() => navigate("/festivals")}>Festivals</Menu.Item>
        <Menu.Item onClick={() => navigate("/concerts")}>Concerts</Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={() => navigate("/login")}>Login</Menu.Item>
        <Menu.Item onClick={() => navigate("/register")}>Register</Menu.Item>
        <Menu.Item color="red">Sign Out</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
