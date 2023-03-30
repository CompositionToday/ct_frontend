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
    is_winner: searchObj.is_winner ? searchObj.is_winner : "",
    type: searchObj.type ? searchObj.type : "",
    is_expired: searchObj.is_expired ? searchObj.is_expired : "",
    job_type: searchObj.job_type ? searchObj.job_type : "",
    sort: searchObj.sort ? searchObj.sort : 0,
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
        searchable
        data={[
          { value: "Flute", label: "Flute", group: "Woodwind" },
          { value: "Folk Flute", label: "Folk Flute", group: "Woodwind" },
          { value: "Oboe", label: "Oboe", group: "Woodwind" },
          { value: "Clarinet", label: "Clarinet", group: "Woodwind" },
          { value: "Bassoon", label: "Bassoon", group: "Woodwind" },
          { value: "Saxophone", label: "Saxophone", group: "Woodwind" },
          { value: "Recorder", label: "Recorder", group: "Woodwind" },
          { value: "General Brass", label: "General Brass", group: "Brass" },
          { value: "French Horn", label: "French Horn", group: "Brass" },
          { value: "Trumpet", label: "Trumpet", group: "Brass" },
          { value: "Trombone", label: "Trombone", group: "Brass" },
          { value: "Tuba", label: "Tuba", group: "Brass" },
          { value: "Euphonium", label: "Euphonium", group: "Brass" },
          { value: "Violin", label: "Violin", group: "Strings" },
          { value: "Folk Fiddle", label: "Folk Fiddle", group: "Strings" },
          { value: "Viola", label: "Viola", group: "Strings" },
          { value: "Cello", label: "Cello", group: "Strings" },
          { value: "Double Bass", label: "Double Bass", group: "Strings" },
          { value: "Harp", label: "Harp", group: "Strings" },
          { value: "Guitar", label: "Guitar", group: "Strings" },
          { value: "Early Guitar", label: "Early Guitar", group: "Strings" },
          { value: "Lute", label: "Lute", group: "Strings" },
          { value: "Theorbo", label: "Theorbo", group: "Strings" },
          { value: "Piano", label: "Piano", group: "Keyboard" },
          {
            value: "Piano Accompaniment",
            label: "Piano Accompaniment",
            group: "Keyboard",
          },
          { value: "Organ", label: "Organ", group: "Keyboard" },
          { value: "Harpsichord", label: "Harpsichord", group: "Keyboard" },
          { value: "Accordian", label: "Accordian", group: "Keyboard" },
          { value: "Percussion", label: "Percussion", group: "Percussion" },
          { value: "Voice", label: "Voice", group: "Voice" },
          {
            value: "All Chamber",
            label: "All Chamber",
            group: "Chamber Music",
          },
          {
            value: "Strings Chamber",
            label: "Strings Chamber",
            group: "Chamber Music",
          },
          {
            value: "Woodwind Chamber",
            label: "Woodwind Chamber",
            group: "Chamber Music",
          },
          {
            value: "Brass Chamber",
            label: "Brass Chamber",
            group: "Chamber Music",
          },
          {
            value: "Mixed Chamber Ensemble",
            label: "Mixed Chamber Ensemble",
            group: "Chamber Music",
          },
          {
            value: "Vocal Ensemble",
            label: "Vocal Ensemble",
            group: "Chamber Music",
          },
          {
            value: "Piano Duo",
            label: "Piano Duo",
            group: "Chamber Music",
          },
          { value: "Conductor", label: "Conductor", group: "Music Direction" },
          {
            value: "Repetiteur",
            label: "Repetiteur",
            group: "Music Direction",
          },
          { value: "Composer", label: "Composer", group: "Composition" },
          { value: "Arranger", label: "Arranger", group: "Composition" },
        ]}
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
        label="Winner"
        placeholder={`Select`}
        allowDeselect
        clearable
        display={opportunityType === "competitions"}
        data={[
          { value: "1", label: "Winners Only" },
          {
            value: "0",
            label: "No Winners",
          },
        ]}
        onChange={(e) =>
          setTempSearchObj({
            ...tempSearchObj,
            is_winner: e && e !== "-1" ? e : "",
          })
        }
        value={
          (tempSearchObj.is_winner as string)
            ? (tempSearchObj.is_winner as string)
            : ""
        }
      />
      <DropdownCategory
        label="Sort by"
        placeholder={`Select`}
        allowDeselect
        clearable
        display={
          opportunityType === "competitions" ||
          opportunityType === "festivals" ||
          opportunityType === "concerts"
        }
        data={[
          { value: "1", label: "End Date" },
          {
            value: "0",
            label: "Date Posted",
          },
        ]}
        onChange={(e) =>
          setTempSearchObj({
            ...tempSearchObj,
            sort: e && e !== "-1" ? e : "",
          })
        }
        value={
          (tempSearchObj.sort as string) ? (tempSearchObj.sort as string) : ""
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
        display={opportunityType === "admin/recent-posts"}
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
        label={
          opportunityType === "my-posts"
            ? "Posts Deleted By Admin"
            : "Deleted Status"
        }
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
      {/* <StartEndDatePicker
        label="Date Range"
        display={opportunityType === "festivals"}
        value={dateRange}
        onChange={(e) => {
          setDateRange(e);
        }}
      /> */}
      <SubmitButtonContainer justify="center" gap="sm">
        <Button
          color="red"
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

            setTempSearchObj(temp);
            setCity("");
            setState("");
            setDateRange([null, null]);
          }}
        >
          Clear Filters
        </Button>
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
            setSearchObj(temp);
          }}
        >
          Apply Filters
        </Button>
      </SubmitButtonContainer>
    </Container>
  );
}
