import {
  ActionIcon,
  createStyles,
  Menu,
  Chip,
  Flex,
  Tooltip,
} from "@mantine/core";
import { Input } from "@mantine/core";
import { IconSearch, IconFilter } from "@tabler/icons";
import React, { useState, useEffect } from "react";
import { PaginationSearchObject } from "../pagination/PaginationNavbar";

interface SearchAndFilterProp {
  email: string;
  setSearchObj: React.Dispatch<React.SetStateAction<PaginationSearchObject>>;
}

const useStyles = createStyles((theme) => ({
  container: {
    padding: "0px",
    marginTop: "40px",

    [theme.fn.smallerThan("md")]: {
      marginLeft: "15px",
      marginRight: "15px",
    },
  },

  search: {
    borderColor: "#939393",

    flexBasis: "100%",
    marginRight: "15px",

    [theme.fn.largerThan("md")]: {
      flexBasis: "40%",
    },
  },
}));

const createSearchObj = (
  setSearchObj: React.Dispatch<React.SetStateAction<PaginationSearchObject>>,
  searchKeyword: string,
  email: string,
  adminChecked: boolean,
  bannedChecked: boolean,
  regularChecked: boolean
) => {
  let searchObj: PaginationSearchObject = {
    keyword: searchKeyword,
    current_email: email,
    is_admin: adminChecked ? "1" : "0",
    is_banned: bannedChecked ? "1" : "0",
    is_regular: regularChecked ? "1" : "0",
  };

  console.log(searchObj);

  setSearchObj(searchObj);
};

const changeFilter = (
  filter: string,
  setAdminChecked: React.Dispatch<React.SetStateAction<boolean>>,
  setBannedChecked: React.Dispatch<React.SetStateAction<boolean>>,
  setRegularChecked: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (filter === "admin") {
    setAdminChecked((e) => !e);
    setBannedChecked(false);
    setRegularChecked(false);
  } else if (filter === "banned") {
    setBannedChecked((e) => !e);
    setAdminChecked(false);
    setRegularChecked(false);
  } else if (filter === "regular") {
    setRegularChecked((e) => !e);
    setAdminChecked(false);
    setBannedChecked(false);
  }
};

export function SearchAndFilterUsers({
  email,
  setSearchObj,
}: SearchAndFilterProp) {
  const { classes } = useStyles();
  const [adminChecked, setAdminChecked] = useState(false);
  const [bannedChecked, setBannedChecked] = useState(false);
  const [regularChecked, setRegularChecked] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    createSearchObj(
      setSearchObj,
      searchKeyword,
      email,
      adminChecked,
      bannedChecked,
      regularChecked
    );
  }, [adminChecked, bannedChecked, regularChecked]);

  const isFilterEnabled = () => {
    return adminChecked || bannedChecked || regularChecked;
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("loading set to true");
      createSearchObj(
        setSearchObj,
        searchKeyword,
        email,
        adminChecked,
        bannedChecked,
        regularChecked
      );
    }
  };

  return (
    <Flex className={classes.container}>
      <Input
        icon={
          <ActionIcon color="dark.2">
            <IconSearch />
          </ActionIcon>
        }
        placeholder="Search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchKeyword(e.target.value)
        }
        onKeyDown={handleEnterKeyDown}
        className={classes.search}
      />
      <Menu closeOnItemClick={false}>
        <Menu.Target>
          <Tooltip label="Filter">
            <ActionIcon
              size="lg"
              color={isFilterEnabled() ? "blue" : "dark.2"}
              variant={isFilterEnabled() ? "light" : "subtle"}
            >
              <IconFilter size={40} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            onClick={() =>
              changeFilter(
                "admin",
                setAdminChecked,
                setBannedChecked,
                setRegularChecked
              )
            }
          >
            <Chip
              defaultChecked
              color="green"
              variant="filled"
              checked={adminChecked}
              onChange={() =>
                changeFilter(
                  "admin",
                  setAdminChecked,
                  setBannedChecked,
                  setRegularChecked
                )
              }
            >
              Admin
            </Chip>
          </Menu.Item>

          <Menu.Item
            onClick={() =>
              changeFilter(
                "banned",
                setAdminChecked,
                setBannedChecked,
                setRegularChecked
              )
            }
          >
            <Chip
              defaultChecked
              color="red"
              variant="filled"
              checked={bannedChecked}
              onChange={() =>
                changeFilter(
                  "banned",
                  setAdminChecked,
                  setBannedChecked,
                  setRegularChecked
                )
              }
            >
              Banned
            </Chip>
          </Menu.Item>

          <Menu.Item
            onClick={() =>
              changeFilter(
                "regular",
                setAdminChecked,
                setBannedChecked,
                setRegularChecked
              )
            }
          >
            <Chip
              defaultChecked
              color="blue"
              variant="filled"
              checked={regularChecked}
              onChange={() =>
                changeFilter(
                  "regular",
                  setAdminChecked,
                  setBannedChecked,
                  setRegularChecked
                )
              }
            >
              Regular
            </Chip>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
}
