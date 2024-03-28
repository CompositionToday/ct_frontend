import styled from "@emotion/styled";
import { Paper } from "@mantine/core";

export const CreateOpportunityContainer = styled.div`
  width: 55vw;
  margin: 0 auto;
  margin-bottom: 60px;
`;

export const FormHeader = styled.h1`
  text-align: center;
  font-size: 30px;
  //color: #373a40;
  color: {(useMantineTheme().colorScheme === "dark" ? useMantineTheme().colors.dark[4] : '#e2f0fe')}
};
  };
`;
