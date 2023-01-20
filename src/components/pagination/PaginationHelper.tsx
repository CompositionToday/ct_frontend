import React from "react";
import styled from "@emotion/styled";
import { Grid, Flex, MediaQuery, createStyles } from "@mantine/core";

export declare enum jobType {
  teacher,
  tutor,
  professor,
  composor,
}

export interface opportunityItem {
  UID: string;
  idposts: number;
  title: string;
  description: string;
  link: string;
  date_posted: Date;
  city: string;
  state: string;
  organization: string;
  end_date: Date;
  salary?: string;
  job_type?: jobType | any;
  winner?: string | null;
  category?: string;
  address?: string;
  start_date?: Date;
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
  padding: 10px;
  width: 90vw;
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
  padding-left: 10px;
  overflow-y: auto;
`;

export const PaginationLeftColumnContainer = styled(Grid.Col)`
  height: 100%;
`;

export const PaginationRightColumnContainer = styled(Grid.Col)`
  border-left: 1px solid #a1a1a1;
  overflow-y: auto;
  height: 100%;
`;
