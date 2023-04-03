import {
  CreateOpportunityContainer,
  FormHeader,
} from "./CreateOpportunityHelper";
import { OpportunityForm } from "./OpportunityForm";
import { auth } from "../../Firebase";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Container, Select, Modal, Button, Flex } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { OpportunityItem } from "./OpportunityHelper";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { useMediaQuery } from "@mantine/hooks";

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
      opportunity.end_date = opportunity.end_date?.toString();
      opportunity.start_date = opportunity.start_date?.toString();
      opportunity.date_posted = opportunity.date_posted?.toString();
      opportunity.start_time = opportunity.start_time?.toString();

      let requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opportunity),
      };

      let response = await fetch(`${url}/${opportunityType}`, requestOptions);

      let responseJson = await response.json();

      navigate("/my-posts");
      // setDisplaySuccessModal(true);

      showNotification({
        title: "Post Created",
        message: "Your post was successfully created!",
        color: "green",
      });
    } catch (err) {
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
      } else if (!user.emailVerified) {
        navigate("/verify");
      }
    });
  }, []);

  useEffect(() => {
  }, [opportunityType]);

  const smallerScreen = useMediaQuery("(max-width: 992px)");

  return (
    <Container
      sx={{ marginBottom: "60px", width: smallerScreen ? "90vw" : "55vw" }}
    >
      <FormHeader>Create Post</FormHeader>
      <Select
        label="Opportunity Type"
        placeholder="Select opportunity type"
        value={opportunityType.substring(0, opportunityType.length - 1)}
        onChange={handleOpportunityTypeChange}
        data={["Job", "Competition", "Festival", "Concert"]}
        sx={{ marginBottom: "25px" }}
      />
      <OpportunityForm
        edit={false}
        opportunityType={opportunityType.toLowerCase()}
        handleSubmission={handleSubmission}
      />
      <Modal
        opened={displaySuccessModal}
        withCloseButton={false}
        onClose={close}
        size="80%"
      >
        <FormHeader>Post Created!</FormHeader>
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
    </Container>
  );
}
