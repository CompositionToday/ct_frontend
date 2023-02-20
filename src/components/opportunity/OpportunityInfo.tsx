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
import { Flex, Button, MediaQuery, ActionIcon, Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import {
  IconMapPin,
  IconExternalLink,
  IconEdit,
  IconFlag,
  IconFlagOff,
} from "@tabler/icons";
import { OpportunityItem } from "./OpportunityHelper";
import { SpecificOpportunityInfo } from "./SpecificOpportunityInfo";

export function OpportunityInfo({
  opportunity,
  opportunityType,
  setEditModal,
  setDeleteModal,
  setBannedModal,
}: OpportunityInfoProp) {
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

        // let response = await fetch(
        //   `${url}/users?keyword=${user.email}&page_number=1`
        // );
        try {
          let response = await fetch(
            `${url}/users?keyword=${user.email}&page_number=1`
          );
          let responseJson = await response.json();
          console.log(responseJson.listOfObjects[0].is_admin);
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
      <MoreInfoOpportunityTitle>{opportunity.title}</MoreInfoOpportunityTitle>
      <Flex direction="row">
        <Flex align="center">
          <IconMapPin size={30} color="#40C057" />
          <CityState
            style={{ display: "inline", fontSize: "17px" }}
          >{`${opportunity.city}, ${opportunity.state}`}</CityState>
        </Flex>
        {/* REPLACE THIS WITH OTHER BADGES */}
        {/* <Flex align="center">
          <IconMapPin size={30} color="#40C057" />
          <CityState
            style={{ display: "inline", fontSize: "17px" }}
          >{`${opportunity.city}, ${opportunity.state}`}</CityState>
        </Flex> */}
      </Flex>
      <ButtonsContainer
        justify=""
        gap="xl"
        wrap="wrap"
        direction={largeScreen ? "row" : "column"}
      >
        <a href={opportunity.link} target="blank">
          <Button
            radius="md"
            sx={{ height: 30, alignSelf: "flex-start" }}
            size="md"
            rightIcon={<IconExternalLink style={{ marginLeft: "-5px" }} />}
          >
            Apply
          </Button>
        </a>
        <Button
          radius="md"
          sx={{
            height: 30,
            alignSelf: "flex-start",
            display: opportunity.UID === userUID || isAdmin ? "auto" : "none",
          }}
          size="md"
          color="green"
          variant="filled"
          onClick={() => {
            setEditModal(true);
          }}
        >
          Edit
          <ActionIcon
            color="green"
            variant="filled"
            sx={{ backgroundColor: "transparent" }}
          >
            <IconEdit />
          </ActionIcon>
        </Button>
        <Button
          radius="md"
          sx={{
            height: 30,
            alignSelf: "flex-start",
            display: opportunity.UID === userUID || isAdmin ? "auto" : "none",
          }}
          size="md"
          color="red"
          variant="filled"
          onClick={() => {
            setDeleteModal(true);
          }}
        >
          Delete Post
        </Button>
        <Button
          radius="md"
          sx={{
            height: 30,
            alignSelf: "flex-start",
            display: isAdmin ? "auto" : "none",
          }}
          size="md"
          color="red"
          variant="filled"
          onClick={() => setBannedModal(true)}
        >
          Delete Post & Ban Account
        </Button>
        <ActionIcon>
          {!opportunity.is_flagged ? <IconFlag /> : <IconFlagOff />}
        </ActionIcon>
      </ButtonsContainer>
      <SpecificOpportunityInfo
        opportunity={opportunity}
        opportunityType={opportunityType}
      />
      <Label>End Date:</Label>
      <p>{`${
        typeof opportunity.end_date === "number"
          ? new Date(opportunity.end_date).toString()
          : `${new Date()} defaulted end date`
      }`}</p>
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
