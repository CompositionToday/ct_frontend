import { Text } from "@mantine/core";
import React from "react";
import { RawUserData } from "../UsersList";
import { openConfirmationModal } from "../../modal/ConfirmationModal";

export const openAdminModal = (
  name: string,
  email: string,
  index: number,
  isAdmin: boolean,
  setRawUserList: React.Dispatch<React.SetStateAction<RawUserData[]>>
) => {
  const makeOrRemoveAdmin = async () => {
    try {
      let requestInfo = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_admin: isAdmin ? "0" : "1" }),
      };

      let res = await fetch(
        `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/users/${email}`,
        requestInfo
      );

      let resJSON = await res.json();

      setRawUserList((existingData) => {
        return [
          ...existingData.slice(0, index),
          resJSON.listOfObjects[0],
          ...existingData.slice(index + 1),
        ];
      });
    } catch (err) {
    }
  };

  const handleOnConfirm = () => {
    makeOrRemoveAdmin();
  };

  const createChildren = () => {
    return isAdmin ? (
      <Text size="sm">
        Are you sure you want to remove{" "}
        <span style={{ fontWeight: 700 }}>{name}</span> as an admin? This action
        will remove admin abilities from this user.
      </Text>
    ) : (
      <Text size="sm">
        Are you sure you want to make{" "}
        <span style={{ fontWeight: 700 }}>{name}</span> an admin? This action
        will grant this user admin abilities.
      </Text>
    );
  };

  const title = isAdmin ? "Remove Admin" : "Make Admin";
  const confirmLabel = isAdmin ? "Remove admin" : "Make admin";
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
