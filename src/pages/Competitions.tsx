import React, { useState, useEffect } from "react";
import { Grid, MediaQuery, Pagination, Flex } from "@mantine/core";
import { Opportunity } from "../components/opportunity/Opportunity";

export function Competitions() {
  return (
    <div>
      <Opportunity apiEndpoint="competitions" />
    </div>
  );
}
