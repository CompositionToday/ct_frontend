import React from "react";
import { Menu, Button, Text } from '@mantine/core';
import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons';

export function JustinNavbar() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button>Menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item >Jobs</Menu.Item>
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
