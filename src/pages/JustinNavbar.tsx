import React from "react";
import { Menu, Button, Text } from '@mantine/core';
//import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons'; icons that im not using

export function JustinNavbar() {
  return (
    <Menu shadow="xl"
    radius={"lg"}
    width={200} >
      <Menu.Target>
        <Button style={{ width: "100%" , height: "200px" }}>Menu</Button>
      </Menu.Target>

      <Menu.Dropdown >
        <Menu.Item  >Jobs</Menu.Item>
        <Menu.Item >Competitions</Menu.Item>
        <Menu.Item >Festivals</Menu.Item>
        <Menu.Item >Concerts</Menu.Item>
        <Menu.Divider />
        <Menu.Item >Login</Menu.Item>
        <Menu.Item >Register</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
