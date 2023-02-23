import { OpportunityItem } from "./OpportunityHelper";
import styled from "@emotion/styled";
import { Button, Flex } from "@mantine/core";

export interface OpportunityInfoProp {
  opportunity: OpportunityItem | null;
  opportunityType: string;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setBannedModal: React.Dispatch<React.SetStateAction<boolean>>;
  setFlagModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DisplayButton {
  display?: boolean;
}

export const OpportunityInfoContainer = styled.div`
  padding-left: 25px;
  padding-right: 25px;
`;

export const OpportunityTitle = styled.h1`
  color: #228be6;
  font-size: 20px;
`;

export const MoreInfoOpportunityTitle = styled.h1`
  color: #228be6;
  font-size: 24px;
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
  font-size: 18px;
  display: inline;
`;

export const SpecificOpportunityInfoContainer = styled.div`
  margin-top: 16px;
`;

export const DescriptionContent = styled.p`
  white-space: pre-line;
  width: 100%;
  overflow-wrap: break-word;
`;
