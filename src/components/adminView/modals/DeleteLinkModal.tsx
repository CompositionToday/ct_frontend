import { Text } from "@mantine/core";
import React from "react";
import { RawUserData } from "../UsersList";
import { openConfirmationModal } from "../../modal/ConfirmationModal";
import { ScrapedLink } from "../ScrapedLinkHelper";

export const openDeleteLinkModal = (
  link: ScrapedLink
) => {
  const handleDeleteButton = async () => {
    try {
      const idpost = link.linkID;
  
      // Construct the updated opportunity object with expiration_date set to current time
      const updatedOpportunity = {
        ...link,
        expiration_date: new Date().getTime(), // Set expiration_date to current time
      };

      
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOpportunity),
      };
  
      const response = await fetch(
        `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/links/${idpost}`,
        requestOptions
      );
      
      // Handle response as needed
      // You may want to update state or display a notification
    } catch (error) {
      console.error('Error deleting opportunity:', error);
      // Handle error as needed
      // You may want to display an error message to the user
    }
  };

  const handleOnConfirm = () => {
    handleDeleteButton();
  };

  const createChildren = () => {
    return (
      <Text size="sm">
        Are you sure you want to delete{" "}
        <span style={{ fontWeight: 700 }}>{link.title}</span>? This action will{" "}
        <span style={{ fontWeight: 700 }}> delete </span>
        this link from the database.
      </Text>
    );
  };

  const title = "Delete User";
  const confirmLabel = "Delete user";
  const cancelLabel = "Cancel";
  const color = "red";
  const children = createChildren();

  openConfirmationModal({
    title,
    children,
    confirmLabel,
    cancelLabel,
    color,
    handleOnConfirm,
  });
};
