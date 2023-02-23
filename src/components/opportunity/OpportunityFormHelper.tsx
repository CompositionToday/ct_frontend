import styled from "@emotion/styled";
import {
  Flex,
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Select,
} from "@mantine/core";
import { DatePicker, DateRangePicker, TimeInput } from "@mantine/dates";

interface OpportunityInput {
  display?: boolean;
}

export const OpportunityFormContainer = styled.div`
  margin-top: 10px;
`;

export const OpportunityFormContentContainer = styled.div`
  margin: 0 auto;
`;

export const TwoInputRow = styled(Flex)<OpportunityInput>`
  margin-top: 10px;
  display: ${(props) => (props.display ? "auto" : "none")};
`;

export const TextInputFullWidth = styled(TextInput)<OpportunityInput>`
  margin-top: 10px;
  width: 100%;
  display: ${(props) => (props.display ? "auto" : "none")};
`;

export const DescriptionInput = styled(Textarea)`
  margin-top: 10px;
`;

export const EndDateInput = styled(DatePicker)<OpportunityInput>`
  margin-top: 10px;
  display: ${(props) => (props.display ? "auto" : "none")};
`;

export const StartEndDatePicker = styled(DateRangePicker)<OpportunityInput>`
  margin-top: 10px;
  display: ${(props) => (props.display ? "auto" : "none")};
`;

export const SalaryInput = styled(NumberInput)<OpportunityInput>`
  margin-top: 10px;
  display: ${(props) => (props.display ? "auto" : "none")};
  width: 100%;
`;

export const SubmitButtonContainer = styled(Flex)`
  margin-top: 30px;
  width: 100%;
`;

export const DropdownCategory = styled(Select)<OpportunityInput>`
  display: ${(props) => (props.display ? "auto" : "none")};
  width: 100%;
  margin-top: 10px;
`;

export const StartTimeInput = styled(TimeInput)<OpportunityInput>`
  display: ${(props) => (props.display ? "auto" : "none")};
  margin-top: 10px;
`;
