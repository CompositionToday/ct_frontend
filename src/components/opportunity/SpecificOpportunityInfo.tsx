import { OpportunityItem } from "./OpportunityHelper";
import {
  SpecificOpportunityInfoContainer,
  Label,
} from "./OpportunityInfoHelper";
import {
  IconMoneybag,
  IconBriefcase,
  IconMap2,
  IconCategory,
  IconTrophy,
} from "@tabler/icons";
import { Flex, Tooltip } from "@mantine/core";

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
        <Tooltip label="Category">
          <Flex align="center">
            <IconCategory size={30} color="#40C057" />
            <span style={{ fontSize: "17px", marginLeft: "10px" }}>
              {opportunity?.competition_category}
            </span>
          </Flex>
        </Tooltip>
        {opportunity?.winner && (
          <Tooltip label="Winner">
            <Flex align="center">
              <IconTrophy size={30} color="#FAB005" />
              <span style={{ fontSize: "17px", marginLeft: "10px" }}>
                {opportunity?.winner}
              </span>
            </Flex>
          </Tooltip>
        )}
      </SpecificOpportunityInfoContainer>
    );
  }

  if (opportunityType === "concerts") {
    return (
      <SpecificOpportunityInfoContainer>
        <Tooltip label="Address">
          <Flex align="center">
            <IconMap2 size={30} color="#40C057" />
            <span style={{ fontSize: "17px", marginLeft: "10px" }}>
              {opportunity?.address}
            </span>
          </Flex>
        </Tooltip>
      </SpecificOpportunityInfoContainer>
    );
  }

  if (opportunityType === "jobs") {
    return (
      <SpecificOpportunityInfoContainer>
        {opportunity?.salary && (
          <Tooltip label="Salary">
            <Flex align="center">
              <IconMoneybag size={30} color="#40C057" />
              <span style={{ fontSize: "17px", marginLeft: "10px" }}>
                $
                {opportunity?.salary
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </Flex>
          </Tooltip>
        )}
        <Tooltip label="Job Category">
          <Flex align="center">
            <IconBriefcase size={30} color="#40C057" />
            <span style={{ fontSize: "17px", marginLeft: "10px" }}>
              {opportunity?.job_category}
            </span>
          </Flex>
        </Tooltip>
        <Tooltip label="Job Type">
          <Flex align="center">
            <IconBriefcase size={30} color="#40C057" />
            <span style={{ fontSize: "17px", marginLeft: "10px" }}>
              {opportunity?.job_type}
            </span>
          </Flex>
        </Tooltip>
      </SpecificOpportunityInfoContainer>
    );
  }

  if (opportunityType === "festivals") {
    return (
      <SpecificOpportunityInfoContainer>
        <Tooltip label="Address">
          <Flex align="center">
            <IconMap2 size={30} color="#40C057" />
            <span style={{ fontSize: "17px", marginLeft: "10px" }}>
              {opportunity?.address}
            </span>
          </Flex>
        </Tooltip>
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
      </SpecificOpportunityInfoContainer>
    );
  }

  return null;
};
