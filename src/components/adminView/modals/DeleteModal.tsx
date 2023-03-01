import { Text } from "@mantine/core";
import React from "react";
import { RawUserData } from "../UsersList";
import { openConfirmationModal } from "../../modal/ConfirmationModal";

export const openDeleteModal = (
  name: string,
  email: string,
  index: number,
  setRawUserList: React.Dispatch<React.SetStateAction<RawUserData[]>>
) => {
  const deleteUser = async () => {
    try {
      let requestInfo = {
        method: "DELETE",
      };

      let res = await fetch(
        `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/users/${email}`,
        requestInfo
      );

      let resJSON = await res.json();
      console.log("resJSON", resJSON);

      setRawUserList((existingData) => {
        return [
          ...existingData.slice(0, index),
          ...existingData.slice(index + 1),
        ];
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnConfirm = () => {
    deleteUser();
  };

  const createChildren = () => {
    return (
      <Text size="sm">
        Are you sure you want to delete{" "}
        <span style={{ fontWeight: 700 }}>{name}</span>? This action will{" "}
        <span style={{ fontWeight: 700 }}>permanently delete </span>
        this user from the database.
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
