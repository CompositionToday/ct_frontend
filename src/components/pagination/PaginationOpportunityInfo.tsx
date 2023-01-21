import {
  PaginationOpportunityInfoProp,
  PaginationOpportunityInfoContainer,
  OpportunityTitle,
  CityState,
  PaginationButtonsContainer,
  DescriptionContainer,
  Label,
  SpecificOpportunityInfoContainer,
} from "./PaginationOpportunityInfoHelper";
import LocationIcon from "./LocationIcon.svg";
import React, { useState, useEffect } from "react";
import { Flex, Button, MediaQuery } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export function PaginationOpportunityInfo({
  opportunity,
  opportunityType,
}: PaginationOpportunityInfoProp) {
  const largeScreen = useMediaQuery("(min-width: 992px");

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
    <PaginationOpportunityInfoContainer>
      <OpportunityTitle>{opportunity.title}</OpportunityTitle>
      <Flex align="center">
        <img src={LocationIcon} style={{ height: "40px" }} />
        <CityState
          style={{ display: "inline" }}
        >{`${opportunity.city}, ${opportunity.state}`}</CityState>
      </Flex>
      <PaginationButtonsContainer
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
      </PaginationButtonsContainer>
      <SpecificOpportunityInfo />
      <DescriptionContainer>
        <Label>Description:</Label>
        <p>{opportunity.description}</p>
      </DescriptionContainer>
    </PaginationOpportunityInfoContainer>
  );
}
