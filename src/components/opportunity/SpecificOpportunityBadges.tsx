import { OpportunityItem } from "./OpportunityHelper";
import {
  IconMoneybag,
  IconBriefcase,
  IconCalendarEvent,
  IconCategory,
  IconTrophy,
  IconMapPin,
  IconCurrencyDollar,
  IconUser,
  IconAlarm,
} from "@tabler/icons";
import { Tooltip, Badge } from "@mantine/core";
import { Opportunity } from "./Opportunity";
import genreIcon from "../../images/BigMusicNote.png";

interface SpecificOpportunityInfoProp {
  opportunity: OpportunityItem;
  opportunityType?: string;
}

export const SpecificOpportunityBadges = ({
  opportunity,
  opportunityType,
}: SpecificOpportunityInfoProp) => {
  if (opportunityType === "competitions") {
    return (
      <>
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
              sx={{
                height: "25px",
                margin: "3px 5px 3px 0px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "90%",
              }}
            >
              {opportunity?.winner}
            </Badge>
          </Tooltip>
        )}
        {opportunity?.competition_category && (
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
        )}
        <Tooltip label="Application Deadline">
          <Badge
            leftSection={
              <IconAlarm
                size={18}
                color="#40C057"
                style={{ marginBottom: "-3px" }}
              />
            }
            color="gray"
            sx={{ height: "25px", margin: "3px 5px 3px 0px" }}
          >
            {new Date(opportunity?.end_date as string).toLocaleDateString(
              "en-us",
              { year: "numeric", month: "short", day: "numeric" }
            )}
          </Badge>
        </Tooltip>
        {/*<Tooltip label="Fee">*/}
        {/*  <Badge*/}
        {/*    leftSection={*/}
        {/*      <IconCurrencyDollar*/}
        {/*        size={18}*/}
        {/*        color="#40C057"*/}
        {/*        style={{ marginBottom: "-3px" }}*/}
        {/*      />*/}
        {/*    }*/}
        {/*    color="gray"*/}
        {/*    sx={{ height: "25px", margin: "3px 5px 3px 0px" }}*/}
        {/*  >*/}
        {/*    {opportunity?.fee*/}
        {/*      ? parseFloat(opportunity?.fee as string).toFixed(2)*/}
        {/*      : "N/A"}*/}
        {/*  </Badge>*/}
        {/*</Tooltip>*/}
      </>
    );
  }

  if (opportunityType === "concerts") {
    // Return the date and time
    return (
      <>
        {opportunity?.genre && (
          <Tooltip label="Genre">
            <Badge
              leftSection={
                // <IconBriefcase
                //   size={18}
                //   color="#40C057"
                //   style={{ marginBottom: "-3px" }}
                // />
                <img src={genreIcon} width={"20px"} alt={"Genre"}/>
              }
              color="gray"
              sx={{
                height: "25px",
                margin: "3px 5px 3px 0px",
              }}
            >
              {opportunity?.genre}
            </Badge>
          </Tooltip>
        )}
        {opportunity?.city && opportunity?.state && (
          <Tooltip label="Location">
            <Badge
              leftSection={
                <IconMapPin
                  size={18}
                  color="#40C057"
                  style={{ marginBottom: "-3px" }}
                />
              }
              color="gray"
              sx={{ height: "25px", margin: "3px 5px 3px 0px" }}
            >
              {opportunity.state === "Remote"
                ? "Remote"
                : `${opportunity.city},
                ${opportunity.state}`}
            </Badge>
          </Tooltip>
        )}
        {opportunity?.end_date && (
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
              {new Date(opportunity?.end_date as string).toLocaleDateString(
                "en-us",
                { year: "numeric", month: "short", day: "numeric" }
              )}
            </Badge>
          </Tooltip>
        )}
      </>
    );
  }

  if (opportunityType === "jobs") {
    return (
      <>
        {opportunity?.city && opportunity?.state && (
          <Tooltip label="Location">
            <Badge
              leftSection={
                <IconMapPin
                  size={18}
                  color="#40C057"
                  style={{ marginBottom: "-3px" }}
                />
              }
              color="gray"
              sx={{ height: "25px", margin: "3px 5px 3px 0px" }}
            >
              {opportunity.state === "Remote"
                ? "Remote"
                : `${opportunity.city},
                ${opportunity.state}`}
            </Badge>
          </Tooltip>
        )}
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
              sx={{
                height: "25px",
                margin: "3px 5px 3px 0px",
              }}
            >
              {opportunity?.job_type}
            </Badge>
          </Tooltip>
        )}
        {opportunity?.job_category && (
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
        )}
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
        {opportunity?.genre && (
          <Tooltip label="Genre">
            <Badge
              leftSection={
                // <IconBriefcase
                //   size={18}
                //   color="#40C057"
                //   style={{ marginBottom: "-3px" }}
                // />
                <img src={genreIcon} width={"20px"} alt={"Genre"}/>
              }
              color="gray"
              sx={{
                height: "25px",
                margin: "3px 5px 3px 0px",
              }}
            >
              {opportunity?.genre}
            </Badge>
          </Tooltip>
        )}
        {opportunity?.city && opportunity?.state && (
          <Tooltip label="Location">
            <Badge
              leftSection={
                <IconMapPin
                  size={18}
                  color="#40C057"
                  style={{ marginBottom: "-3px" }}
                />
              }
              color="gray"
              sx={{ height: "25px", margin: "3px 5px 3px 0px" }}
            >
              {opportunity.state === "Remote"
                ? "Remote"
                : `${opportunity.city},
                ${opportunity.state}`}
            </Badge>
          </Tooltip>
        )}
        {opportunity?.start_date && opportunity?.end_date && (
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
        )}
        
        {/*<Tooltip label="Application Deadline">
          <Badge
            leftSection={
              <IconAlarm
                size={18}
                color="#40C057"
                style={{ marginBottom: "-3px" }}
              />
            }
            color="gray"
            sx={{ height: "25px", margin: "3px 5px 3px 0px" }}
          >
            {new Date(opportunity?.deadline as string).toLocaleDateString(
              "en-us",
              { year: "numeric", month: "short", day: "numeric" }
            )}
          </Badge>
        </Tooltip>*/}

        {/*<Tooltip label="Fee">*/}
        {/*  <Badge*/}
        {/*    leftSection={*/}
        {/*      <IconCurrencyDollar*/}
        {/*        size={18}*/}
        {/*        color="#40C057"*/}
        {/*        style={{ marginBottom: "-3px" }}*/}
        {/*      />*/}
        {/*    }*/}
        {/*    color="gray"*/}
        {/*    sx={{ height: "25px", margin: "3px 5px 3px 0px" }}*/}
        {/*  >*/}
        {/*    {opportunity?.fee*/}
        {/*      ? parseFloat(opportunity?.fee as string).toFixed(2)*/}
        {/*      : "N/A"}*/}
        {/*  </Badge>*/}
        {/*</Tooltip>*/}
      </>
    );
  }
  if (opportunityType === "compositions") {
    return (
      <>
        {opportunity?.genre && (
          <Tooltip label="Genre">
            <Badge
              leftSection={
                // <IconBriefcase
                //   size={18}
                //   color="#40C057"
                //   style={{ marginBottom: "-3px" }}
                // />
                <img src={genreIcon} width={"20px"} alt={"Genre"} />
              }
              color="gray"
              sx={{
                height: "25px",
                margin: "3px 5px 3px 0px",
              }}
            >
              {opportunity?.genre}
            </Badge>
          </Tooltip>
        )}
        {opportunity?.first_name && opportunity?.last_name && (
          <Tooltip label="Author" position="top-start">
            <Badge
              leftSection={<IconUser size={20} color="#40C057" />}
              color="gray"
              sx={{ height: "25px", margin: "3px 5px 3px 0px" }}
            >
              {opportunity?.first_name} {opportunity?.last_name}
            </Badge>
          </Tooltip>
        )}
        {/* {opportunity?.link && (
          <Tooltip label="Link">
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
              {opportunity?.link}
            </Badge>
          </Tooltip>
        )} */}
        {/* {opportunity?.likecount && (
          <Tooltip label="Like Count">
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
              {opportunity?.likecount != "0"
                ? "Likes: " + opportunity?.likecount
                : null}
            </Badge>
          </Tooltip>
        )} */}
      </>
    );
  }
  return null;
};
