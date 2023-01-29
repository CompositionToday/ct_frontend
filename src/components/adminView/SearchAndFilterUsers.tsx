import {
  Container,
  ActionIcon,
  createStyles,
  Menu,
  Chip,
  Group,
} from "@mantine/core";
import { Input } from "@mantine/core";
import { IconSearch, IconFilter } from "@tabler/icons";
import React, { useState, useEffect } from "react";
import { PaginationSearchObject } from "../pagination/PaginationNavbar";

interface SearchAndFilterProp {
  setSearchObj: React.Dispatch<React.SetStateAction<PaginationSearchObject>>;
}

const useStyles = createStyles(() => ({
  container: {
    padding: "0px",
    marginTop: "45px",
  },

  search: {
    minWidth: "400px",
  },
}));

const createSearchObj = (
  setSearchObj: React.Dispatch<React.SetStateAction<PaginationSearchObject>>,
  adminChecked: boolean,
  bannedChecked: boolean,
  regularChecked: boolean,
  e?: React.ChangeEvent<HTMLInputElement>
) => {
  let searchObj: PaginationSearchObject = {
    keyword: e ? e.target.value : "",
    is_admin: adminChecked ? "1" : "0",
    is_banned: bannedChecked ? "1" : "0",
    is_regular: regularChecked ? "1" : "0",
  };

  console.log(searchObj);

  setSearchObj(searchObj);
};

export function SearchAndFilterUsers({ setSearchObj }: SearchAndFilterProp) {
  const { classes } = useStyles();
  const [adminChecked, setAdminChecked] = useState(true);
  const [bannedChecked, setBannedChecked] = useState(true);
  const [regularChecked, setRegularChecked] = useState(true);

  useEffect(() => {
    createSearchObj(setSearchObj, adminChecked, bannedChecked, regularChecked);
  }, [adminChecked, bannedChecked, regularChecked]);

  return (
    <Group className={classes.container} position="apart">
      <Input
        icon={
          <ActionIcon color="dark.2">
            <IconSearch />
          </ActionIcon>
        }
        placeholder="Search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          createSearchObj(
            setSearchObj,
            adminChecked,
            bannedChecked,
            regularChecked,
            e
          )
        }
        className={classes.search}
      />
      <Menu closeOnItemClick={false}>
        <Menu.Target>
          <ActionIcon color="dark.2" size="lg">
            <IconFilter size={40} stroke={1.5} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={() => setAdminChecked((v) => !v)}>
            <Chip
              defaultChecked
              color="green"
              variant="filled"
              checked={adminChecked}
              onChange={() => setAdminChecked((v) => !v)}
            >
              Admin
            </Chip>
          </Menu.Item>

          <Menu.Item onClick={() => setBannedChecked((v) => !v)}>
            <Chip
              defaultChecked
              color="red"
              variant="filled"
              checked={bannedChecked}
              onChange={() => setBannedChecked((v) => !v)}
            >
              Banned
            </Chip>
          </Menu.Item>

          <Menu.Item onClick={() => setRegularChecked((v) => !v)}>
            <Chip
              defaultChecked
              color="blue"
              variant="filled"
              checked={regularChecked}
              onChange={() => setRegularChecked((v) => !v)}
            >
              Regular
            </Chip>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
