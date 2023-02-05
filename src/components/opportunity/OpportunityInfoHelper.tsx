import { OpportunityItem } from "./OpportunityHelper";
import styled from "@emotion/styled";
import { Flex } from "@mantine/core";

export interface OpportunityInfoProp {
  opportunity: OpportunityItem | null;
  opportunityType: string;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OpportunityInfoContainer = styled.div`
  padding: 10px;
`;

export const OpportunityTitle = styled.h1`
  color: #228be6;
  font-size: 25px;
`;

export const CityState = styled.p`
  margin-left: 10px;
  font-size: 15px;
`;

export const ButtonsContainer = styled(Flex)`
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
