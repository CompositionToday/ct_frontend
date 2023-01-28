import { CreateOpportunityContainer } from "./CreateOpportunityHelper";
import { OpportunityForm } from "./OpportunityForm";
import React, { useState, useEffect } from "react";
import { Center, Paper, Select } from "@mantine/core";

export function CreateOpportunity() {
  const [opportunityType, setOpportunityType] = useState("Jobs");

  return (
    <CreateOpportunityContainer>
      <h1 style={{ textAlign: "center" }}>Create Opportunity</h1>
      <Select
        label="Opportunity Type"
        placeholder="Select opportunity type"
        value={opportunityType}
        data={["Jobs", "Competitions", "Festivals", "Concerts"]}
      />
      <OpportunityForm
        opportunityType={opportunityType}
        // opportunity={{
        //   UID: "1",
        //   idposts: 1,
        //   title: "Title of post",
        //   link: "link to some website",
        //   organization: "UCF Football",
        //   description: "The future of college football",
        //   date_posted: new Date(),
        //   city: "orlando",
        //   state: "florida",
        //   end_date: new Date(),
        // }}
      />
    </CreateOpportunityContainer>
  );
}
