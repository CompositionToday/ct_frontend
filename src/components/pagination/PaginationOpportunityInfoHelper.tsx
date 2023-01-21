import { OpportunityItem } from "./PaginationHelper";
import styled from "@emotion/styled";
import { Flex } from "@mantine/core";

export interface PaginationOpportunityInfoProp {
  opportunity: OpportunityItem | null;
  opportunityType: string;
}

export const PaginationOpportunityInfoContainer = styled.div`
  padding: 10px;
`;

export const OpportunityTitle = styled.h1`
  color: #228be6;
  font-size: 27px;
`;

export const CityState = styled.p`
  margin-left: 10px;
  font-size: 15px;
`;

export const PaginationButtonsContainer = styled(Flex)`
  margin-top: 15px;
`;

export const DescriptionContainer = styled.div`
  margin-top: 10px;
`;

export const Label = styled.h2`
  font-size: 20px;
  display: inline;
`;

export const SpecificOpportunityInfoContainer = styled.div`
  margin-top: 16px;
`;
