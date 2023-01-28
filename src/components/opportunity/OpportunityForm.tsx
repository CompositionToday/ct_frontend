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
} from "./OpportunityFormHelper";
import { OpportunityItem } from "./OpportunityHelper";
import { Location } from "../filter/Location";
import React, { useState, useEffect } from "react";
import { Paper, NumberInput, Button } from "@mantine/core";
import { DateRangePickerValue } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";

interface OpportunityFormProp {
  opportunityType: string;
  opportunity?: OpportunityItem;
}

export function OpportunityForm({
  opportunityType,
  opportunity,
}: OpportunityFormProp) {
  const [city, setCity] = useState(opportunity?.city ? opportunity.city : "");
  const [state, setState] = useState("");
  const [dateRange, setDateRange] = useState<DateRangePickerValue>([
    null,
    null,
  ]);
  const [salary, setSalary] = useState<number>(0);
  const medianScreen = useMediaQuery("(max-width: 992px)");

  useEffect(() => {
    console.log(dateRange);
  }, [dateRange]);

  return (
    <OpportunityFormContainer>
      <Paper shadow="sm" withBorder>
        <OpportunityFormContentContainer>
          <TextInputFullWidth
            label="Title"
            placeholder="Title"
            withAsterisk
            value={city}
          />
          <TwoInputRow
            justify="space-around"
            gap="md"
            direction={medianScreen ? "column" : "row"}
          >
            <TextInputFullWidth
              label="Organization"
              placeholder="Organization"
              withAsterisk
            />
            <TextInputFullWidth label="Link" placeholder="Link" withAsterisk />
          </TwoInputRow>
          <DescriptionInput
            label="Description"
            placeholder="Description"
            autosize
            withAsterisk
            minRows={5}
          />
          <Location
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
          />
          <TwoInputRow
            justify="space-around"
            gap="md"
            direction={medianScreen ? "column" : "row"}
          >
            <SalaryInput
              label="Salary"
              placeholder="Please give an amount"
              value={salary}
              onChange={(e) => {
                if (e) setSalary(e);
                else setSalary(0);
              }}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value ? value : ""))
                  ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : "$ "
              }
              withAsterisk
            />
            <TextInputFullWidth
              label="Job Type"
              placeholder="Job Type"
              withAsterisk
            />
          </TwoInputRow>
          <TextInputFullWidth
            label="Winner"
            placeholder="Give the name of the winner if applicable"
          />
          <TextInputFullWidth
            label="Category"
            placeholder="Category"
            withAsterisk
          />
          <TextInputFullWidth
            label="Address"
            placeholder="Address"
            withAsterisk
          />
          <EndDateInput placeholder="End Date" label="End Date" withAsterisk />
          <StartEndDatePicker
            placeholder="Choose start and end date"
            label="Date Range"
            value={dateRange}
            onChange={(e) => {
              setDateRange(e);
            }}
            withAsterisk
          />
          <SubmitButtonContainer justify="center">
            <Button>Submit</Button>
          </SubmitButtonContainer>
        </OpportunityFormContentContainer>
      </Paper>
    </OpportunityFormContainer>
  );
}
