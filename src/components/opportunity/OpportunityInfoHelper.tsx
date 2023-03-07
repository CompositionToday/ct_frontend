import { OpportunityItem } from "./OpportunityHelper";
import styled from "@emotion/styled";
import { Button, Flex } from "@mantine/core";

export interface OpportunityInfoProp {
  apiEndpoint: string;
  opportunity: OpportunityItem | null;
  opportunityType: string;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setBannedModal: React.Dispatch<React.SetStateAction<boolean>>;
  setFlagModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeletePost?: () => void;
  handleBanPost?: () => void;
  handleFlagPost?: () => void;
  handleResetReportCount?: () => void;
  deleteComment: React.MutableRefObject<string>;
  // setHelperDeleteComment: React.Dispatch<React.SetStateAction<string>>;
}

interface DisplayButton {
  display?: boolean;
}

export const OpportunityInfoContainer = styled.div`
  padding-left: 25px;
  padding-right: 25px;
  overflow-wrap: break-word;
`;

export const OpportunityTitle = styled.h1`
  color: #228be6;
  font-size: 20px;
  // overflow-wrap: break-word;
  word-wrap: break-word;
`;

export const MoreInfoOpportunityTitle = styled.h1`
  color: #228be6;
  font-size: 24px;
`;

export const CityState = styled.p``;

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

export const SpecificOpportunityInfoInlineFlex = styled(Flex)`
  display: inline-flex;
`;

export const DescriptionContent = styled.p`
  white-space: pre-line;
  width: 100%;
  overflow-wrap: break-word;
`;
