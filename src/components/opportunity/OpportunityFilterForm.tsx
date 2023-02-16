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
    category: searchObj.category ? searchObj.category : "",
    end_date: searchObj.end_date ? searchObj.end_date : 0,
    job_type: searchObj.job_type ? searchObj.job_type : "",
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
        <TextInputFullWidth
          label="Title/Organization"
          placeholder="Title/Organization"
          display
          value={tempSearchObj.keyword}
          onChange={(e) => {
            setTempSearchObj({
              ...tempSearchObj,
              keyword: e.target.value,
            });
            setKeyword(e.target.value);
          }}
        />
        {/* <TextInputFullWidth label="Category" placeholder="Category" display /> */}
        {/* FIXME: Need to make a dropdown for job_type */}
        <DropdownCategory
          label="Competition Category"
          placeholder={`Select competitions category`}
          data={["Brass", "Woodwind", "Percussion"]}
          allowDeselect
          display={opportunityType === "competitions"}
          onChange={(e) =>
            setTempSearchObj({
              ...tempSearchObj,
              category: e ? e : "",
            })
          }
          value={tempSearchObj.category}
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
              job_type: e ? e : "",
            })
          }
          value={tempSearchObj.job_type}
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

              // FIXME: Check if I need this code at all since it might be impossible to change the opportunityType on the opportunity page since only way to change the type is by going to a new page. If we don't need it, still wouldn't hurt to have the extra deletion of keys above since they shouldn't do anything if the keys don't exist
              // const essentialOpportunityKey = [
              //   "UID",
              //   "idposts",
              //   "title",
              //   "link",
              //   "organization",
              //   "description",
              //   "date_posted",
              //   "city",
              //   "state",
              //   "end_date",
              // ];
              // const jobOpportunityKey = ["salary", "job_type"];
              // const competitionOpportunityKey = ["winner", "category"];
              // const concertOpportunityKey = ["address"];
              // const festivalOpportunityKey = ["start_date", "address"];

              // let opportunityKeys: string[] = [...essentialOpportunityKey];
              // if (opportunityType === "jobs") {
              //   opportunityKeys =
              //     essentialOpportunityKey.concat(jobOpportunityKey);
              // } else if (opportunityType === "competitions") {
              //   opportunityKeys = essentialOpportunityKey.concat(
              //     competitionOpportunityKey
              //   );
              // } else if (opportunityType === "concerts") {
              //   opportunityKeys = essentialOpportunityKey.concat(
              //     concertOpportunityKey
              //   );
              // } else if (opportunityType === "festivals") {
              //   opportunityKeys = essentialOpportunityKey.concat(
              //     festivalOpportunityKey
              //   );
              // }

              // for (let key in temp) {
              //   if (!opportunityKeys.includes(key)) {
              //     delete temp[key as keyof typeof temp];
              //   }
              // }

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
