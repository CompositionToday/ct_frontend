import { Text } from "@mantine/core";
import React from "react";
import { openConfirmationModal } from "../../modal/ConfirmationModal";
import { showNotification } from "@mantine/notifications";
import {wait} from "@testing-library/user-event/dist/utils";

export const openDenyModal = (
  selectedRows: number[],
  onUpdateSelectedRows: (updatedRows: number[]) => void,
  onUpdate: () => void
) => {
  const DenyPosts = async () => {
    try {
      for (let i = 0; i < selectedRows.length; i++) {
        let requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        };

        let response = await fetch(
          `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/webscraping/deny/${selectedRows[i]}`,
          requestOptions
        );
        //let responseJson = await response.json();

      }


    showNotification({
      title: "Posts Denied",
      message: "Scraped posts have been denied",
      color: "green",
    });

    onUpdateSelectedRows([]);
    onUpdate();


    } catch (err) {
      console.log(err);
      showNotification({
        title: "Error",
        message: "There was a problem, please try again later",
        color: "red",
      });
    }
  };

  const handleOnConfirm = () => {
    DenyPosts();
  };

  const createChildren = () => {
    return (
      <Text size="sm">
        Are you sure you want to{" "}
        <span style={{ fontWeight: 700 }}>Deny These Posts</span>?
      </Text>
    );
  };

  const title = "Deny Posts";
  const confirmLabel = "Deny Posts";
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
