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
  StartTimeInput,
} from "./OpportunityFormHelper";
import { OpportunityItem } from "./OpportunityHelper";
import { Location } from "../filter/Location";
import { auth } from "../../Firebase";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Paper, NumberInput, Button, Select, filterProps } from "@mantine/core";
import { DateRangePickerValue, TimeInput } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { start } from "repl";

interface OpportunityFormProp {
  opportunityType: string;
  opportunity?: OpportunityItem;
  displayWinnerInput?: boolean;
  handleSubmission: (opportunity: OpportunityItem) => void;
}

export function OpportunityForm({
  opportunityType,
  opportunity,
  handleSubmission,
  displayWinnerInput = false,
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
  const [startTime, setStartTime] = useState<Date | null>(
    opportunity?.start_time ? new Date(opportunity?.start_time) : null
  );
  const [displayLocationError, setDisplayLocationError] = useState(false);
  const [displayDateRangeError, setDisplayDateRangeError] = useState(false);
  const [displayStartTimeError, setDisplayStartTimeError] = useState(false);
  const [userUID, setUserUID] = useState("");
  const medianScreen = useMediaQuery("(max-width: 992px)");

  const getCurrentDate = (time = new Date().valueOf()) => {
    let tempDate: Date;

    tempDate = new Date(time);

    let day = tempDate.getDate();
    let month = tempDate.getMonth();
    let year = tempDate.getFullYear();
    let currentDate = new Date(year, month, day, 0, 0, 0, 0);

    return currentDate.valueOf();
  };

  function validateUrl(value: string) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      value
    );
  }

  const form = useForm({
    initialValues: {
      title: opportunity?.title || "",
      link: opportunity?.link || "",
      organization: opportunity?.organization || "",
      description: opportunity?.description || "",
      date_posted: opportunity?.date_posted
        ? new Date(opportunity?.date_posted)
        : new Date(getCurrentDate()),
      city: city,
      state: state,
      end_date: opportunity?.end_date
        ? new Date(opportunity?.end_date)
        : new Date(getCurrentDate()),
      salary: +(opportunity?.salary as number) || 0,
      job_category: opportunity?.job_category || "",
      job_type: opportunity?.job_type || "",
      winner: opportunity?.winner || "",
      competition_category: opportunity?.competition_category || "",
      address: opportunity?.address || "",
      start_date: opportunity?.start_date
        ? new Date(opportunity?.start_date)
        : new Date(getCurrentDate()),
      start_time: opportunity?.start_time
        ? new Date(opportunity?.start_time)
        : null,
      // dateRange:
      //   opportunity?.end_date && opportunity?.start_date
      //     ? [opportunity.start_date, opportunity?.end_date]
      //     : [null, null],
    },
    validate: {
      // UID: (value) => (value ? null : "Need to give a UID"),
      title: (value) => (value.trim() ? null : "Please give a title"),
      organization: (value) =>
        value.trim() ? null : "Please give an organization name",
      link: (value) =>
        value.trim() && validateUrl(value.trim())
          ? null
          : "Please give a valid URL link",
      description: (value) =>
        value.trim() ? null : "Please give a description",
      // date_posted: (value) => (value ? null : "Need to give a date posted"),
      // city: (value) => (value ? null : "Please give a city"),
      // state: (value) => (value ? null : "Please give a state"),
      end_date: (value: Date | string) =>
        value || opportunityType === "festivals"
          ? null
          : "Please give an end date",
      salary: (value: number) =>
        value || opportunityType !== "jobs" ? null : "Please give a salary",
      job_category: (value) =>
        value.trim() || opportunityType !== "jobs"
          ? null
          : "Please give the category of job",
      job_type: (value) =>
        value.trim() || opportunityType !== "jobs"
          ? null
          : "Please give the type of job",
      competition_category: (value) =>
        value.trim() || opportunityType !== "competitions"
          ? null
          : "Please give the category",
      address: (value) =>
        value.trim() ||
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
  const jobOpportunityKey = ["salary", "job_type", "job_category"];
  const competitionOpportunityKey = ["winner", "competition_category"];
  const concertOpportunityKey = ["address", "start_time"];
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

    if (opportunityType === "concerts" && !startTime) {
      console.log("There is no start time given, returning out of function");
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

    let req: OpportunityItem = {};

    for (let key in values) {
      let formattedKey = key as keyof OpportunityItem;
      if (!opportunityKeys.includes(key)) {
        continue;
      } else if (typeof values[formattedKey] === "string") {
        let temp = values[formattedKey] as string;
        temp = temp.trim();
        req = { ...req, [formattedKey]: temp };
      } else {
        req = { ...req, [formattedKey]: values[formattedKey] };
      }
    }

    if (
      opportunityType === "festivals" &&
      dateRange &&
      dateRange[0] &&
      dateRange[1]
    ) {
      req.start_date = getCurrentDate(dateRange[0].valueOf());
      req.end_date = getCurrentDate(dateRange[1].valueOf());
    } else {
      req.end_date = getCurrentDate(
        values.end_date instanceof Date ? values.end_date?.valueOf() : undefined
      );
    }

    if (opportunityType === "concerts") {
      req.start_time = startTime?.valueOf();
    }

    req.city = city;
    req.state = state;
    req.UID = userUID;

    req.date_posted = getCurrentDate();

    console.log(new Date(req.end_date));
    console.log("showing req:");
    console.log(req);

    handleSubmission(req);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUID(user.uid);
      }
    });

    console.log("Here is the opportunity passed into the form: ", opportunity);
    let sal = opportunity?.salary as number;
    console.log(+sal);
    console.log(sal);
  }, []);

  useEffect(() => {
    console.log(opportunityType);
  }, [opportunityType]);

  // useEffect(() => {
  //   console.log(dateRange);
  // }, [dateRange]);

  return (
    <OpportunityFormContainer>
      <Paper shadow="sm" withBorder radius="lg" sx={{ padding: "20px 40px" }}>
        <OpportunityFormContentContainer>
          <form
            onSubmit={form.onSubmit((values) => handleFormSubmission(values))}
          >
            {/* <TextInputFullWidth
              label="Get rid of me since I'm an input for the UID"
              placeholder="Title"
              display
              withAsterisk
              {...form.getInputProps("UID")}
            /> */}
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
                min={0}
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
              <DropdownCategory
                label="Job Category"
                placeholder={`Select job category`}
                withAsterisk
                display={opportunityType === "jobs"}
                data={[
                  "Faculty",
                  "Instruction",
                  "Publishing",
                  "Performance",
                  "Composing",
                  "Other",
                ]}
                {...form.getInputProps("job_category")}
              />
              <DropdownCategory
                label="Job type"
                placeholder={`Select job type`}
                withAsterisk
                display={opportunityType === "jobs"}
                data={["Full-time", "Part-time", "Any"]}
                {...form.getInputProps("job_type")}
              />
            </TwoInputRow>
            <TextInputFullWidth
              label="Winner"
              placeholder="Give the name of the winner if applicable"
              description="Leave the field empty if you want to delete the winner's name"
              display={displayWinnerInput && opportunityType === "competitions"}
              {...form.getInputProps("winner")}
            />
            {/* <TextInputFullWidth
              label="Category"
              placeholder="Category"
              display={opportunityType === "competitions"}
              withAsterisk
              {...form.getInputProps("category")}
            /> */}
            <DropdownCategory
              label="Category"
              placeholder={`Select competitions category`}
              withAsterisk
              display={opportunityType === "competitions"}
              data={["Brass", "Woodwind", "Percussion"]}
              {...form.getInputProps("competition_category")}
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
            <StartTimeInput
              label="Start Time"
              format="12"
              withAsterisk
              clearable
              display={opportunityType === "concerts"}
              onChange={(e) => {
                console.log("timeinput: ", e);
                setStartTime(e);
                setDisplayStartTimeError(false);
              }}
              value={startTime}
              error={
                displayStartTimeError && !startTime
                  ? "Please give a start time"
                  : false
              }
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
            <SubmitButtonContainer
              justify="center"
              sx={{ marginBottom: "20px" }}
            >
              <Button
                type="submit"
                onClick={() => {
                  setDisplayLocationError(true);
                  setDisplayDateRangeError(true);
                  setDisplayStartTimeError(true);
                  console.log(form.isValid());
                  console.log(form.isValid("title"));
                  console.log(form.isValid("organization"));
                  console.log(form.isValid("link"));
                  console.log(form.isValid("description"));
                  console.log(form.isValid("end_date"));
                  console.log(form.isValid("salary"));
                  console.log(form.isValid("job_category"));
                  console.log(form.isValid("job_type"));
                  console.log(form.isValid("job_type"));
                  console.log(form.isValid("competition_category"));
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
