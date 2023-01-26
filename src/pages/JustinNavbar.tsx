import React from "react";
import { Menu, Button, Text } from '@mantine/core';
//import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons'; icons that im not using
import { useNavigate } from "react-router-dom";

export function JustinNavbar() {
  const navigate = useNavigate();
  return (
    <Menu shadow="xl"
    radius={"lg"}
    width={200} >
      <Menu.Target>
        <Button style={{ width: "100%" , height: "200px" }}>Menu</Button>
      </Menu.Target>

      <Menu.Dropdown >
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
