import React from "react";
import styled from "@emotion/styled";
import { Grid, Flex, MediaQuery, createStyles } from "@mantine/core";

export const PageContainer = styled(Flex)`
  height: 50vh;
  width: 100vw;
  border: 2px solid black;
`;

export const OpportunityPageContainer = styled.div`
  margin-top: 30px;
`;

export const GridContainer = styled.div`
  border: 2px solid red;
  padding: 10px;
  width: 90vw;
  height: 75vh;
  overflow: hidden;
  margin: auto;
  margin-top: 20px;
`;

export const PageGrid = styled(Grid)`
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 auto;
`;

export const PageFlex = styled(Flex)`
  height: 100%;
  padding-left: 10px;
  overflow-y: auto;
`;
