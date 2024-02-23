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
import { Paper, Button, createStyles, Checkbox } from "@mantine/core";
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

export function BlogOpportunityForm({
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
  // const [dateRange, setDateRange] = useState<DateRangePickerValue>([
  //   opportunity && opportunity?.start_date
  //     ? new Date(opportunity?.start_date)
  //     : null,
  //   opportunity && opportunity?.end_date
  //     ? new Date(opportunity?.end_date)
  //     : null,
  // ]);
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
      description: opportunity?.description || "",
      date_posted: opportunity?.date_posted
        ? new Date(opportunity?.date_posted)
        : new Date(getCurrentDate()),
    },
    validate: {
      title: (value) =>
        value.trim()
          ? value.trim().length <= 100
            ? null
            : "Please shorten the title"
          : "Please give a title",
      description: (value) =>
        value.trim()
          ? value.trim().length
            ? null
            : "Please shorten the description"
          : "Please give a description",
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

  // FIXME: When creating the request object, need to make sure that we use keyword
  // instead of explicitly using title and organization
  const handleFormSubmission = (values: OpportunityItem) => {
    console.log("these are the values: ", values);
    // if (
    //   opportunityType === "festivals" &&
    //   (!dateRange || !dateRange[0] || !dateRange[1])
    // ) {
    //   console.log(
    //     "There is no date range given for a festival, returning out of function"
    //   );
    //   return;
    // } else if (
    //   opportunityType === "festivals" &&
    //   ((dateRange[0] && dateRange[0].valueOf() < getCurrentDate()) ||
    //     (dateRange[1] && dateRange[1].valueOf() < getCurrentDate()))
    // ) {
    //   console.log("One of the date in the date range is in the past");
    //   return;
    // }

    if (opportunityType === "concerts" && !startTime) {
      console.log("There is no start time given, returning out of function");
      return;
    }

    if (
      (opportunityType === "concerts" || opportunityType === "festivals") &&
      (!city || !state)
    ) {
      console.log(
        "there is no location that was selected, now returning out of function"
      );
      return;
    }

    let opportunityKeys: string[] = [...essentialOpportunityKey];
    console.log("oppurtnuityKeys = " + opportunityKeys);
    if (opportunityType === "jobs") {
      opportunityKeys = essentialOpportunityKey.concat(jobOpportunityKey);
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

    // if (
    //   opportunityType === "festivals" &&
    //   dateRange &&
    //   dateRange[0] &&
    //   dateRange[1]
    // ) {
    //   req.start_date = getCurrentDate(dateRange[0].valueOf());
    //   req.end_date = getCurrentDate(dateRange[1].valueOf());
    //   req.deadline = getCurrentDate(
    //     values.deadline instanceof Date ? values.deadline?.valueOf() : undefined
    //   );
    // }

    // if (opportunityType === "jobs" && !req.end_date) {
    //   const getSixMonthFromToday = () => {
    //     let tempDate: number | Date = getCurrentDate();
    //     tempDate = new Date(tempDate);
    //     tempDate.setMonth(tempDate.getMonth() + 6);
    //     return tempDate.valueOf();
    //   };
    //   req.end_date = getSixMonthFromToday();
    //   console.log(
    //     "getting 6 month from today",
    //     req.end_date,
    //     new Date(req.end_date)
    //   );
    // }

    // else {
    //   req.end_date = getCurrentDate(
    //     values.end_date instanceof Date ? values.end_date?.valueOf() : undefined
    //   );
    //   req.end_date = new Date(req.end_date).setHours(23, 59, 59);
    // }

    // if (opportunityType === "concerts") {
    //   const hours = startTime ? startTime?.getHours() : 23;
    //   const mins = startTime ? startTime?.getMinutes() : 59;
    //
    //   const endDate = new Date(req.end_date);
    //   // console.log("startTime", startTime, "hours", hours, "mins", mins);
    //
    //   req.end_date = endDate.setHours(hours, mins, 59);
    //
    //   req.start_time = startTime?.valueOf();
    // }


    const TenYearsFromToday = () => {
      let tempDate: number | Date = getCurrentDate();
      tempDate = new Date(tempDate);
      tempDate.setMonth(tempDate.getMonth() + 120);
      return tempDate.valueOf();
    };

    req.UID = userUID;
    req.end_date = TenYearsFromToday();
    req.link = "http://compositionToday.net"
    // console.log("getting 6 month from today", req.end_date, new Date(req.end_date);

    req.date_posted = getCurrentDate();
    // console.log("fee type:", req.fee, typeof req.fee, req);
    console.log(req);

    handleSubmission(req);
  };

  // const dateRangeErrorFunction = () => {
  //   if (displayDateRangeError) {
  //     if (!dateRange || !dateRange[0] || !dateRange[1]) {
  //       return "Please give a date range";
  //     } else if (
  //       dateRange[0].valueOf() < getCurrentDate() ||
  //       dateRange[1].valueOf() < getCurrentDate()
  //     ) {
  //       return "Please make sure that the dates given set to today and/or in the future";
  //     }
  //   }
  //   return false;
  // };

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

    if (opportunityType === "competitions") {
      setCity("Remote");
      setState("Remote");
    } else if (pageLoaded) {
      setCity("");
      setState("");
    }

    setPageLoaded(true);
    setDisplayLocationInput(opportunityType !== "competitions");
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
            {/*ROW 1 FORM FIELDS*/}
            <MultipleInputRow
              justify="space-around"
              gap="md"
              display
              direction={medianScreen ? "column" : "row"}
            >
              {/*TITLE FORM FIELD*/}
              <TextInputFullWidth
                label="Title"
                placeholder="Title"
                display
                withAsterisk
                {...form.getInputProps("title")}
              />

            </MultipleInputRow>

            <DescriptionInput
              label="Description"
              placeholder="Description"
              autosize
              withAsterisk
              minRows={5}
              {...form.getInputProps("description")}
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
                  console.log(form.isValid("fee"));

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
