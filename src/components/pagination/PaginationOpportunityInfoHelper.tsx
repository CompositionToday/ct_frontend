import { OpportunityItem } from "./PaginationHelper";
import styled from "@emotion/styled";

export interface PaginationOpportunityInfoProp {
  opportunity: OpportunityItem | null;
}

export const PaginationOpportunityInfoContainer = styled.div`
  padding: 10px;
`;

export const OpportunityTitle = styled.h1`
  color: #228be6;
`;
