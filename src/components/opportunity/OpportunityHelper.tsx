import React from "react";
import styled from "@emotion/styled";
import { Grid, Flex, Button, TextInput, ActionIcon } from "@mantine/core";
import { DateRangePickerValue } from "@mantine/dates";

// FIXME: Need to get rid of or make optional title and organization here
export interface OpportunityItem {
  UID?: string;
  idposts?: number;
  keyword?: string;
  title?: string;
  organization?: string;
  link?: string;
  description?: string;
  date_posted?: Date | string | number;
  city?: string;
  state?: string;
  // end_date: Date | string | number;
  end_date?: Date | string | number;
  salary?: string | number;
  job_type?: string;
  winner?: string | null;
  competition_category?: string;
  job_category?: string;
  address?: string;
  is_deleted?: string | number;
  is_flagged?: string | number;
  type?: string;
  // start_date?: Date | string | number;
  start_date?: Date | string | number;
  start_time?: Date | string | number | null;
  author?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_expired?: string;
  is_banned?: number;
  is_admin?: number;
  ban_message?: string;
  deleted_comment?: string;
}

interface PaginationCard {
  selected: boolean;
}

interface GridContainer {
  medianScreen: boolean;
}

interface FilterIcon {
  isFilter: boolean;
}

export const PageContainer = styled(Flex)`
  height: 50vh;
  width: 110vw;
  border: 2px solid black;
`;

export const OpportunityPageContainer = styled.div`
  margin-top: 30px;
  // height: 84vh;
  min-height: 84vh;
  // background-color: red;
  // overflow-wrap: break-word;
  // overflow-x: hidden;
  position: relative;
`;

export const GridContainer = styled.div<GridContainer>`
  width: ${(props) => (props.medianScreen ? "100vw" : "80vw")};
  height: ${(props) => (props.medianScreen ? "auto" : "75vh")};
  min-height: ${(props) => (props.medianScreen ? "85vh" : "75vh")};
  overflow: visible;
  margin: auto;
`;

export const OpportunityGrid = styled(Grid)<GridContainer>`
  position: relative;
  height: 93%;
  text-align: left;
  margin: 0 auto;
  background-color: white;
  border: 1px solid #2f2f2f;
  border-bottom: ${(props) =>
    props.medianScreen ? "1px solid white" : "1px solid #2f2f2f"};
  border-radius: ${(props) => (props.medianScreen ? "auto" : "10px")};
`;

export const OpportunityLeftColumnContent = styled(Flex)<GridContainer>`
  height: 100%;
  min-height: ${(props) => (props.medianScreen ? "80vh" : "auto")};
  overflow-y: auto;
`;

export const OpportunityLeftColumnContainer = styled(Grid.Col)<GridContainer>`
  height: 100%;
  // min-height: ${(props) => (props.medianScreen ? "80vh" : "auto")};
  padding: 0;
  width: 100%;
`;

export const OpportunityRightColumnContainer = styled(Grid.Col)`
  border-left: 1px solid #a1a1a1;
  overflow-y: auto;
  height: 100%;
`;

export const OpportunityCard = styled.div<PaginationCard>`
  border-bottom: 1px solid;
  // width: 100%;
  padding-left: 25px;
  padding-right: 10px;
  padding-bottom: 15px;
  background-color: ${(props) => (props.selected ? "#e2f0fe" : "auto")};
  border-top-left-radius: 8px;
  // overflow-wrap: break-word;
  // word-wrap: break-word;
  // display: inline-block;
`;

export const PaginationNavbarContainer = styled(Flex)`
  // padding-top: 30px;
  // padding-bottom: 30px;
`;

export const CityStateContainer = styled.p`
  background-color: rgba(231, 245, 255, 255);
  display: inline-block;
  margin: 0;
  margin-bottom: 15px;
  border-radius: 10px;
  padding: 5px;
`;

export const SearchBar = styled(TextInput)<GridContainer>`
  width: ${(props) => (props.medianScreen ? "75%" : "35%")};
  min-width: 400px;
`;

export const OpportunityPaginationNavbarContainer = styled(Flex)`
  margin: auto;
  background: "white";
  flex-grow: 1;
`;
