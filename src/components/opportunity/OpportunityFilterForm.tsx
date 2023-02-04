import { Location } from "../filter/Location";
import {
  EndDateInput,
  SalaryInput,
  StartEndDatePicker,
  SubmitButtonContainer,
  TextInputFullWidth,
} from "./OpportunityFormHelper";
import React, { useState, useEffect } from "react";
import { Button, Center, Flex, Paper } from "@mantine/core";
import { OpportunityFilterFormContentContainer } from "./OpportunityFilterFormHelper";
import { FormHeader } from "./CreateOpportunityHelper";
import { useLocation } from "react-router-dom";

interface OpportunityFilterForm {
  keyword?: string;
  city?: string;
  state?: string;
  category?: string;
  end_date?: number;
  start_date?: number;
  salary?: string | number;
  job_type?: string;
}

export function OpportunityFilterForm() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const opportunityType = useLocation().pathname.slice(1);

  return (
    <Paper shadow="sm" withBorder>
      <OpportunityFilterFormContentContainer>
        <FormHeader>Filters</FormHeader>
        <TextInputFullWidth
          label="Title/Organization"
          placeholder="Title/Organization"
          display
        />
        <TextInputFullWidth label="Category" placeholder="Category" display />
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
        />
        <EndDateInput
          label="End date"
          display={opportunityType !== "festivals"}
        />
        <StartEndDatePicker
          label="Date Range"
          display={opportunityType === "festivals"}
        />
        <SubmitButtonContainer justify="center">
          <Button>Search</Button>
        </SubmitButtonContainer>
      </OpportunityFilterFormContentContainer>
    </Paper>
  );
}
