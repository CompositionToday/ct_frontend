import {
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

interface UserTableData {
  name: string;
  type: string;
  email: string;
}

interface RawUserData {
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
    maxWidth: 1080,
    border: "1px solid #9E9E9E",
    borderRadius: "15px",
    padding: "20px",
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
  // const [pageCount, setPageCount] = useState(1);
  // const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   const getPageCount = async () => {
  //     try {
  //       // let responseCount = await fetch(
  //       //   `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/${opportunityType}/count`
  //       // );

  //       // let responseCountJson = await responseCount.json();
  //       // console.log("API COUNT: ", responseCountJson.count);
  //       // let numberOfPage = Math.ceil(responseCountJson.count / 4);
  //       setPageCount(2);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getPageCount();
  // }, []);

  useEffect(() => {
    const getCurrentUsersPage = async () => {
      try {
        let res = await fetch(
          `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/users?page_number=1`
        );

        let resJSON = await res.json();
        setRawUserList(resJSON.listOfObjects);
        // console.log("userList", rawUserList);
      } catch (err) {
        console.log(err);
      }
    };

    getCurrentUsersPage();
    convertRawUserDataToTableData();
  });

  const convertRawUserDataToTableData = () => {
    let newUserList: UserTableData[] = [];
    rawUserList.forEach((user) => {
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

  const rows = userList.map((item) => (
    <tr key={item.name}>
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
              icon={
                item.type === "Admin" ? (
                  <IconArrowBigDownLine size={16} stroke={1.5} />
                ) : (
                  <IconArrowBigUpLine size={16} stroke={1.5} />
                )
              }
              onClick={
                item.type === "Admin"
                  ? () => openRemoveAdminModal(item.name, item.email)
                  : () => openMakeAdminModal(item.name, item.email)
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
                  ? () => openUnbanModal(item.name)
                  : () => openBanModal(item.name)
              }
            >
              {item.type === "Banned" ? "Unban" : "Ban"} User
            </Menu.Item>

            <Menu.Item
              icon={<IconTrash size={16} stroke={1.5} />}
              onClick={() => openDeleteModal(item.name)}
            >
              Delete User
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  ));

  return (
    <Container className={classes.container}>
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
  );
}
