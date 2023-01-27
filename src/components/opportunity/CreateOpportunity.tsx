import { CreateOpportunityContainer } from "./CreateOpportunityHelper";
import { OpportunityForm } from "./OpportunityForm";
import React, { useState, useEffect } from "react";
import { Center, Paper, Select } from "@mantine/core";

export function CreateOpportunity() {
  return (
    <CreateOpportunityContainer>
      <Select
        label="Opportunity Type"
        placeholder="Select opportunity type"
        data={["Jobs", "Competitions", "Festivals", "Concerts"]}
      />
      <OpportunityForm />
    </CreateOpportunityContainer>
  );
}
