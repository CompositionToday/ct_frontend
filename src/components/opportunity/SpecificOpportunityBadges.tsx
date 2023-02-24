import { OpportunityItem } from "./OpportunityHelper";
import {
  IconMoneybag,
  IconBriefcase,
  IconCalendarEvent,
  IconCategory,
  IconTrophy,
} from "@tabler/icons";
import { Flex, Tooltip, Badge } from "@mantine/core";

interface SpecificOpportunityInfoProp {
  opportunity: OpportunityItem;
  opportunityType: string;
}

export const SpecificOpportunityBadges = ({
  opportunity,
  opportunityType,
}: SpecificOpportunityInfoProp) => {
  if (opportunityType === "competitions") {
    return (
      <>
        <Tooltip label="Category">
          <Badge
            leftSection={
              <IconCategory
                size={18}
                color="#40C057"
                style={{ marginBottom: "-3px" }}
              />
            }
            color="gray"
            sx={{ height: "25px", margin: "3px 5px 3px 0px" }}
          >
            {opportunity?.competition_category}
          </Badge>
        </Tooltip>
        {opportunity?.winner && (
          <Tooltip label="Winner">
            <Badge
              leftSection={
                <IconTrophy
                  size={18}
                  color="#FAB005"
                  style={{ marginBottom: "-3px" }}
                />
              }
              color="yellow"
              sx={{ height: "25px", margin: "3px 5px 3px 0px" }}
            >
              {opportunity?.winner}
            </Badge>
          </Tooltip>
        )}
      </>
    );
  }

  if (opportunityType === "concerts") {
    // Return the date and time
    return (
      <>
        <Tooltip label="Date">
          <Badge
            leftSection={
              <IconCalendarEvent
                size={18}
                color="#40C057"
                style={{ marginBottom: "-3px" }}
              />
            }
            color="gray"
            sx={{ height: "25px", margin: "3px 5px 3px 0px" }}
          >
            {new Date(opportunity?.start_date as string).toLocaleDateString(
              "en-us",
              { year: "numeric", month: "short", day: "numeric" }
            )}
          </Badge>
        </Tooltip>
      </>
    );
  }

  if (opportunityType === "jobs") {
    return (
      <>
        {opportunity?.job_type && (
          <Tooltip label="Job Type">
            <Badge
              leftSection={
                <IconBriefcase
                  size={18}
                  color="#40C057"
                  style={{ marginBottom: "-3px" }}
                />
              }
              color="gray"
              sx={{ height: "25px", margin: "3px 5px 3px 0px" }}
            >
              {opportunity?.job_type}
            </Badge>
          </Tooltip>
        )}
        <Tooltip label="Job Category">
          <Badge
            leftSection={
              <IconCategory
                size={18}
                color="#40C057"
                style={{ marginBottom: "-3px" }}
              />
            }
            color="gray"
            sx={{ height: "25px", margin: "3px 5px 3px 0px" }}
          >
            {opportunity?.job_category}
          </Badge>
        </Tooltip>
        {opportunity?.salary && (
          <Tooltip label="Salary">
            <Badge
              leftSection={
                <IconMoneybag
                  size={18}
                  color="#40C057"
                  style={{ marginBottom: "-3px" }}
                />
              }
              color="gray"
              sx={{ height: "25px", margin: "3px 5px 3px 0px" }}
            >
              $
              {opportunity?.salary
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Badge>
          </Tooltip>
        )}
      </>
    );
  }

  if (opportunityType === "festivals") {
    // Return dates and times
    return (
      <>
        <Tooltip label="Date">
          <Badge
            leftSection={
              <IconCalendarEvent
                size={18}
                color="#40C057"
                style={{ marginBottom: "-3px" }}
              />
            }
            color="gray"
            sx={{ height: "25px", margin: "3px 5px 3px 0px" }}
          >
            {new Date(opportunity?.start_date as string).toLocaleDateString(
              "en-us",
              { year: "numeric", month: "short", day: "numeric" }
            )}{" "}
            -{" "}
            {new Date(opportunity?.end_date as string).toLocaleDateString(
              "en-us",
              { year: "numeric", month: "short", day: "numeric" }
            )}
          </Badge>
        </Tooltip>
      </>
    );
  }

  return null;
};
