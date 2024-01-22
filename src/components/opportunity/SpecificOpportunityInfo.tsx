import { OpportunityItem } from "./OpportunityHelper";
import { CityState } from "./OpportunityInfoHelper";
import {
  IconMoneybag,
  IconBriefcase,
  IconMap2,
  IconCategory,
  IconTrophy,
  IconCalendarEvent,
  IconClockHour4,
  IconMapPin,
  IconCurrencyDollar,
  IconAlarm,
} from "@tabler/icons";
import { Flex, Tooltip } from "@mantine/core";
import { useEffect } from "react";

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
      <Flex direction="column" align="flex-start">
        {opportunity?.winner && (
          <Tooltip label="Winner" position="top-start">
            <Flex align="center" sx={{ maxWidth: "100%" }}>
              <IconTrophy size={30} color="#FAB005" style={{ flexShrink: 0 }} />
              <span
                style={{
                  fontSize: "17px",
                  marginLeft: "10px",
                  width: "90%",
                }}
              >
                {opportunity?.winner}
              </span>
            </Flex>
          </Tooltip>
        )}
        {opportunity?.competition_category && (
          <Tooltip label="Category" position="top-start">
            <Flex align="center" sx={{ maxWidth: "100%" }}>
              <IconCategory size={30} color="#40C057" />
              <span style={{ fontSize: "17px", marginLeft: "10px" }}>
                {opportunity?.competition_category}
              </span>
            </Flex>
          </Tooltip>
        )}
        {opportunity?.end_date && (
          <Tooltip label="Application Deadline" position="top-start">
            <Flex align="center" sx={{ maxWidth: "100%" }}>
              <IconAlarm size={30} color="#40C057" />
              <span style={{ fontSize: "17px", marginLeft: "10px" }}>
                {new Date(opportunity?.end_date as string).toLocaleDateString(
                  "en-us",
                  { year: "numeric", month: "short", day: "numeric" }
                )}
              </span>
            </Flex>
          </Tooltip>
        )}
        <Tooltip label="Fee" position="top-start">
          <Flex align="center" sx={{ maxWidth: "100%" }}>
            <IconCurrencyDollar size={30} color="#40C057" />
            <span style={{ fontSize: "17px", marginLeft: "10px" }}>
              {opportunity?.fee
                ? parseFloat(opportunity?.fee as string).toFixed(2)
                : "Free"}
            </span>
          </Flex>
        </Tooltip>
      </Flex>
    );
  }

  if (opportunityType === "concerts") {
    return (
      <Flex direction="column" align="flex-start">
        {opportunity?.city && opportunity?.state && (
          <Tooltip label="Location" position="top-start">
            <Flex align="center" sx={{ maxWidth: "100%" }}>
              <IconMapPin size={30} color="#40C057" />
              <CityState
                style={{
                  display: "inline",
                  fontSize: "17px",
                  margin: "0px 0px 0px 10px",
                }}
              >
                {opportunity.state === "Remote"
                  ? "Remote"
                  : `${opportunity.city},
              ${opportunity.state}`}
              </CityState>
            </Flex>
          </Tooltip>
        )}
        {opportunity?.address && (
          <Tooltip label="Address" position="top-start">
            <Flex align="center" sx={{ maxWidth: "100%" }}>
              <IconMap2 size={30} color="#40C057" style={{ flexShrink: 0 }} />
              <span
                style={{
                  fontSize: "17px",
                  marginLeft: "10px",
                  width: "90%",
                }}
              >
                {opportunity?.address}
              </span>
            </Flex>
          </Tooltip>
        )}
        {opportunity?.end_date && (
          <Tooltip label="Date" position="top-start">
            <Flex align="center" sx={{ maxWidth: "100%" }}>
              <IconCalendarEvent size={30} color="#40C057" />
              <span style={{ fontSize: "17px", marginLeft: "10px" }}>
                {new Date(opportunity?.end_date as string).toLocaleDateString(
                  "en-us",
                  { year: "numeric", month: "short", day: "numeric" }
                )}
              </span>
            </Flex>
          </Tooltip>
        )}
        {opportunity?.start_time && (
          <Tooltip label="Start Time" position="top-start">
            <Flex align="center" sx={{ maxWidth: "100%" }}>
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
      </Flex>
    );
  }

  if (opportunityType === "jobs") {
    return (
      <Flex direction="column" align="flex-start">
        {opportunity?.city && opportunity?.state && (
          <Tooltip label="Location" position="top-start">
            <Flex align="center" sx={{ maxWidth: "100%" }}>
              <IconMapPin size={30} color="#40C057" />
              <CityState
                style={{
                  display: "inline",
                  fontSize: "17px",
                  margin: "0px 0px 0px 10px",
                }}
              >
                {opportunity.state === "Remote"
                  ? "Remote"
                  : `${opportunity.city},
              ${opportunity.state}`}
              </CityState>
            </Flex>
          </Tooltip>
        )}
        {opportunity?.job_type && (
          <Tooltip label="Job Type" position="top-start">
            <Flex align="center" sx={{ maxWidth: "100%" }}>
              <IconBriefcase size={30} color="#40C057" />
              <span style={{ fontSize: "17px", marginLeft: "10px" }}>
                {opportunity?.job_type}
              </span>
            </Flex>
          </Tooltip>
        )}
        {opportunity?.job_category && (
          <Tooltip label="Job Category" position="top-start">
            <Flex align="center" sx={{ maxWidth: "100%" }}>
              <IconCategory size={30} color="#40C057" />
              <span style={{ fontSize: "17px", marginLeft: "10px" }}>
                {opportunity?.job_category}
              </span>
            </Flex>
          </Tooltip>
        )}
        {opportunity?.salary && (
          <Tooltip label="Salary" position="top-start">
            <Flex align="center" sx={{ maxWidth: "100%" }}>
              <IconMoneybag
                size={30}
                color="#40C057"
                style={{ flexShrink: 0 }}
              />
              <span
                style={{
                  fontSize: "17px",
                  marginLeft: "10px",
                  width: "90%",
                }}
              >
                $
                {opportunity?.salary
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </Flex>
          </Tooltip>
        )}
      </Flex>
    );
  }

  if (opportunityType === "festivals") {
    return (
      <Flex direction="column" align="flex-start">
        {opportunity?.city && opportunity?.state && (
          <Tooltip label="Location" position="top-start">
            <Flex align="center" sx={{ maxWidth: "100%" }}>
              <IconMapPin size={30} color="#40C057" />
              <CityState
                style={{
                  display: "inline",
                  fontSize: "17px",
                  margin: "0px 0px 0px 10px",
                }}
              >
                {opportunity.state === "Remote"
                  ? "Remote"
                  : `${opportunity.city},
              ${opportunity.state}`}
              </CityState>
            </Flex>
          </Tooltip>
        )}
        {opportunity?.address && (
          <Tooltip label="Address" position="top-start">
            <Flex align="center" sx={{ maxWidth: "100%" }}>
              <IconMap2 size={30} color="#40C057" style={{ flexShrink: 0 }} />
              <span
                style={{
                  fontSize: "17px",
                  marginLeft: "10px",
                  width: "90%",
                }}
              >
                {opportunity?.address}
              </span>
            </Flex>
          </Tooltip>
        )}
        {opportunity?.start_date && opportunity?.end_date && (
          <Tooltip label="Date" position="top-start">
            <Flex align="center" sx={{ maxWidth: "100%" }}>
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
        <Tooltip label="Application Deadline" position="top-start">
          <Flex align="center" sx={{ maxWidth: "100%" }}>
            <IconAlarm size={30} color="#40C057" />
            <span style={{ fontSize: "17px", marginLeft: "10px" }}>
              {new Date(opportunity?.deadline as string).toLocaleDateString(
                "en-us",
                { year: "numeric", month: "short", day: "numeric" }
              )}
            </span>
          </Flex>
        </Tooltip>
        <Tooltip label="Fee" position="top-start">
          <Flex align="center" sx={{ maxWidth: "100%" }}>
            <IconCurrencyDollar size={30} color="#40C057" />
            <span style={{ fontSize: "17px", marginLeft: "10px" }}>
              {/* {opportunity?.fee ? opportunity?.fee : "Free"} */}
              {opportunity?.fee
                ? parseFloat(opportunity?.fee as string).toFixed(2)
                : "Free"}
            </span>
          </Flex>
        </Tooltip>
      </Flex>
    );
  }

  return null;
};
