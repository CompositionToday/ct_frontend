import { Location } from "../filter/Location";
import {
  DropdownCategory,
  SalaryInput,
  StartEndDatePicker,
  SubmitButtonContainer,
  TextInputFullWidth,
} from "./OpportunityFormHelper";
import React, { useState, useEffect } from "react";
import { Button, Container } from "@mantine/core";
import { FormHeader } from "./CreateOpportunityHelper";
import { useLocation } from "react-router-dom";
import { PaginationSearchObject } from "../pagination/PaginationNavbar";
import { DateRangePickerValue } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";

export interface OpportunityFilterFormProp {
  searchObj: PaginationSearchObject;
  setSearchObj: React.Dispatch<React.SetStateAction<PaginationSearchObject>>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

export function OpportunityFilterForm({
  searchObj,
  setSearchObj,
  keyword,
  setKeyword,
}: OpportunityFilterFormProp) {
  const [city, setCity] = useState(searchObj.city ? searchObj.city : "");
  const [state, setState] = useState(searchObj.state ? searchObj.state : "");
  const [dateRange, setDateRange] = useState<DateRangePickerValue>([
    searchObj.start_date ? new Date(searchObj.start_date) : null,
    searchObj.end_date ? new Date(searchObj.end_date) : null,
  ]);
  const [tempSearchObj, setTempSearchObj] = useState<PaginationSearchObject>({
    keyword: keyword ? keyword : "",
    salary: searchObj.salary,
    competition_category: searchObj.competition_category
      ? searchObj.competition_category
      : "",
    end_date: searchObj.end_date ? searchObj.end_date : 0,
    job_category: searchObj.job_category ? searchObj.job_category : "",
    author: searchObj.author ? searchObj.author : "",
    is_flagged: searchObj.is_flagged ? searchObj.is_flagged : "",
    is_deleted: searchObj.is_deleted ? searchObj.is_deleted : "",
    type: searchObj.type ? searchObj.type : "",
    is_expired: searchObj.is_expired ? searchObj.is_expired : "",
    job_type: searchObj.job_type ? searchObj.job_type : "",
  });
  const opportunityType = useLocation().pathname.slice(1);

  useEffect(() => {
    console.log("user effect is triggered: ", searchObj);
    console.log(searchObj);
  }, [searchObj]);

  const smallerScreen = useMediaQuery("(max-width: 992px)");

  return (
    <Container sx={{ padding: smallerScreen ? "20px" : "20px 40px" }}>
      <FormHeader>Filters</FormHeader>
      <DropdownCategory
        label="Competition Category"
        placeholder={`Select competitions category`}
        data={["Brass", "Woodwind", "Percussion"]}
        allowDeselect
        clearable
        display={opportunityType === "competitions"}
        onChange={(e) =>
          setTempSearchObj({
            ...tempSearchObj,
            competition_category: e ? e : "",
          })
        }
        value={
          tempSearchObj.competition_category
            ? tempSearchObj.competition_category
            : ""
        }
      />
      <DropdownCategory
        label="Job Category"
        placeholder={`Select job category`}
        allowDeselect
        clearable
        display={opportunityType === "jobs"}
        data={[
          "Faculty",
          "Instruction",
          "Publishing",
          "Performance",
          "Composing",
          "Other",
        ]}
        onChange={(e) =>
          setTempSearchObj({
            ...tempSearchObj,
            job_category: e ? e : "",
          })
        }
        value={tempSearchObj.job_category ? tempSearchObj.job_category : ""}
      />
      <DropdownCategory
        label="Job Type"
        placeholder={`Select job type`}
        allowDeselect
        clearable
        display={opportunityType === "jobs"}
        data={[
          "Full-time",
          "Part-time",
          "Contract",
          "Temporary",
          "Volunteer",
          "Internship",
        ]}
        onChange={(e) =>
          setTempSearchObj({
            ...tempSearchObj,
            job_type: e ? e : "",
          })
        }
        value={tempSearchObj.job_type ? tempSearchObj.job_type : ""}
      />
      <DropdownCategory
        label="Post Type"
        placeholder={`Select`}
        allowDeselect
        clearable
        display={
          opportunityType === "admin/recent-posts" ||
          opportunityType === "my-posts"
        }
        data={[
          { value: "jobs", label: "Job" },
          {
            value: "competitions",
            label: "Competition",
          },
          { value: "festivals", label: "Festival" },
          { value: "concerts", label: "Concert" },
        ]}
        onChange={(e) =>
          setTempSearchObj({
            ...tempSearchObj,
            type: e ? e : "",
          })
        }
        value={
          (tempSearchObj.type as string) ? (tempSearchObj.type as string) : ""
        }
      />
      <Location
        city={city}
        setCity={setCity}
        state={state}
        setState={setState}
        withAsterisk={false}
        display={opportunityType !== "competitions"}
      />
      <SalaryInput
        label="Minimum Salary"
        placeholder="Enter an amount"
        display={opportunityType === "jobs"}
        value={tempSearchObj.salary}
        onChange={(e) => {
          console.log(e);
          setTempSearchObj({
            ...tempSearchObj,
            salary: e,
          });
        }}
        icon={<p style={{ color: "black" }}>$</p>}
        min={0}
        parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
        formatter={(value) =>
          !Number.isNaN(parseFloat(value ? value : ""))
            ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : ""
        }
      />
      <TextInputFullWidth
        label="Author"
        placeholder="Author"
        display={opportunityType === "admin/recent-posts"}
        value={tempSearchObj.author}
        onChange={(e) =>
          setTempSearchObj({ ...tempSearchObj, author: e.target.value })
        }
      />
      <DropdownCategory
        label="Reported Status"
        placeholder={`Select`}
        allowDeselect
        clearable
        display={
          opportunityType === "admin/recent-posts" ||
          opportunityType === "my-posts"
        }
        data={[
          { value: "1", label: "Reported posts" },
          {
            value: "0",
            label: "Non-reported posts",
          },
        ]}
        onChange={(e) =>
          setTempSearchObj({
            ...tempSearchObj,
            is_flagged: e && e !== "-1" ? e : "",
          })
        }
        value={
          (tempSearchObj.is_flagged as string)
            ? (tempSearchObj.is_flagged as string)
            : ""
        }
      />
      <DropdownCategory
        label="Deleted Status"
        placeholder={`Select`}
        allowDeselect
        clearable
        display={
          opportunityType === "admin/recent-posts" ||
          opportunityType === "my-posts"
        }
        data={[
          { value: "1", label: "Deleted posts" },
          {
            value: "0",
            label: "Non-deleted posts",
          },
        ]}
        onChange={(e) =>
          setTempSearchObj({
            ...tempSearchObj,
            is_deleted: e && e !== "-1" ? e : "",
          })
        }
        value={
          (tempSearchObj.is_deleted as string)
            ? (tempSearchObj.is_deleted as string)
            : ""
        }
      />
      <DropdownCategory
        label="Expired Status"
        placeholder={`Select`}
        allowDeselect
        clearable
        display={
          opportunityType === "admin/recent-posts" ||
          opportunityType === "my-posts"
        }
        data={[
          { value: "1", label: "Expired posts" },
          {
            value: "0",
            label: "Non-expired posts",
          },
        ]}
        onChange={(e) =>
          setTempSearchObj({
            ...tempSearchObj,
            is_expired: e && e !== "-1" ? e : "",
          })
        }
        value={
          (tempSearchObj.is_expired as string)
            ? (tempSearchObj.is_expired as string)
            : ""
        }
      />
      {/* <EndDateInput
          label="End date"
          display={opportunityType !== "festivals"}
          value={
            searchObj.end_date
              ? new Date(searchObj.end_date as number)
              : undefined
          }
          onChange={(e) =>
            setTempSearchObj({
              ...tempSearchObj,
              end_date: e ? e.valueOf() : 0,
            })
          }
        /> */}
      <StartEndDatePicker
        label="Date Range"
        display={opportunityType === "festivals"}
        value={dateRange}
        onChange={(e) => {
          setDateRange(e);
        }}
      />
      <SubmitButtonContainer justify="center" gap="sm">
        <Button
          onClick={() => {
            let tempFormattedSearchObj = tempSearchObj;
            delete tempFormattedSearchObj.salary;

            for (const key in tempFormattedSearchObj) {
              if (key === "end_date") {
                tempFormattedSearchObj = {
                  ...tempFormattedSearchObj,
                  [key]: 0,
                };
              } else {
                tempFormattedSearchObj = {
                  ...tempFormattedSearchObj,
                  [key]: "",
                };
              }
            }

            setTempSearchObj(tempFormattedSearchObj);
            setCity("");
            setState("");
            setDateRange([null, null]);
          }}
        >
          Clear
        </Button>
        <Button
          onClick={() => {
            let tempFormattedSearchObj = tempSearchObj;
            console.log("you clicked me");
            console.log(
              "temp before: ",
              tempFormattedSearchObj,
              !!tempFormattedSearchObj.keyword
            );
            for (const key in tempFormattedSearchObj) {
              if (
                !tempFormattedSearchObj[
                  key as keyof typeof tempFormattedSearchObj
                ]
              ) {
                delete tempFormattedSearchObj[
                  key as keyof typeof tempFormattedSearchObj
                ];
              }
            }

            if (city && state) {
              tempFormattedSearchObj.city = city;
              tempFormattedSearchObj.state = state;
            } else {
              delete tempFormattedSearchObj.city;
              delete tempFormattedSearchObj.state;
            }

            if (dateRange && dateRange[0] && dateRange[1]) {
              tempFormattedSearchObj.start_date = dateRange[0].valueOf();
              tempFormattedSearchObj.end_date = dateRange[1].valueOf();
            } else {
              delete tempFormattedSearchObj.start_date;
              delete tempFormattedSearchObj.end_date;
            }
            setSearchObj(tempFormattedSearchObj);
          }}
        >
          Search
        </Button>
      </SubmitButtonContainer>
    </Container>
  );
}
