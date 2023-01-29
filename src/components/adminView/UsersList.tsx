import {
  Paper,
  Menu,
  Badge,
  Table,
  Text,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
  Container,
  createStyles,
  MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import {
  IconBan,
  IconTrash,
  IconArrowBigUpLine,
  IconCheck,
  IconArrowBigDownLine,
  IconDots,
} from "@tabler/icons";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { openMakeAdminModal, openRemoveAdminModal } from "./AdminModal";
import { openDeleteModal } from "./DeleteModal";
import { openBanModal, openUnbanModal } from "./BanModal";
import {
  PaginationNavbar,
  PaginationSearchObject,
} from "../pagination/PaginationNavbar";
import { SearchAndFilterUsers } from "./SearchAndFilterUsers";

interface UserTableData {
  name: string;
  type: string;
  email: string;
}

export interface RawUserData {
  UID: string;
  first_name: string;
  last_name: string;
  email: string;
  is_admin: number;
  is_banned: number;
}

const typeColors: Record<string, string> = {
  regular: "blue",
  admin: "green",
  banned: "red",
};

const useStyles = createStyles((theme) => ({
  container: {
    width: "80vw",
    height: "70vh",
  },

  userContainer: {
    width: "80vw",
    height: "60vh",
    display: "flex",
    flexWrap: "wrap",
  },

  table: {
    maxWidth: "100%",
    flexBasis: "100%",
  },

  pagination: {
    flexBasis: "100%",
    marginBottom: "30px",
  },

  bold: {
    fontWeight: 700,
  },
}));

export function UsersList() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [rawUserList, setRawUserList] = useState<RawUserData[]>([]);
  const [userList, setUserList] = useState<UserTableData[]>([]);
  const [searchParams, setSearchParams] = useState<PaginationSearchObject>({
    keyword: "",
  });

  useEffect(() => {
    convertRawUserDataToTableData();
    console.log("rawUserList", rawUserList);
  }, [rawUserList, searchParams]);

  const convertRawUserDataToTableData = () => {
    let newUserList: UserTableData[] = [];
    rawUserList?.forEach((user) => {
      let formattedUserData: UserTableData = {
        name: "",
        type: "Regular",
        email: user.email,
      };

      formattedUserData.name = user.first_name.concat(" ", user.last_name);

      if (user.is_admin === 1) formattedUserData.type = "Admin";
      if (user.is_banned === 1) formattedUserData.type = "Banned";

      newUserList.push(formattedUserData);
    });
    setUserList(newUserList);
  };

  const rows = userList?.map((item, index) => (
    <tr key={item.email}>
      <td>
        <Text size="sm" weight={500}>
          {item.name}
        </Text>
      </td>
      <td>
        <Text size="sm" color="dimmed">
          {item.email}
        </Text>
      </td>
      <td>
        <Badge
          color={typeColors[item.type.toLowerCase()]}
          variant={theme.colorScheme === "dark" ? "light" : "outline"}
        >
          {item.type}
        </Badge>
      </td>
      <td>
        <Menu>
          <Menu.Target>
            <ActionIcon color="dark">
              <IconDots size={16} stroke={1.5} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              disabled={item.type === "Banned" ? true : false}
              icon={
                item.type === "Admin" ? (
                  <IconArrowBigDownLine size={16} stroke={1.5} />
                ) : (
                  <IconArrowBigUpLine size={16} stroke={1.5} />
                )
              }
              onClick={
                item.type === "Admin"
                  ? () =>
                      openRemoveAdminModal(
                        item.name,
                        item.email,
                        index,
                        setRawUserList
                      )
                  : () =>
                      openMakeAdminModal(
                        item.name,
                        item.email,
                        index,
                        setRawUserList
                      )
              }
            >
              {item.type === "Admin" ? "Remove Admin" : "Make Admin"}
            </Menu.Item>

            <Menu.Item
              icon={
                item.type === "Banned" ? (
                  <IconCheck size={16} stroke={1.5} />
                ) : (
                  <IconBan size={16} stroke={1.5} />
                )
              }
              onClick={
                item.type === "Banned"
                  ? () =>
                      openUnbanModal(
                        item.name,
                        item.email,
                        index,
                        setRawUserList
                      )
                  : () =>
                      openBanModal(item.name, item.email, index, setRawUserList)
              }
            >
              {item.type === "Banned" ? "Unban" : "Ban"} User
            </Menu.Item>

            <Menu.Item
              icon={<IconTrash size={16} stroke={1.5} />}
              onClick={() =>
                openDeleteModal(item.name, item.email, index, setRawUserList)
              }
            >
              Delete User
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  ));

  return (
    <Container fluid className={classes.container}>
      <SearchAndFilterUsers setSearchObj={setSearchParams} />
      <Paper
        withBorder
        p={30}
        mt={30}
        radius="lg"
        className={classes.userContainer}
      >
        <Container className={classes.table}>
          <MantineProvider>
            <ModalsProvider>
              <ScrollArea>
                <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </Table>
              </ScrollArea>
            </ModalsProvider>
          </MantineProvider>
        </Container>
        <Container className={classes.pagination}>
          <PaginationNavbar
            apiEndpointExtension={"users"}
            numberOfItemsPerPage={10}
            setListOfObjects={setRawUserList}
            searchFilterObject={searchParams}
          />
        </Container>
      </Paper>
    </Container>
  );
}
