import styled from "@emotion/styled";
import { Flex, TextInput, Textarea, NumberInput, Button } from "@mantine/core";
import { DatePicker, DateRangePicker } from "@mantine/dates";

export const OpportunityFormContainer = styled.div`
  margin-top: 10px;
`;

export const OpportunityFormContentContainer = styled.div`
  padding: 20px;
  margin: 0 auto;
`;

export const TwoInputRow = styled(Flex)`
  margin-top: 10px;
`;

export const TextInputFullWidth = styled(TextInput)`
  margin-top: 10px;
  width: 100%;
`;

export const DescriptionInput = styled(Textarea)`
  margin-top: 10px;
`;

export const EndDateInput = styled(DatePicker)`
  margin-top: 10px;
`;

export const StartEndDatePicker = styled(DateRangePicker)`
  margin-top: 10px;
`;

export const SalaryInput = styled(NumberInput)`
  margin-top: 10px;
`;

export const SubmitButtonContainer = styled(Flex)`
  margin-top: 30px;
  width: 100%;
`;
