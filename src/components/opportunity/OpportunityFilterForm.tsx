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
    salary: searchObj.salary ? searchObj.salary : 0,
    competition_category: searchObj.competition_category
      ? searchObj.competition_category
      : "",
    end_date: searchObj.end_date ? searchObj.end_date : 0,
    job_category: searchObj.job_category ? searchObj.job_category : "",
  });
  const opportunityType = useLocation().pathname.slice(1);

  useEffect(() => {
    console.log("user effect is triggered: ", searchObj);
    console.log(searchObj);
  }, [searchObj]);

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
          value={tempSearchObj.competition_category}
        />
        <DropdownCategory
          label="Job Type"
          placeholder={`Select job type`}
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
          value={tempSearchObj.job_category}
        />
        <Location
          city={city}
          setCity={setCity}
          state={state}
          setState={setState}
          withAsterisk={false}
        />
        <SalaryInput
          defaultValue={0}
          label="Salary"
          display={opportunityType === "jobs"}
          value={tempSearchObj.salary}
          onChange={(e) =>
            setTempSearchObj({
              ...tempSearchObj,
              salary: e && typeof e === "number" ? e : 0,
            })
          }
        />
        <EndDateInput
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
        />
        <StartEndDatePicker
          label="Date Range"
          display={opportunityType === "festivals"}
          value={dateRange}
          onChange={(e) => {
            setDateRange(e);
          }}
        />
        <SubmitButtonContainer justify="center">
          <Button
            onClick={() => {
              let temp = tempSearchObj;
              console.log("you clicked me");
              console.log("temp before: ", temp);
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

              temp.is_deleted = searchObj.is_deleted;
              temp.is_flagged = searchObj.is_flagged;
              console.log("temp after: ", temp);
              setSearchObj(temp);
            }}
          >
            Search
          </Button>
        </SubmitButtonContainer>
      </OpportunityFilterFormContentContainer>
    </Paper>
  );
}
