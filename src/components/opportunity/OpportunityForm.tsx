import {
  TextInputFullWidth,
  OpportunityFormContainer,
  OpportunityFormContentContainer,
  TwoInputRow,
  DescriptionInput,
  EndDateInput,
  StartEndDatePicker,
  SalaryInput,
  SubmitButtonContainer,
  DropdownCategory,
} from "./OpportunityFormHelper";
import { OpportunityItem } from "./OpportunityHelper";
import { Location } from "../filter/Location";
import React, { useState, useEffect } from "react";
import { Paper, NumberInput, Button, Select } from "@mantine/core";
import { DateRangePickerValue } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";

interface OpportunityFormProp {
  opportunityType: string;
  opportunity?: OpportunityItem;
  handleSubmission: (opportunity: OpportunityItem) => void;
}

interface formValue {
  UID?: string;
  idposts?: string | number;
  keyword?: string;
  title: string;
  link: string;
  organization: string;
  description: string;
  date_posted: Date | number;
  city: string;
  state: string;
  end_date: string | number | Date;
  salary: number | string;
  job_type: any;
  winner: string;
  category: string;
  address: string;
  start_date: string | number | Date;
}

export function OpportunityForm({
  opportunityType,
  opportunity,
  handleSubmission,
}: OpportunityFormProp) {
  const [city, setCity] = useState(opportunity?.city ? opportunity.city : "");
  const [state, setState] = useState(
    opportunity?.state ? opportunity.state : ""
  );
  const [dateRange, setDateRange] = useState<DateRangePickerValue>([
    opportunity && opportunity?.start_date
      ? new Date(opportunity?.start_date)
      : null,
    opportunity && opportunity?.end_date
      ? new Date(opportunity?.end_date)
      : null,
  ]);
  const [displayLocationError, setDisplayLocationError] = useState(false);
  const [displayDateRangeError, setDisplayDateRangeError] = useState(false);
  const medianScreen = useMediaQuery("(max-width: 992px)");
  const form = useForm({
    initialValues: {
      // FIXME: Need to actually put the UID of the logged in user here
      // FIXME: Need to actually put the idposts if there is an edit
      // UID: opportunity?.UID || "",
      // idposts: opportunity?.idposts || -1,
      title: opportunity?.title || "",
      link: opportunity?.link || "",
      organization: opportunity?.organization || "",
      description: opportunity?.description || "",
      date_posted: opportunity?.date_posted
        ? new Date(opportunity?.date_posted)
        : new Date(),
      city: city,
      state: state,
      end_date: opportunity?.end_date
        ? new Date(opportunity?.end_date)
        : new Date(),
      salary: opportunity?.salary || 0,
      job_type: opportunity?.job_type || "",
      winner: opportunity?.winner || "",
      category: opportunity?.category || "",
      address: opportunity?.address || "",
      start_date: opportunity?.start_date
        ? new Date(opportunity?.start_date)
        : new Date(),
      // dateRange:
      //   opportunity?.end_date && opportunity?.start_date
      //     ? [opportunity.start_date, opportunity?.end_date]
      //     : [null, null],
    },
    validate: {
      // UID: (value) => (value ? null : "Need to give a UID"),
      title: (value) => (value ? null : "Please give a title"),
      organization: (value) =>
        value ? null : "Please give an organization name",
      link: (value) => (value ? null : "Please give a link"),
      description: (value) => (value ? null : "Please give a description"),
      // date_posted: (value) => (value ? null : "Need to give a date posted"),
      // city: (value) => (value ? null : "Please give a city"),
      // state: (value) => (value ? null : "Please give a state"),
      end_date: (value: Date | string) =>
        value || opportunityType === "festivals"
          ? null
          : "Please give an end date",
      salary: (value: number) =>
        value || opportunityType !== "jobs" ? null : "Please give a salary",
      job_type: (value) =>
        value || opportunityType !== "jobs"
          ? null
          : "Please give the type of job",
      category: (value) =>
        value || opportunityType !== "competitions"
          ? null
          : "Please give the category",
      address: (value) =>
        value ||
        (opportunityType !== "concerts" && opportunityType !== "festivals")
          ? null
          : "Please give an address",
      // start_date: (value: Date | string | DateRangePickerValue) =>
      //   value ? null : "Please give a start date",
    },
  });
  const essentialOpportunityKey = [
    "UID",
    "idposts",
    "title",
    "link",
    "organization",
    "description",
    "date_posted",
    "city",
    "state",
    "end_date",
  ];
  const jobOpportunityKey = ["salary", "job_type"];
  const competitionOpportunityKey = ["winner", "category"];
  const concertOpportunityKey = ["address"];
  const festivalOpportunityKey = ["start_date", "address"];

  // FIXME: When creating the request object, need to make sure that we use keyword
  // instead of explicitly using title and organization
  const handleFormSubmission = (values: OpportunityItem) => {
    console.log("these are the values: ", values);
    if (
      opportunityType === "festivals" &&
      (!dateRange || !dateRange[0] || !dateRange[1])
    ) {
      console.log(
        "There is no date range given for a festival, returning out of function"
      );
      return;
    }

    if (!city || !state) {
      console.log(
        "there is no location that was selected, now returning out of function"
      );
      return;
    }

    let opportunityKeys: string[] = [...essentialOpportunityKey];
    if (opportunityType === "jobs") {
      opportunityKeys = essentialOpportunityKey.concat(jobOpportunityKey);
    } else if (opportunityType === "competitions") {
      opportunityKeys = essentialOpportunityKey.concat(
        competitionOpportunityKey
      );
    } else if (opportunityType === "concerts") {
      opportunityKeys = essentialOpportunityKey.concat(concertOpportunityKey);
    } else if (opportunityType === "festivals") {
      opportunityKeys = essentialOpportunityKey.concat(festivalOpportunityKey);
    }

    // FIXME: Need to make sure that I actually give the UID of the signed in user
    // FIXME: Need to make sure if I need to give some type of idposts or not
    let req: OpportunityItem = { ...values };
    for (let key in req) {
      if (!opportunityKeys.includes(key)) {
        delete req[key as keyof typeof req];
      }
    }

    if (
      opportunityType === "festivals" &&
      dateRange &&
      dateRange[0] &&
      dateRange[1]
    ) {
      req.start_date = dateRange[0].valueOf();
      req.end_date = dateRange[1].valueOf();
    } else {
      req.end_date = values.end_date.valueOf();
    }

    req.city = city;
    req.state = state;
    req.UID = "12343testyo";

    let tempDate = new Date();
    let day = tempDate.getDate();
    let month = tempDate.getMonth() + 1;
    let year = tempDate.getFullYear();
    req.date_posted = new Date(`${year}-${month}-${day}`).valueOf();

    console.log("showing req:");
    console.log(req);
    handleSubmission(req);
  };

  useEffect(() => {
    console.log(opportunityType);
  }, [opportunityType]);

  // useEffect(() => {
  //   console.log(dateRange);
  // }, [dateRange]);

  return (
    <OpportunityFormContainer>
      <Paper shadow="sm" withBorder>
        <OpportunityFormContentContainer>
          <form
            onSubmit={form.onSubmit((values) => handleFormSubmission(values))}
          >
            <TextInputFullWidth
              label="Get rid of me since I'm an input for the UID"
              placeholder="Title"
              display
              withAsterisk
              {...form.getInputProps("UID")}
            />
            <TwoInputRow
              justify="space-around"
              gap="md"
              display
              direction={medianScreen ? "column" : "row"}
            >
              <TextInputFullWidth
                label="Title"
                placeholder="Title"
                display
                withAsterisk
                {...form.getInputProps("title")}
              />
              <TextInputFullWidth
                label="Organization"
                placeholder="Organization"
                display
                withAsterisk
                {...form.getInputProps("organization")}
              />
            </TwoInputRow>
            <TextInputFullWidth
              label="Link"
              placeholder="Link"
              display
              withAsterisk
              {...form.getInputProps("link")}
            />
            <DescriptionInput
              label="Description"
              placeholder="Description"
              autosize
              withAsterisk
              minRows={5}
              {...form.getInputProps("description")}
            />
            <Location
              city={city}
              setCity={setCity}
              state={state}
              setState={setState}
              displayError={displayLocationError}
              setDisplayError={setDisplayLocationError}
              withAsterisk
            />
            <TwoInputRow
              justify="space-around"
              gap="md"
              direction={medianScreen ? "column" : "row"}
              display={opportunityType === "jobs"}
            >
              <SalaryInput
                label="Salary"
                placeholder="Please give an amount"
                display={opportunityType === "jobs"}
                // value={salary}
                defaultValue={0}
                // onChange={(e) => {
                //   if (e) setSalary(e);
                //   else setSalary(0);
                // }}
                parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value ? value : ""))
                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : "$ "
                }
                withAsterisk
                {...form.getInputProps("salary")}
              />
              <TextInputFullWidth
                label="Job Type"
                placeholder="Job Type"
                display={opportunityType === "jobs"}
                withAsterisk
                {...form.getInputProps("job_type")}
              />
            </TwoInputRow>
            {/* <TextInputFullWidth
              label="Winner"
              placeholder="Give the name of the winner if applicable"
              display={opportunityType === "competitions"}
              {...form.getInputProps("winner")}
            /> */}
            {/* <TextInputFullWidth
              label="Category"
              placeholder="Category"
              display={opportunityType === "competitions"}
              withAsterisk
              {...form.getInputProps("category")}
            /> */}
            <DropdownCategory
              label="Category"
              placeholder={`Select ${opportunityType} category`}
              withAsterisk
              display={opportunityType === "competitions"}
              data={["Brass", "Woodwind", "Percussion"]}
              {...form.getInputProps("category")}
            />
            <TextInputFullWidth
              label="Address"
              placeholder="Address"
              display={
                opportunityType === "concerts" ||
                opportunityType === "festivals"
              }
              withAsterisk
              {...form.getInputProps("address")}
            />
            <EndDateInput
              placeholder="End Date"
              label="End Date"
              display={opportunityType !== "festivals"}
              withAsterisk
              {...form.getInputProps("end_date")}
            />
            <StartEndDatePicker
              placeholder="Choose start and end date"
              label="Date Range"
              display={opportunityType === "festivals"}
              // value={dateRange}
              // onChange={setDateRange}
              withAsterisk
              value={dateRange}
              onChange={(e) => {
                console.log(e);
                setDateRange(e);
                setDisplayDateRangeError(false);
              }}
              error={
                displayDateRangeError &&
                (!dateRange || dateRange[0] === null || dateRange[1] === null)
                  ? "Please give a date range"
                  : false
              }
              // error="this is a test"
              // {...form.getInputProps("dateRange")}
            />
            <SubmitButtonContainer justify="center">
              <Button
                type="submit"
                onClick={() => {
                  setDisplayLocationError(true);
                  setDisplayDateRangeError(true);
                  console.log(form.isValid());
                  console.log(form.isValid("title"));
                  console.log(form.isValid("organization"));
                  console.log(form.isValid("link"));
                  console.log(form.isValid("description"));
                  console.log(form.isValid("end_date"));
                  console.log(form.isValid("salary"));
                  console.log(form.isValid("job_type"));
                  console.log(form.isValid("category"));
                  console.log(form.isValid("address"));
                  console.log(displayLocationError);
                  console.log(displayDateRangeError);
                }}
              >
                Submit
              </Button>
            </SubmitButtonContainer>
          </form>
        </OpportunityFormContentContainer>
      </Paper>
    </OpportunityFormContainer>
  );
}
