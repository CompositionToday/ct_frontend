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
import LocationIcon from "./LocationIcon.svg";
import ApplyIcon from "./ApplyIcon.svg";
import React, { useState, useEffect } from "react";
import { Flex, Button, MediaQuery, ActionIcon } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconMapPin, IconExternalLink, IconEdit } from "@tabler/icons";

export function OpportunityInfo({
  opportunity,
  opportunityType,
}: OpportunityInfoProp) {
  const largeScreen = useMediaQuery("(min-width: 992px)");

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
            <span>{opportunity?.start_date as string}</span>
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
          sx={{ height: 30, alignSelf: "flex-start" }}
          size="md"
          color="green"
          variant="filled"
        >
          Edit
          <ActionIcon color="green" variant="filled">
            <IconEdit />
          </ActionIcon>
        </Button>
        <Button
          radius="md"
          sx={{ height: 30, alignSelf: "flex-start" }}
          size="md"
          color="red"
          variant="filled"
        >
          Delete Post
        </Button>
        <Button
          radius="md"
          sx={{ height: 30, alignSelf: "flex-start" }}
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
