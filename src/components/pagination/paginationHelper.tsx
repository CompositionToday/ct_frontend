import React from "react";
import styled from "@emotion/styled";
import { Grid, Flex, MediaQuery } from "@mantine/core";

export const PageContainer = styled.div`
  border: 2px solid red;
  padding: 10px;
  margin: 1% 5%;
  position: absolute;
  width: 75vw;
  height: 80vh;
  overflow: hidden;
`;

export const PageGrid = styled(Grid)`
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 auto;
`;

export const PageFlex = styled(Flex)`
  height: 100%;
  paddingleft: 10px;
`;
