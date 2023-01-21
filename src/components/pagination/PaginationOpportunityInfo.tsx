import {
  PaginationOpportunityInfoProp,
  PaginationOpportunityInfoContainer,
  OpportunityTitle,
} from "./PaginationOpportunityInfoHelper";
import LocationIcon from "./LocationIcon.svg";
import React, { useState, useEffect } from "react";

export function PaginationOpportunityInfo({
  opportunity,
}: PaginationOpportunityInfoProp) {
  if (!opportunity) {
    return (
      <div>
        <h1>Please select an item</h1>
      </div>
    );
  }

  return (
    <PaginationOpportunityInfoContainer>
      <OpportunityTitle>{opportunity.title}</OpportunityTitle>

      <img src={LocationIcon} style={{ height: "50px" }} />
      <p style={{ display: "inline" }}>Florida</p>
    </PaginationOpportunityInfoContainer>
  );
}
