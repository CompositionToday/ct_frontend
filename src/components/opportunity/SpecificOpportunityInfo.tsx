import React from "react";
import { OpportunityItem } from "./OpportunityHelper";
import {
  SpecificOpportunityInfoContainer,
  Label,
} from "./OpportunityInfoHelper";

interface SpecificOpportunityInfoProp {
  opportunity: OpportunityItem;
  opportunityType: string;
}

export const SpecificOpportunityInfo = ({
  opportunity,
  opportunityType,
}: SpecificOpportunityInfoProp) => {
  if (opportunityType === "competitions") {
    return (
      <SpecificOpportunityInfoContainer>
        {opportunity?.winner && (
          <div>
            <Label>Winner: </Label>
            <span>{opportunity?.winner}</span>
          </div>
        )}
        <div>
          <Label>Category: </Label>
          <span>{opportunity?.category}</span>
        </div>
      </SpecificOpportunityInfoContainer>
    );
  }

  if (opportunityType === "concerts") {
    return (
      <SpecificOpportunityInfoContainer>
        <div>
          <Label>Address: </Label>
          <span>{opportunity?.address}</span>
        </div>
      </SpecificOpportunityInfoContainer>
    );
  }

  if (opportunityType === "jobs") {
    return (
      <SpecificOpportunityInfoContainer>
        {opportunity?.salary && (
          <div>
            <Label>Salary: </Label>
            <span>
              $
              {opportunity?.salary
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </div>
        )}
        <div>
          <Label>Job Type: </Label>
          <span>{opportunity?.job_type}</span>
        </div>
      </SpecificOpportunityInfoContainer>
    );
  }

  if (opportunityType === "festivals") {
    return (
      <SpecificOpportunityInfoContainer>
        <div>
          <Label>Start Date: </Label>
          <span>
            {`${
              new Date(opportunity?.start_date as number).getMonth() + 1
            }/${new Date(
              opportunity?.start_date as number
            ).getDate()}/${new Date(
              opportunity?.start_date as number
            ).getFullYear()} ${new Date(opportunity?.start_date as number)}`}
          </span>
        </div>
        <div>
          <Label>Address: </Label>
          <span>{opportunity?.address}</span>
        </div>
      </SpecificOpportunityInfoContainer>
    );
  }

  return null;
};
