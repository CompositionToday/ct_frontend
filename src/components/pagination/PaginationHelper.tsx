import React from "react";
import styled from "@emotion/styled";
import { Grid, Flex, Button } from "@mantine/core";

export declare enum jobType {
  teacher,
  tutor,
  professor,
  composor,
}

export interface OpportunityItem {
  UID: string;
  idposts: number;
  title: string;
  description: string;
  link: string;
  date_posted: Date;
  city: string;
  state: string;
  organization: string;
  end_date: Date | string;
  salary?: string;
  job_type?: jobType | any;
  winner?: string | null;
  category?: string;
  address?: string;
  start_date?: Date | string;
}

export const PageContainer = styled(Flex)`
  height: 50vh;
  width: 100vw;
  border: 2px solid black;
`;

export const OpportunityPageContainer = styled.div`
  margin-top: 30px;
`;

export const GridContainer = styled.div`
  border: 1px solid #2f2f2f;
  border-radius: 10px;
  // padding: 10px;
  width: 75vw;
  height: 75vh;
  overflow: hidden;
  margin: auto;
  margin-top: 20px;
`;

export const PaginationGrid = styled(Grid)`
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 auto;
`;

export const PaginationLeftColumnContent = styled(Flex)`
  height: 100%;
  // padding-left: 10px;
  // padding-right: 10px;
  overflow-y: auto;
`;

export const PaginationLeftColumnContainer = styled(Grid.Col)`
  height: 100%;
  padding: 0;
`;

export const PaginationRightColumnContainer = styled(Grid.Col)`
  border-left: 1px solid #a1a1a1;
  overflow-y: auto;
  height: 100%;
`;

export const PaginationCard = styled.div`
  border-bottom: 1px solid #a1a1a1;
  padding-left: 10px;
  padding-right: 10px;
  // background-color: red;
`;

export const PaginationNavbarContainer = styled(Flex)`
  padding-top: 30px;
  padding-bottom: 30px;
`;
