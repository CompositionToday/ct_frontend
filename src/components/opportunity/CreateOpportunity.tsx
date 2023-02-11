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
  const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";
  const navigate = useNavigate();

  const handleOpportunityTypeChange = (e: string) => {
    setOpportunityType(e);
  };

  const handleSubmission = async (opportunity: OpportunityItem) => {
    try {
      console.log("opportunity in create: ", opportunity);
      console.log(
        "end_date: ",
        new Date(
          typeof opportunity.end_date === "number" ? opportunity.end_date : 1000
        )
      );
      opportunity.end_date = opportunity.end_date?.toString();
      opportunity.start_date = opportunity.start_date?.toString();
      opportunity.date_posted = opportunity.date_posted?.toString();

      let requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opportunity),
      };

      let response = await fetch(`${url}/${opportunityType}`, requestOptions);

      let responseJson = await response.json();

      console.log("POST response json: ", responseJson);
    } catch (err) {
      console.log(err);
    }
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
