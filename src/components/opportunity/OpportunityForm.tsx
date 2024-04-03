import {
  TextInputFullWidth,
  OpportunityFormContainer,
  OpportunityFormContentContainer,
  MultipleInputRow,
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
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {Paper, Button, createStyles, Checkbox, Group} from "@mantine/core";
import { DateRangePickerValue, TimeInput } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { start } from "repl";

interface OpportunityFormProp {
  edit: boolean;
  opportunityType: string;
  opportunity?: OpportunityItem;
  displayWinnerInput?: boolean;
  handleSubmission: (opportunity: OpportunityItem) => void;
}

const useStyles = createStyles((theme) => ({
  noShadow: {
    boxShadow: "none",
  },

  shadow: {
    boxShadow:
      "0 1px 3px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 10px 15px -5px, rgb(0 0 0 / 4%) 0px 7px 7px -5px;",
  },
}));

export function OpportunityForm({
  edit,
  opportunityType,
  opportunity,
  handleSubmission,
  displayWinnerInput = false,
}: OpportunityFormProp) {
  const [city, setCity] = useState(opportunity?.city ? opportunity.city : "");
  const [state, setState] = useState(
    opportunity?.state ? opportunity.state : ""
  );
  const [genre, setGenre] = useState(
    opportunity?.genre ? opportunity.genre : ""
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
  const [displayLocationInput, setDisplayLocationInput] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [userUID, setUserUID] = useState("");
  const [isFee, setIsFee] = useState(opportunity?.fee === 0);
  const medianScreen = useMediaQuery("(max-width: 992px)");
  const { classes } = useStyles();

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
      genre: opportunity?.genre || "",
      awards: opportunity?.awards || "",
      end_date: opportunity?.end_date ? new Date(opportunity?.end_date) : null,
      salary: +(opportunity?.salary as number) || "",
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
      fee: +(opportunity?.fee as number) ? +(opportunity?.fee as number) : "",
      deadline: opportunity?.deadline ? new Date(opportunity?.deadline) : null,
    },
    validate: {
      title: (value) =>
        value.trim()
          ? value.trim().length <= 100
            ? null
            : "Please shorten the title"
          : "Please give a title",
      organization: (value) =>
        value.trim() ||
        opportunityType === "festivals" ||
        opportunityType === "concerts" ||
        opportunityType === "compositions"
          ? value.trim().length <= 100
            ? null
            : "Please shorten the organization"
          : "Please give an organization name",
      link: (value) =>
        value.trim() && validateUrl(value.trim())
          ? value.trim().length <= 250
            ? null
            : "Please shorten the link"
          : "Please give a valid URL link",
      description: (value) =>
        value.trim()
          ? value.trim().length
            ? null
            : "Please shorten the description"
          : "Please give a description",
      end_date: (value: Date | string) => {
        if (opportunityType === "compositions") {
        } else if (opportunityType !== "festivals") {
          if (value && (value.valueOf() as number) < getCurrentDate()) {
            return "Please choose today's or a future date";
          } else if (!value) {
            if (opportunityType !== "jobs" && opportunityType !== "festivals") {
              return opportunityType !== "concerts"
                ? "Please give an application deadline"
                : "Please give a date";
            }
          }
        }

        return null;
      },
      // (value && value.valueOf >= getCurrentDate.valueOf()) ||
      // opportunityType === "jobs"
      //   ? null
      //   : "Please give an end date",
      job_category: (value) =>
        value.trim() || opportunityType !== "jobs"
          ? null
          : "Please give the category of job",
      competition_category: (value) =>
        value.trim() || opportunityType !== "competitions"
          ? null
          : "Please give the category",
      winner: (value) =>
        value.trim().length <= 100 ? null : "Please shorten the winner",
      address: (value) =>
        // value.trim() ||
        // (opportunityType !== "concerts" &&
        //   opportunityType !== "festivals" &&
        //   (city !== "Remote" || state !== "Remote"))
        //   ? value.trim().length <= 150
        //     ? null
        //     : "Please shorten the address"
        //   : "Please give an address",'address'
        {
          if (
            city === "Remote" ||
            state === "Remote" ||
            value.trim() ||
            (opportunityType !== "concerts" && opportunityType !== "festivals")
          ) {
            if (value.trim().length <= 150) {
              return null;
            } else {
              return "Please shorten the address";
            }
          } else {
            return "Please give an address";
          }
        },
      // start_date: (value: Date | string | DateRangePickerValue) =>
      //   value ? null : "Please give a start date",
      fee: (value: string | number) =>
        value ||
        isFee ||
        (opportunityType !== "competitions" && opportunityType !== "festivals")
          ? null
          : "Please give a fee amount",
      deadline: (value: Date | string) => {
        if (value && (value.valueOf() as number) < getCurrentDate()) {
          return "Please choose today's or a future date";
        } else if (!value) {
          if (opportunityType === "festivals") {
            return "Please give an submission date";
          }
        }

        return null;
      },
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
  const competitionOpportunityKey = ["winner", "competition_category", "fee"];
  const concertOpportunityKey = ["address", "start_time"];
  const festivalOpportunityKey = ["start_date", "address", "fee", "deadline"];
  const compositionsOpportunityKey = ["genre", "awards"];

  // FIXME: When creating the request object, need to make sure that we use keyword
  // instead of explicitly using title and organization
  const handleFormSubmission = (values: OpportunityItem) => {
    // console.log("these are the values: ", values);
    if (
      opportunityType === "festivals" &&
      (!dateRange || !dateRange[0] || !dateRange[1])
    ) {
      // console.log(
      //   "There is no date range given for a festival, returning out of function"
      // );
      return;
    } else if (
      opportunityType === "festivals" &&
      ((dateRange[0] && dateRange[0].valueOf() < getCurrentDate()) ||
        (dateRange[1] && dateRange[1].valueOf() < getCurrentDate()))
    ) {
      // console.log("One of the date in the date range is in the past");
      return;
    }

    if (opportunityType === "concerts" && !startTime) {
      // console.log("There is no start time given, returning out of function");
      return;
    }

    if (
      (opportunityType === "concerts" || opportunityType === "festivals") &&
      (!city || !state)
    ) {
      // console.log(
      //   "there is no location that was selected, now returning out of function"
      // );
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
    } else if (opportunityType === "compositions") {
      opportunityKeys = essentialOpportunityKey.concat(
        compositionsOpportunityKey
      );
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
      req.deadline = getCurrentDate(
        values.deadline instanceof Date ? values.deadline?.valueOf() : undefined
      );
    } else if (opportunityType === "jobs" && !req.end_date) {
      const getSixMonthFromToday = () => {
        let tempDate: number | Date = getCurrentDate();
        tempDate = new Date(tempDate);
        tempDate.setMonth(tempDate.getMonth() + 6);
        return tempDate.valueOf();
      };
      req.end_date = getSixMonthFromToday();
      // console.log(
      //   "getting 6 month from today",
      //   req.end_date,
      //   new Date(req.end_date)
      // );
    } else {
      req.end_date = getCurrentDate(
        values.end_date instanceof Date ? values.end_date?.valueOf() : undefined
      );
      req.end_date = new Date(req.end_date).setHours(23, 59, 59);
    }

    if (opportunityType === "concerts") {
      const hours = startTime ? startTime?.getHours() : 23;
      const mins = startTime ? startTime?.getMinutes() : 59;

      const endDate = new Date(req.end_date);
      // console.log("startTime", startTime, "hours", hours, "mins", mins);

      req.end_date = endDate.setHours(hours, mins, 59);

      req.start_time = startTime?.valueOf();
    }

    req.city = city;
    req.state = state;
    req.UID = userUID;

    req.date_posted = getCurrentDate();
    // console.log("fee type:", req.fee, typeof req.fee, req);
    // console.log("test");
    handleSubmission(req);
  };

  const dateRangeErrorFunction = () => {
    if (displayDateRangeError) {
      if (!dateRange || !dateRange[0] || !dateRange[1]) {
        return "Please give a date range";
      } else if (
        dateRange[0].valueOf() < getCurrentDate() ||
        dateRange[1].valueOf() < getCurrentDate()
      ) {
        return "Please make sure that the dates given set to today and/or in the future";
      }
    }
    return false;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUID(user.uid);
      }
    });

    // console.log("Here is the opportunity passed into the form: ", opportunity);
    let sal = opportunity?.salary as number;
    // console.log(+sal);
    // console.log(sal);
  }, []);

  useEffect(() => {
    // console.log(opportunityType);

    if (
      opportunityType === "competitions" ||
      opportunityType === "compositions"
    ) {
      setCity("Remote");
      setState("Remote");
    } else if (pageLoaded) {
      setCity("");
      setState("");
    }

    setPageLoaded(true);
    setDisplayLocationInput(
      opportunityType !== "competitions" && opportunityType !== "compositions"
    );
    setDisplayLocationError(false);
  }, [opportunityType]);

  useEffect(() => {
    if (city === "Remote" || state === "Remote") {
      form.setFieldValue("address", "");
    }
  }, [city, state]);

  const smallerScreen = useMediaQuery("(max-width: 992px)");

  return (
    <OpportunityFormContainer>
      <Paper
        shadow="sm"
        withBorder={!edit}
        className={edit ? classes.noShadow : classes.shadow}
        radius="lg"
        sx={{ padding: smallerScreen ? "20px" : "20px 40px" }}
      >
        <OpportunityFormContentContainer>
          <form
            onSubmit={form.onSubmit((values) => handleFormSubmission(values))}
          >
            <MultipleInputRow
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
                label={opportunityType === 'blog' ? "Author" : "Organization"}
                placeholder="Organization"
                display={opportunityType !== 'blog' && opportunityType !== "compositions"}
                withAsterisk={
                  opportunityType !== "festivals" &&
                  opportunityType !== "concerts"
                }
                {...form.getInputProps("organization")}
              />
            </MultipleInputRow>
            <MultipleInputRow
              justify="space-around"
              gap="md"
              direction={medianScreen ? "column" : "row"}
              display={opportunityType === "jobs"}
            >
              <DropdownCategory
                label="Job type"
                allowDeselect
                clearable
                placeholder={`Select job type`}
                display={opportunityType === "jobs"}
                data={[
                  "Full-time",
                  "Part-time",
                  "Contractor and Temp work",
                  "Volunteer",
                  "Internship",
                ]}
                {...form.getInputProps("job_type")}
              />
              <DropdownCategory
                label="Job Category"
                placeholder={`Select job category`}
                withAsterisk
                allowDeselect
                clearable
                display={opportunityType === "jobs"}
                data={[
                  { value: "Faculty", label: "Faculty" },
                  {
                    value: "Pre-K Instruction",
                    label: "Pre-K Instruction",
                    group: "Instruction",
                  },
                  {
                    value: "Elementary Instruction",
                    label: "Elementary Instruction",
                    group: "Instruction",
                  },
                  {
                    value: "Junior High Instruction",
                    label: "Junior High Instruction",
                    group: "Instruction",
                  },
                  {
                    value: "High School Instruction",
                    label: "High School Instruction",
                    group: "Instruction",
                  },
                  {
                    value: "Post-Secondary Instruction",
                    label: "Post-Secondary Instruction",
                    group: "Instruction",
                  },
                  {
                    value: "Other Instruction",
                    label: "Other Instruction",
                    group: "Instruction",
                  },
                  { value: "Publishing", label: "Publishing" },
                  { value: "Performance", label: "Performance" },
                  { value: "Composing", label: "Composing" },
                  { value: "Other", label: "Other" },
                ]}
                // data={[
                //   "Faculty",
                //   "Instruction",
                //   "Publishing",
                //   "Performance",
                //   "Composing",
                //   "Other",
                // ]}
                {...form.getInputProps("job_category")}
              />
              <SalaryInput
                label="Salary"
                placeholder="Enter an amount"
                display={opportunityType === "jobs"}
                min={0}
                icon={<p style={{ color: "black" }}>$</p>}
                parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value ? value : ""))
                    ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : ""
                }
                {...form.getInputProps("salary")}
              />
            </MultipleInputRow>
            <SalaryInput
              label="Fee"
              precision={2}
              placeholder="Enter a fee amount"
              withAsterisk
              display={
                opportunityType === "competitions" ||
                opportunityType === "festivals"
              }
              min={0}
              disabled={isFee}
              icon={<p style={{ color: "black" }}>$</p>}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value ? value : ""))
                  ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""
              }
              {...form.getInputProps("fee")}
            />
            <Checkbox
              checked={isFee}
              onChange={(e) => {
                setIsFee(e.currentTarget.checked);
                form.setFieldValue("fee", 0);
              }}
              label="No Fee"
              sx={{
                marginTop: "10px",
                display:
                  opportunityType === "competitions" ||
                  opportunityType === "festivals"
                    ? "auto"
                    : "none",
              }}
            />
            <TextInputFullWidth
              label="Address"
              placeholder="Address"
              display={
                (opportunityType === "concerts" ||
                  opportunityType === "festivals") &&
                (city !== "Remote" || state != "Remote")
              }
              withAsterisk
              {...form.getInputProps("address")}
            />
            <Location
              city={city}
              setCity={setCity}
              state={state}
              setState={setState}
              displayError={displayLocationError}
              setDisplayError={setDisplayLocationError}
              withAsterisk={
                opportunityType === "festivals" ||
                opportunityType === "concerts"
              }
              display={displayLocationInput && opportunityType != 'blog'}
            />
            <StartTimeInput
              label="Start Time"
              format="12"
              withAsterisk
              clearable
              display={opportunityType === "concerts"}
              onChange={(e) => {
                // console.log("timeinput: ", e);
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
            <DropdownCategory
              label="Category"
              placeholder={`Select competition category`}
              withAsterisk
              display={opportunityType === "competitions"}
              searchable
              data={[
                {
                  value: "Multiple Categories",
                  label: "Multiple Categories",
                },
                {
                  value: "All Woodwind",
                  label: "All Woodwind",
                  group: "Woodwind",
                },
                { value: "Flute", label: "Flute", group: "Woodwind" },
                { value: "Folk Flute", label: "Folk Flute", group: "Woodwind" },
                { value: "Oboe", label: "Oboe", group: "Woodwind" },
                { value: "Clarinet", label: "Clarinet", group: "Woodwind" },
                { value: "Bassoon", label: "Bassoon", group: "Woodwind" },
                { value: "Saxophone", label: "Saxophone", group: "Woodwind" },
                { value: "Recorder", label: "Recorder", group: "Woodwind" },
                {
                  value: "Other Woodwind",
                  label: "Other Woodwind",
                  group: "Woodwind",
                },

                { value: "All Brass", label: "All Brass", group: "Brass" },
                { value: "French Horn", label: "French Horn", group: "Brass" },
                { value: "Trumpet", label: "Trumpet", group: "Brass" },
                { value: "Trombone", label: "Trombone", group: "Brass" },
                { value: "Tuba", label: "Tuba", group: "Brass" },
                { value: "Euphonium", label: "Euphonium", group: "Brass" },
                { value: "Other Brass", label: "Other Brass", group: "Brass" },

                {
                  value: "All Strings",
                  label: "All Strings",
                  group: "Strings",
                },
                { value: "Violin", label: "Violin", group: "Strings" },
                {
                  value: "Folk Fiddle",
                  label: "Folk Fiddle",
                  group: "Strings",
                },
                { value: "Viola", label: "Viola", group: "Strings" },
                { value: "Cello", label: "Cello", group: "Strings" },
                {
                  value: "Double Bass",
                  label: "Double Bass",
                  group: "Strings",
                },
                { value: "Harp", label: "Harp", group: "Strings" },
                { value: "Guitar", label: "Guitar", group: "Strings" },
                {
                  value: "Early Guitar",
                  label: "Early Guitar",
                  group: "Strings",
                },
                { value: "Lute", label: "Lute", group: "Strings" },
                { value: "Theorbo", label: "Theorbo", group: "Strings" },
                {
                  value: "Other Strings",
                  label: "Other Strings",
                  group: "Strings",
                },

                {
                  value: "All Keyboard",
                  label: "All Keyboard",
                  group: "Keyboard",
                },
                { value: "Piano", label: "Piano", group: "Keyboard" },
                {
                  value: "Piano Accompaniment",
                  label: "Piano Accompaniment",
                  group: "Keyboard",
                },
                { value: "Organ", label: "Organ", group: "Keyboard" },
                {
                  value: "Harpsichord",
                  label: "Harpsichord",
                  group: "Keyboard",
                },
                { value: "Accordian", label: "Accordian", group: "Keyboard" },
                {
                  value: "Other Keyboard",
                  label: "Other Keyboard",
                  group: "Keyboard",
                },

                {
                  value: "Percussion",
                  label: "Percussion",
                  group: "Percussion",
                },
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
                {
                  value: "Other Chamber",
                  label: "Other Chamber",
                  group: "Chamber Music",
                },

                {
                  value: "Conductor",
                  label: "Conductor",
                  group: "Music Direction",
                },
                {
                  value: "Repetiteur",
                  label: "Repetiteur",
                  group: "Music Direction",
                },
                { value: "Composer", label: "Composer", group: "Composition" },
                { value: "Arranger", label: "Arranger", group: "Composition" },
              ]}
              {...form.getInputProps("competition_category")}
            />
            <DropdownCategory
              label="Genre"
              placeholder={`Select genre`}
              withAsterisk
              display={opportunityType === "compositions" ||
                        opportunityType === "festivals" ||
                        opportunityType === "concerts"}
              searchable
              data={[
                { value: "Alternative", label: "Alternative" },
                { value: "Ballads/Romantic", label: "Ballads/Romantic" },
                { value: "Blues", label: "Blues" },
                { value: "Children's Music", label: "Children's Music" },
                { value: "Classical", label: "Classical" },
                { value: "Country", label: "Country" },
                { value: "Electronic", label: "Electronic" },
                { value: "Folk", label: "Folk" },
                { value: "Hip-Hop", label: "Hip-Hop" },
                { value: "Holiday", label: "Holiday" },
                { value: "Jazz", label: "Jazz" },
                { value: "Latin", label: "Latin" },
                { value: "Medieval/Renaissance", label: "Medieval/Renaissance" },
                { value: "Metal", label: "Metal" },
                { value: "New Age", label: "New Age" },
                { value: "Pop", label: "Pop" },
                { value: "R&B", label: "R&B" },
                { value: "Rap", label: "Rap" },
                { value: "Reggae", label: "Reggae" },
                { value: "Religious", label: "Religious" },
                { value: "Rock", label: "Rock" },
                { value: "World", label: "World" },
                { value: "Other", label: "Other" },
              ]}
              {...form.getInputProps("genre")}
            />
            <EndDateInput
              placeholder="Submission Deadline"
              label="Submission Deadline"
              display={opportunityType === "festivals"}
              withAsterisk={opportunityType === "festivals"}
              {...form.getInputProps("deadline")}
            />
            <EndDateInput
              placeholder={
                opportunityType !== "concerts" ? "Application Deadline" : "Date"
              }
              label={
                opportunityType !== "concerts" ? "Application Deadline" : "Date"
              }
              display={
                opportunityType !== "festivals" &&
                opportunityType !== "compositions" &&
                opportunityType !== "blog"
              }
              withAsterisk={opportunityType !== "jobs"}
              {...form.getInputProps("end_date")}
            />
            <StartEndDatePicker
              placeholder="Choose start and end date"
              label="Date Range"
              display={opportunityType === "festivals"}
              withAsterisk
              value={dateRange}
              onChange={(e) => {
                // console.log(e);
                setDateRange(e);
                setDisplayDateRangeError(false);
              }}
              error={dateRangeErrorFunction()}
              // error="this is a test"
              // {...form.getInputProps("dateRange")}
            />
            <TextInputFullWidth
              label="Link"
              placeholder="Link"
              display={opportunityType!=='blog'}
              withAsterisk
              {...form.getInputProps("link")}
            />
            <TextInputFullWidth
              label="Awards (if any)"
              placeholder="Awards"
              display
              {...form.getInputProps("awards")}
            />
            <DescriptionInput
              label="Description"
              placeholder="Description"
              autosize
              withAsterisk
              minRows={5}
              {...form.getInputProps("description")}
            />
            <TextInputFullWidth
              label="Winner"
              placeholder="Give the name of the winner if applicable"
              description="Leave the field empty if you want to delete the winner's name"
              display={displayWinnerInput && opportunityType === "competitions"}
              {...form.getInputProps("winner")}
            />
            <SubmitButtonContainer
              justify="center"
              sx={{ marginBottom: "20px" }}
            >
              <Button
                type="submit"
                onClick={() => {
                  if (
                    opportunityType === "concerts" ||
                    opportunityType === "festivals"
                  ) {
                    setDisplayLocationError(true);
                  }
                  if (opportunityType !== "compositions") {
                    setDisplayDateRangeError(true);
                    setDisplayStartTimeError(true);
                  }
                  // console.log(
                  //   "Is the org valid: " + form.isValid("organization")
                  // );
                  // console.log(
                  //   "Is the end date valid: " + form.isValid("end_date")
                  // );
                  // console.log("Is the salary valid: " + form.isValid("salary"));
                  // console.log(
                  //   "Is the job cat valid: " + form.isValid("job_category")
                  // );
                  // console.log(
                  //   "Is the job type valid: " + form.isValid("job_type")
                  // );
                  // //console.log(form.isValid("job_type"));
                  // console.log(
                  //   "Is the comp cat valid: " +
                  //     form.isValid("competition_category")
                  // );
                  // console.log(
                  //   "Is the address valid: " + form.isValid("address")
                  // );
                  // console.log("Is the fee valid: " + form.isValid("fee"));
                  // console.log("Is the form valid: " + form.isValid());
                  // console.log("Is the title valid: " + form.isValid("title"));
                  // if (opportunityType === "compositions")
                  //   console.log("Is the genre valid: " + form.isValid("genre"));
                  // console.log("Is the link valid: " + form.isValid("link"));
                  // console.log(
                  //   "Is the desc valid: " + form.isValid("description")
                  // );
                  // console.log(form.errors);

                  // if (opportunityType !== "compositions")
                  //   console.log(displayLocationError);
                  // console.log(displayDateRangeError);
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
