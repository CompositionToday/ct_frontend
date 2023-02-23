import {
  CreateOpportunityContainer,
  FormHeader,
} from "./CreateOpportunityHelper";
import { OpportunityForm } from "./OpportunityForm";
import { auth } from "../../Firebase";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Center, Paper, Select, Modal, Button, Flex } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { OpportunityItem } from "./OpportunityHelper";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";

export function CreateOpportunity() {
  const [opportunityType, setOpportunityType] = useState("Jobs");
  const [displaySuccessModal, setDisplaySuccessModal] = useState(false);
  const url = "https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday";
  const navigate = useNavigate();

  const handleOpportunityTypeChange = (e: string) => {
    setOpportunityType(e + "s");
  };

  const handleSubmission = async (opportunity: OpportunityItem) => {
    try {
      console.log("Opportunity:", opportunity);

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

      setDisplaySuccessModal(true);
    } catch (err) {
      console.log(err);
      showNotification({
        title: "Error",
        message: "Something went wrong, please try again later",
        color: "red",
      });
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
      <FormHeader>Create Post</FormHeader>
      <Select
        label="Opportunity Type"
        placeholder="Select opportunity type"
        value={opportunityType.substring(0, opportunityType.length - 1)}
        onChange={handleOpportunityTypeChange}
        data={["Job", "Competition", "Festival", "Concert"]}
        sx={{ marginBottom: "25px" }}
      />
      {/* <TimeInput
        label="What time is it now?"
        onChange={(e) => console.log("change at time input ", e)}
        format="12"
      /> */}
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
      <Modal
        opened={displaySuccessModal}
        withCloseButton={false}
        onClose={() => console.log("closing unicorn modal")}
        size="80%"
      >
        <FormHeader>Opportunity Created!</FormHeader>
        <p>
          Your opportunity has successfully been created! What would you like to
          do next?
        </p>
        <Flex justify="flex-end" gap={20} wrap="wrap">
          <Button onClick={() => window.location.reload()}>
            Make another opportunity
          </Button>
          <Button onClick={() => navigate("/")}>Go to the home page</Button>
        </Flex>
      </Modal>
    </CreateOpportunityContainer>
  );
}
