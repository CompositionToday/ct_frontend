import { Container, ActionIcon, createStyles } from "@mantine/core";
import { Input } from '@mantine/core';
import { IconSearch, IconFilter } from '@tabler/icons';
// import { SearchParams } from "./UsersList";
import React from "react";
import { PaginationSearchObject } from "../pagination/PaginationNavbar";

interface SearchAndFilterProp {
  setSearchObj: React.Dispatch<React.SetStateAction<PaginationSearchObject>>
}

const useStyles = createStyles(() => ({
  container: {
    padding: "30px 0px",
  }
}));

const createSearchObj = (e: React.ChangeEvent<HTMLInputElement>, setSearchObj: React.Dispatch<React.SetStateAction<PaginationSearchObject>>) => {
  let searchObj: PaginationSearchObject = {
    first_name: e.target.value,
    last_name: e.target.value,
    email: e.target.value
  }

  setSearchObj(searchObj);
}

export function SearchAndFilterUsers({ setSearchObj }: SearchAndFilterProp) {
  const { classes } = useStyles();

  return (
    <Container fluid className={classes.container}>
      <Input
        icon={<ActionIcon color="dark.2"><IconSearch /></ActionIcon>}
        placeholder="Search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => createSearchObj(e, setSearchObj)}
      />
      <ActionIcon color="dark.2" size="lg">
        <IconFilter size={40} stroke={1.5}/>
      </ActionIcon>
    </Container>
  );
}
