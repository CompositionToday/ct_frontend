import { Location } from "../filter/Location";
import {
  DropdownCategory,
  EndDateInput,
  SalaryInput,
  StartEndDatePicker,
  SubmitButtonContainer,
  TextInputFullWidth,
} from "./OpportunityFormHelper";
import React, { useState, useEffect } from "react";
import { Button, Center, Flex, Paper, Select } from "@mantine/core";
import { OpportunityFilterFormContentContainer } from "./OpportunityFilterFormHelper";
import { FormHeader } from "./CreateOpportunityHelper";
import { useLocation } from "react-router-dom";
import { PaginationSearchObject } from "../pagination/PaginationNavbar";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";

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

  useEffect(() => {
    console.log("temp obj", tempSearchObj.job_type);
  }, [tempSearchObj]);

  return (
    <Paper shadow="sm" withBorder>
      <OpportunityFilterFormContentContainer>
        <FormHeader>Filters</FormHeader>
        <DropdownCategory
          label="Competition Category"
          placeholder={`Select competitions category`}
          data={["Brass", "Woodwind", "Percussion"]}
          allowDeselect
          display={opportunityType === "competitions"}
          onChange={(e) =>
            setTempSearchObj({
              ...tempSearchObj,
              competition_category: e ? e : "",
            })
          }
          value={
            (tempSearchObj.competition_category as string)
              ? (tempSearchObj.competition_category as string)
              : ""
          }
        />
        <DropdownCategory
          label="Job Category"
          placeholder={`Select job category`}
          allowDeselect
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
          value={
            (tempSearchObj.job_category as string)
              ? (tempSearchObj.job_category as string)
              : ""
          }
        />
        <DropdownCategory
          label="Job Type"
          placeholder={`Select job type`}
          allowDeselect
          display={opportunityType === "jobs"}
          clearable
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
          value={
            (tempSearchObj.job_type as string)
              ? (tempSearchObj.job_type as string)
              : ""
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
          label="Salary"
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
          label="Flagged Post"
          placeholder={`Select if you want to see Flagged post`}
          allowDeselect
          display={
            opportunityType === "admin/recent-posts" ||
            opportunityType === "my-posts"
          }
          data={[
            { value: "-1", label: "No Filter" },
            {
              value: "0",
              label: "Not Flagged Post Only",
            },
            { value: "1", label: "Flagged Post Only" },
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
          label="Deleted Post"
          placeholder={`Select if you want to see Deleted post`}
          allowDeselect
          display={
            opportunityType === "admin/recent-posts" ||
            opportunityType === "my-posts"
          }
          data={[
            { value: "-1", label: "No Filter" },
            {
              value: "0",
              label: "Not Deleted Post Only",
            },
            { value: "1", label: "Deleted Post Only" },
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
          label="Expired Post"
          placeholder={`Select if you want to see Expired post`}
          allowDeselect
          display={
            opportunityType === "admin/recent-posts" ||
            opportunityType === "my-posts"
          }
          data={[
            { value: "-1", label: "No Filter" },
            {
              value: "0",
              label: "Not Expired Post Only",
            },
            { value: "1", label: "Expired Post Only" },
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
        <DropdownCategory
          label="Type of Post"
          placeholder={`Select if you want a specific type of opportunity`}
          allowDeselect
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
              let temp = tempSearchObj;
              console.log("you clicked me");
              console.log("temp before: ", temp, !!temp.keyword);
              for (const key in temp) {
                if (!temp[key as keyof typeof temp]) {
                  delete temp[key as keyof typeof temp];
                }
              }

              if (city && state) {
                temp.city = city;
                temp.state = state;
              } else {
                delete temp.city;
                delete temp.state;
              }

              if (dateRange && dateRange[0] && dateRange[1]) {
                temp.start_date = dateRange[0].valueOf();
                temp.end_date = dateRange[1].valueOf();
              } else {
                delete temp.start_date;
                delete temp.end_date;
              }

              // temp.is_deleted = searchObj.is_deleted;
              // temp.is_flagged = searchObj.is_flagged;
              console.log("temp after: ", temp);
              setSearchObj(temp);
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              let temp = tempSearchObj;
              delete temp.salary;

              for (const key in temp) {
                if (key === "end_date") {
                  temp = { ...temp, [key]: 0 };
                } else {
                  temp = { ...temp, [key]: "" };
                }
              }

              // setSearchObj(temp);
              setTempSearchObj(temp);
              setCity("");
              setState("");
              setDateRange([null, null]);
            }}
          >
            Clear
          </Button>
        </SubmitButtonContainer>
      </OpportunityFilterFormContentContainer>
    </Paper>
  );
}
