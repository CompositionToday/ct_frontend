import {
  OpportunityInfoProp,
  OpportunityInfoContainer,
  MoreInfoOpportunityTitle,
  ButtonsContainer,
  DescriptionContainer,
  Label,
  DescriptionContent,
} from "./OpportunityInfoHelper";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import {
  Flex,
  Button,
  ActionIcon,
  Tooltip,
  Badge,
  Alert,
  Text,
  Center,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import {
  IconExternalLink,
  IconFlag,
  IconPencil,
  IconTrash,
  IconFlagOff,
  IconBan,
  IconAlertCircle,
<<<<<<< HEAD
  IconSquareNumber0,
=======
  IconMoodSad,
>>>>>>> kiersten-updates-4
} from "@tabler/icons";
import { SpecificOpportunityInfo } from "./SpecificOpportunityInfo";
import { openDeletePostModal } from "./modals/DeletePostModal";
import { openBanPostModal } from "./modals/BanPostModal";
import { openFlagPostModal } from "./modals/FlagPostModal";
import { openResetFlagCountPostModal } from "./modals/ResetReportCountModal";

export function OpportunityInfo({
  apiEndpoint,
  opportunity,
  opportunityType,
  setEditModal,
  setDeleteModal,
  handleDeletePost,
  handleBanPost,
  handleFlagPost,
  handleResetReportCount,
  deleteComment,
}: // setHelperDeleteComment,
OpportunityInfoProp) {
  const [userUID, setUserUID] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [endDate, setEndDate] = useState(
    typeof opportunity?.end_date === "number"
      ? new Date(opportunity?.end_date)
      : new Date()
  );
  const [startDate, setStartDate] = useState(
    typeof opportunity?.start_date === "number"
      ? new Date(opportunity?.start_date)
      : new Date()
  );
  const largeScreen = useMediaQuery("(min-width: 992px)");
  const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserUID(user.uid);
        try {
          let response = await fetch(
            `${url}/users?keyword=${user.email}&page_number=1`
          );
          let responseJson = await response.json();
          console.log(
            "user admin return:",
            responseJson.listOfObjects[0].is_admin
          );
          if (responseJson.listOfObjects[0].is_admin === 1) {
            setIsAdmin(true);
          }
        } catch (err) {
          console.log(err);
        }
      }
    });

    setStartDate(
      typeof opportunity?.start_date === "number"
        ? new Date(opportunity?.start_date)
        : new Date()
    );
    setEndDate(
      typeof opportunity?.end_date === "number"
        ? new Date(opportunity?.end_date)
        : new Date()
    );
  }, []);

  useEffect(() => {
    console.log("start: ", startDate);
    console.log("end: ", endDate);
    console.log(opportunity);
    console.log(typeof opportunity?.end_date);
  }, [endDate, startDate, opportunity]);

  useEffect(() => {
    console.log("Users Uid: ", userUID);
    console.log("isAdmin: ", isAdmin);
  }, [userUID, setIsAdmin]);

  if (!opportunity) {
    return (
      <Center sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Text color="dimmed" size={30} mb={15}>
          No results found
        </Text>
        <IconMoodSad size={45} color="#868E96" />
      </Center>
    );
  }

  return (
    <OpportunityInfoContainer>
      <ButtonsContainer
        justify="flex-end"
        gap="sm"
        wrap="wrap"
        direction={"row"}
      >
        <Tooltip label="Edit Post" withArrow>
          <ActionIcon
            color="green"
            sx={{
              height: 30,
              alignSelf: "flex-start",
              display: opportunity.UID === userUID || isAdmin ? "auto" : "none",
            }}
            onClick={() => {
              setEditModal(true);
            }}
          >
            <IconPencil />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete Post" withArrow>
          <ActionIcon
            color="red"
            sx={{
              height: 30,
              alignSelf: "flex-start",
              display: opportunity.UID === userUID || isAdmin ? "auto" : "none",
            }}
            onClick={() =>
              openDeletePostModal(
                opportunity?.title ? opportunity.title : "",
                handleDeletePost
                  ? handleDeletePost
                  : () => console.log("No delete function passed"),
                isAdmin && opportunity.UID !== userUID ? true : false,
                deleteComment
              )
            }
          >
            <IconTrash />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Ban User" withArrow>
          <ActionIcon
            color="red"
            sx={{
              height: 30,
              alignSelf: "flex-start",
              display: isAdmin && opportunity.UID !== userUID ? "auto" : "none",
            }}
            onClick={() =>
              openBanPostModal(
                opportunity?.title ? opportunity.title : "",
                handleBanPost
                  ? handleBanPost
                  : () => console.log("No ban function passed")
              )
            }
          >
            <IconBan />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Report Post" withArrow>
          <ActionIcon
            color="yellow"
            sx={{
              height: 30,
              alignSelf: "flex-start",
              display: isAdmin && opportunity.UID !== userUID ? "auto" : "none",
            }}
            onClick={() => {
              openFlagPostModal(
                opportunity?.title ? opportunity.title : "",
                handleFlagPost
                  ? handleFlagPost
                  : () => console.log("No flag function passed")
              );
            }}
          >
            <IconFlag />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Report Post" withArrow>
          <ActionIcon
            color="green"
            sx={{
              height: 30,
              alignSelf: "flex-start",
              display: isAdmin ? "auto" : "none",
            }}
            onClick={() => {
              openResetFlagCountPostModal(
                opportunity?.title ? opportunity.title : "",
                handleResetReportCount
                  ? handleResetReportCount
                  : () => console.log("No flag function passed")
              );
            }}
          >
            <IconSquareNumber0 />
          </ActionIcon>
        </Tooltip>
      </ButtonsContainer>
      {opportunity.is_deleted ? (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Post Deleted"
          color="red"
          radius="md"
          sx={{ marginTop: "20px" }}
        >
          <p>
            {opportunity.deleted_comment
              ? opportunity.deleted_comment
              : "Your post has been deleted"}
          </p>
        </Alert>
      ) : null}
      {apiEndpoint.includes("posts") && (
        <Badge sx={{ margin: "15px 5px 3px 0px" }}>
          {opportunity.type?.substring(0, opportunity.type?.length - 1)}
        </Badge>
      )}
      {opportunity.is_deleted && apiEndpoint === "posts" ? (
        <Badge sx={{ margin: "15px 5px 3px 0px" }} color="red">
          Deleted
        </Badge>
      ) : null}
      {opportunity.is_flagged && apiEndpoint === "posts" ? (
        <Badge sx={{ margin: "15px 5px 3px 0px" }} color="yellow">
          Reported
        </Badge>
      ) : null}
      <MoreInfoOpportunityTitle>{opportunity.title}</MoreInfoOpportunityTitle>
      <Flex direction="column">
        {isAdmin && (
          <Tooltip label="Amount of Flags">
            <Flex align="center">
              <IconFlag size={30} color="#40C057" />
              <span style={{ fontSize: "17px", marginLeft: "10px" }}>
                {opportunity?.is_flagged}
              </span>
            </Flex>
          </Tooltip>
        )}
        <SpecificOpportunityInfo
          opportunity={opportunity}
          opportunityType={opportunityType}
        />
      </Flex>
      <a href={opportunity.link} target="blank">
        <Button
          radius="md"
          sx={{ height: 30, alignSelf: "flex-start", margin: "15px 0px" }}
          size="md"
          rightIcon={<IconExternalLink style={{ marginLeft: "-5px" }} />}
        >
          Apply
        </Button>
      </a>
      <DescriptionContainer>
        <Label>Description:</Label>
        <DescriptionContent>{opportunity.description}</DescriptionContent>
        <p>
          {typeof opportunity.start_date === "number"
            ? new Date(opportunity.start_date).toString()
            : `${new Date().toString()} deafulted`}
        </p>
      </DescriptionContainer>
    </OpportunityInfoContainer>
  );
}
