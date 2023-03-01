import { OpportunityItem } from "./OpportunityHelper";
import {
  SpecificOpportunityInfoContainer,
  CityState,
} from "./OpportunityInfoHelper";
import {
  IconMoneybag,
  IconBriefcase,
  IconMap2,
  IconCategory,
  IconTrophy,
  IconCalendarEvent,
  IconClockHour4,
  IconMapPin,
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
        {opportunity?.competition_category && (
          <Tooltip label="Category">
            <Flex align="center">
              <IconCategory size={30} color="#40C057" />
              <span style={{ fontSize: "17px", marginLeft: "10px" }}>
                {opportunity?.competition_category}
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
        {opportunity?.city && opportunity?.state && (
          <Tooltip label="Location">
            <Flex align="center">
              <IconMapPin size={30} color="#40C057" />
              <CityState
                style={{
                  display: "inline",
                  fontSize: "17px",
                  margin: "0px 0px 0px 10px",
                }}
              >{`${opportunity.city}, ${opportunity.state}`}</CityState>
            </Flex>
          </Tooltip>
        )}
        {opportunity?.address && (
          <Tooltip label="Address">
            <Flex align="center">
              <IconMap2 size={30} color="#40C057" />
              <span style={{ fontSize: "17px", marginLeft: "10px" }}>
                {opportunity?.address}
              </span>
            </Flex>
          </Tooltip>
        )}
        {opportunity?.start_date && (
          <Tooltip label="Date">
            <Flex align="center">
              <IconCalendarEvent size={30} color="#40C057" />
              <span style={{ fontSize: "17px", marginLeft: "10px" }}>
                {new Date(opportunity?.start_date as string).toLocaleDateString(
                  "en-us",
                  { year: "numeric", month: "short", day: "numeric" }
                )}
              </span>
            </Flex>
          </Tooltip>
        )}
        {opportunity?.start_time && (
          <Tooltip label="Start Time">
            <Flex align="center">
              <IconClockHour4 size={30} color="#40C057" />
              <span style={{ fontSize: "17px", marginLeft: "10px" }}>
                {new Date(opportunity?.start_time as number).toLocaleString(
                  "en-US",
                  { hour: "numeric", minute: "numeric", hour12: true }
                )}
              </span>
            </Flex>
          </Tooltip>
        )}
      </SpecificOpportunityInfoContainer>
    );
  }

  if (opportunityType === "jobs") {
    return (
      <SpecificOpportunityInfoContainer>
        {opportunity?.city && opportunity?.state && (
          <Tooltip label="Location">
            <Flex align="center">
              <IconMapPin size={30} color="#40C057" />
              <CityState
                style={{
                  display: "inline",
                  fontSize: "17px",
                  margin: "0px 0px 0px 10px",
                }}
              >{`${opportunity.city}, ${opportunity.state}`}</CityState>
            </Flex>
          </Tooltip>
        )}
        {opportunity?.job_type && (
          <Tooltip label="Job Type">
            <Flex align="center">
              <IconBriefcase size={30} color="#40C057" />
              <span style={{ fontSize: "17px", marginLeft: "10px" }}>
                {opportunity?.job_type}
              </span>
            </Flex>
          </Tooltip>
        )}
        {opportunity?.job_category && (
          <Tooltip label="Job Category">
            <Flex align="center">
              <IconCategory size={30} color="#40C057" />
              <span style={{ fontSize: "17px", marginLeft: "10px" }}>
                {opportunity?.job_category}
              </span>
            </Flex>
          </Tooltip>
        )}
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
      </SpecificOpportunityInfoContainer>
    );
  }

  if (opportunityType === "festivals") {
    return (
      <SpecificOpportunityInfoContainer>
        {opportunity?.city && opportunity?.state && (
          <Tooltip label="Location">
            <Flex align="center">
              <IconMapPin size={30} color="#40C057" />
              <CityState
                style={{
                  display: "inline",
                  fontSize: "17px",
                  margin: "0px 0px 0px 10px",
                }}
              >{`${opportunity.city}, ${opportunity.state}`}</CityState>
            </Flex>
          </Tooltip>
        )}
        {opportunity?.address && (
          <Tooltip label="Address">
            <Flex align="center">
              <IconMap2 size={30} color="#40C057" />
              <span style={{ fontSize: "17px", marginLeft: "10px" }}>
                {opportunity?.address}
              </span>
            </Flex>
          </Tooltip>
        )}
        {opportunity?.start_date && opportunity?.end_date && (
          <Tooltip label="Date">
            <Flex align="center">
              <IconCalendarEvent size={30} color="#40C057" />
              <span style={{ fontSize: "17px", marginLeft: "10px" }}>
                {new Date(opportunity?.start_date as string).toLocaleDateString(
                  "en-us",
                  { year: "numeric", month: "short", day: "numeric" }
                )}{" "}
                -{" "}
                {new Date(opportunity?.end_date as string).toLocaleDateString(
                  "en-us",
                  { year: "numeric", month: "short", day: "numeric" }
                )}
              </span>
            </Flex>
          </Tooltip>
        )}
      </SpecificOpportunityInfoContainer>
    );
  }

  return null;
};
