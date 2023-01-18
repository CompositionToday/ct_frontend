import React from "react";
import styled from "@emotion/styled";
import { Grid, Flex, MediaQuery, createStyles } from "@mantine/core";

export const PageContainer = styled(Flex)`
  height: 100vh;
  width: 100vw;
`;

export const GridContainer = styled.div`
  border: 2px solid red;
  padding: 10px;
  margin-top: 100px;
  position: absolute;
  width: 90%;
  height: 75%;
  overflow: hidden;
`;

export const PageGrid = styled(Grid)`
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  overflow: visible;
`;

export const PageFlex = styled(Flex)`
  height: 100%;
  padding-left: 10px;
`;
