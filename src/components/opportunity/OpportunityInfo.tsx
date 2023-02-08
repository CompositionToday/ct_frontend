import {
  OpportunityInfoProp,
  OpportunityInfoContainer,
  OpportunityTitle,
  CityState,
  ButtonsContainer,
  DescriptionContainer,
  Label,
  SpecificOpportunityInfoContainer,
} from "./OpportunityInfoHelper";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import LocationIcon from "./LocationIcon.svg";
import ApplyIcon from "./ApplyIcon.svg";
import React, { useState, useEffect } from "react";
import { Flex, Button, MediaQuery, ActionIcon, Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconMapPin, IconExternalLink, IconEdit } from "@tabler/icons";

export function OpportunityInfo({
  opportunity,
  opportunityType,
  setEditModal,
}: OpportunityInfoProp) {
  const [userUID, setUserUID] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const largeScreen = useMediaQuery("(min-width: 992px)");
  const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";

  const SpecificOpportunityInfo = () => {
    if (opportunityType === "competitions") {
      return (
        <SpecificOpportunityInfoContainer>
          {opportunity?.winner && (
            <div>
              <Label>Winner: </Label>
              <span>{opportunity?.winner}</span>
            </div>
          )}
          <div>
            <Label>Category: </Label>
            <span>{opportunity?.category}</span>
          </div>
        </SpecificOpportunityInfoContainer>
      );
    }

    if (opportunityType === "concerts") {
      return (
        <SpecificOpportunityInfoContainer>
          <div>
            <Label>Address: </Label>
            <span>{opportunity?.address}</span>
          </div>
        </SpecificOpportunityInfoContainer>
      );
    }

    if (opportunityType === "jobs") {
      return (
        <SpecificOpportunityInfoContainer>
          {opportunity?.salary && (
            <div>
              <Label>Salary: </Label>
              <span>{opportunity?.salary}</span>
            </div>
          )}
          <div>
            <Label>Job Type: </Label>
            <span>{opportunity?.job_type}</span>
          </div>
        </SpecificOpportunityInfoContainer>
      );
    }

    // FIXME: Need to convert mySQL datetime to JS date
    if (opportunityType === "festivals") {
      return (
        <SpecificOpportunityInfoContainer>
          <div>
            <Label>Start Date: </Label>
            {/* FIXME: Need to make sure that when we get the start_date, from the backend, that I fix this code such that we get it as an integer */}
            <span>{opportunity?.start_date?.toString()}</span>
          </div>
          <div>
            <Label>Address: </Label>
            <span>{opportunity?.address}</span>
          </div>
        </SpecificOpportunityInfoContainer>
      );
    }

    return null;
  };

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
  }, []);

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
      <OpportunityTitle>{opportunity.title}</OpportunityTitle>
      <Flex align="center">
        {/* <img src={LocationIcon} style={{ height: "40px" }} />
         */}
        <ActionIcon color="green">
          <IconMapPin size={40} />
        </ActionIcon>
        <CityState
          style={{ display: "inline" }}
        >{`${opportunity.city}, ${opportunity.state}`}</CityState>
      </Flex>
      <ButtonsContainer
        justify=""
        gap="xl"
        wrap="wrap"
        direction={largeScreen ? "row" : "column"}
      >
        <Button
          radius="md"
          sx={{ height: 30, alignSelf: "flex-start" }}
          size="md"
        >
          Apply
          {/* <img src={ApplyIcon} style={{ height: "20px", marginLeft: "7px" }} /> */}
          <ActionIcon color="blue" variant="filled">
            <IconExternalLink />
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
          color="green"
          variant="filled"
          onClick={() => {
            setEditModal(true);
          }}
        >
          Edit
          <ActionIcon color="green" variant="filled">
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
        >
          Delete Post & Ban Account
        </Button>
      </ButtonsContainer>
      <SpecificOpportunityInfo />
      <DescriptionContainer>
        <Label>Description:</Label>
        <p>{opportunity.description}</p>
      </DescriptionContainer>
    </OpportunityInfoContainer>
  );
}
