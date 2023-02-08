import {
  CreateOpportunityContainer,
  FormHeader,
} from "./CreateOpportunityHelper";
import { OpportunityForm } from "./OpportunityForm";
import { auth } from "../../Firebase";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Center, Paper, Select } from "@mantine/core";
import { OpportunityItem } from "./OpportunityHelper";
import { useNavigate } from "react-router-dom";

export function CreateOpportunity() {
  const [opportunityType, setOpportunityType] = useState("Jobs");
  const navigate = useNavigate();

  const handleOpportunityTypeChange = (e: string) => {
    setOpportunityType(e);
  };

  const handleSubmission = async (opportunity: OpportunityItem) => {
    console.log("opportunity in create: ", opportunity);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
  });

  useEffect(() => {
    console.log(opportunityType);
  }, [opportunityType]);

  return (
    <CreateOpportunityContainer>
      <FormHeader>Create Opportunity</FormHeader>
      <Select
        label="Opportunity Type"
        placeholder="Select opportunity type"
        value={opportunityType}
        onChange={handleOpportunityTypeChange}
        data={["Jobs", "Competitions", "Festivals", "Concerts"]}
      />
      <OpportunityForm
        opportunityType={opportunityType.toLowerCase()}
        handleSubmission={handleSubmission}
        // opportunity={{
        //   UID: "1",
        //   idposts: 1,
        //   title: "Title of post",
        //   link: "link to some website",
        //   organization: "UCF Football",
        //   description: "The future of college football",
        //   date_posted: new Date().valueOf(),
        //   city: "orlando",
        //   state: "florida",
        //   end_date: new Date().valueOf(),
        //   salary: 120000,
        //   job_type: "Football staff",
        // }}
      />
    </CreateOpportunityContainer>
  );
}
