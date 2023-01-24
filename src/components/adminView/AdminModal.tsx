import { Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import React from "react";
import { RawUserData } from "../adminView/UsersList";

const makeOrRemoveAdmin = async (
  email: string,
  isAdmin: boolean,
  index: number,
  setRawUserList: React.Dispatch<React.SetStateAction<RawUserData[]>>
) => {
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
    console.log(resJSON);

    setRawUserList((existingData) => {
      return [
        ...existingData.slice(0, index),
        resJSON[0],
        ...existingData.slice(index + 1),
      ];
    });
  } catch (err) {
    console.log(err);
  }
};

export const openMakeAdminModal = (
  name: string,
  email: string,
  index: number,
  setRawUserList: React.Dispatch<React.SetStateAction<RawUserData[]>>
) =>
  openConfirmModal({
    title: "Make Admin",
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to make{" "}
        <span style={{ fontWeight: 700 }}>{name}</span> an admin? This action
        will grant this user admin abilities.
      </Text>
    ),
    labels: { confirm: "Make admin", cancel: "Nevermind" },
    confirmProps: { color: "red" },
    onCancel: () => console.log("Cancel"),
    onConfirm: () => makeOrRemoveAdmin(email, false, index, setRawUserList),
  });

export const openRemoveAdminModal = (
  name: string,
  email: string,
  index: number,
  setRawUserList: React.Dispatch<React.SetStateAction<RawUserData[]>>
) =>
  openConfirmModal({
    title: "Remove Admin",
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to remove{" "}
        <span style={{ fontWeight: 700 }}>{name}</span> as an admin? This action
        will remove admin abilities from this user.
      </Text>
    ),
    labels: { confirm: "Remove admin", cancel: "Nevermind" },
    confirmProps: { color: "red" },
    onCancel: () => console.log("Cancel"),
    onConfirm: () => makeOrRemoveAdmin(email, true, index, setRawUserList),
  });
