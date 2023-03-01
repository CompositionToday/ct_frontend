import { Text } from "@mantine/core";
import React from "react";
import { RawUserData } from "../UsersList";
import { openConfirmationModal } from "../../modal/ConfirmationModal";

export const openBanModal = (
  name: string,
  email: string,
  index: number,
  isBanned: boolean,
  setRawUserList: React.Dispatch<React.SetStateAction<RawUserData[]>>
) => {
  const banOrUnbanUser = async () => {
    try {
      let requestInfo = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_banned: isBanned ? "0" : "1" }),
      };

      let res = await fetch(
        `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/users/${email}`,
        requestInfo
      );

      let resJSON = await res.json();
      console.log(resJSON);

      setRawUserList((existingData) => {
        return [
          ...existingData.slice(0, index),
          resJSON.listOfObjects[0],
          ...existingData.slice(index + 1),
        ];
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnConfirm = () => {
    banOrUnbanUser();
  };

  const createChildren = () => {
    return isBanned ? (
      <Text size="sm">
        Are you sure you want to unban{" "}
        <span style={{ fontWeight: 700 }}>{name}</span>? This action will allow
        this user to login again.
      </Text>
    ) : (
      <Text size="sm">
        Are you sure you want to ban{" "}
        <span style={{ fontWeight: 700 }}>{name}</span>? This action will
        prevent this user from logging in. All posts they have created will be
        soft deleted.
      </Text>
    );
  };

  const title = isBanned ? "Unban User" : "Ban User";
  const confirmLabel = isBanned ? "Unban user" : "Ban user";
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
