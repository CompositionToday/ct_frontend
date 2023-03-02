import {
  OpportunityInfoProp,
  OpportunityInfoContainer,
  MoreInfoOpportunityTitle,
  CityState,
  ButtonsContainer,
  DescriptionContainer,
  Label,
  SpecificOpportunityInfoContainer,
  DescriptionContent,
} from "./OpportunityInfoHelper";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import LocationIcon from "./LocationIcon.svg";
import ApplyIcon from "./ApplyIcon.svg";
import React, { useState, useEffect } from "react";
import {
  Flex,
  Button,
  MediaQuery,
  ActionIcon,
  Modal,
  Tooltip,
  Alert,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import {
  IconMapPin,
  IconExternalLink,
  IconEdit,
  IconFlag,
  IconPencil,
  IconTrash,
  IconFlagOff,
  IconBan,
  IconAlertCircle,
} from "@tabler/icons";
import { OpportunityItem } from "./OpportunityHelper";
import { SpecificOpportunityInfo } from "./SpecificOpportunityInfo";
import { openDeleteModal } from "../adminView/modals/DeleteModal";
import { openDeletePostModal } from "./modals/DeletePostModal";
import { openBanPostModal } from "./modals/BanPostModal";
import { openFlagPostModal } from "./modals/FlagPostModal";

export function OpportunityInfo({
  opportunity,
  opportunityType,
  setEditModal,
  setDeleteModal,
  handleDeletePost,
  handleBanPost,
  handleFlagPost,
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
      <div>
        <h1>Please select an item</h1>
      </div>
    );
  }

  return (
    <OpportunityInfoContainer>
      <ButtonsContainer
        justify="flex-end"
        gap="sm"
        wrap="wrap"
        direction={largeScreen ? "row" : "column"}
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
            {!opportunity.is_flagged ? <IconFlag /> : <IconFlagOff />}
          </ActionIcon>
        </Tooltip>
      </ButtonsContainer>
      <MoreInfoOpportunityTitle>{opportunity.title}</MoreInfoOpportunityTitle>
      {opportunity.is_deleted && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Post Deleted"
          color="red"
        >
          <p>
            {opportunity.deleted_comment
              ? opportunity.deleted_comment
              : "Your post has been deleted"}
          </p>
          <p>{`this is the key: ${opportunity.deleted_comment}`}</p>
        </Alert>
      )}
      <Flex direction="column">
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
      <div>
        <Label>Opportunity Type: </Label>
        <span>{opportunity.type}</span>
      </div>
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
