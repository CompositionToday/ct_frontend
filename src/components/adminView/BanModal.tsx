import { Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import React from "react";
import { RawUserData } from "../adminView/UsersList";

const banOrUnbanAdmin = async(email: string, isBanned: boolean, index: number, setRawUserList: React.Dispatch<React.SetStateAction<RawUserData[]>>) => {
    try {
      let requestInfo = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_banned: isBanned? "0" : "1"} )
      }

      let res = await fetch(
        `https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday/users/${email}`, requestInfo
      );

      let resJSON = await res.json();
      console.log(resJSON);

      setRawUserList(existingData => {
        return[...existingData.slice(0, index), resJSON[0], ...existingData.slice(index + 1)]
      });
    } catch (err) {
      console.log(err);
    }
};

export const openBanModal = (name: string, email: string, index: number, setRawUserList: React.Dispatch<React.SetStateAction<RawUserData[]>>) =>
  openConfirmModal({
    title: "Ban User",
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to ban{" "}
        <span style={{ fontWeight: 700 }}>{name}</span>? This action will
        prevent this user from logging in. All posts they have created will be
        soft deleted.
      </Text>
    ),
    labels: { confirm: "Ban user", cancel: "Nevermind" },
    confirmProps: { color: "red" },
    onCancel: () => console.log("Cancel"),
    onConfirm: () => banOrUnbanAdmin(email, false, index, setRawUserList),
  });

export const openUnbanModal = (name: string, email: string, index: number, setRawUserList: React.Dispatch<React.SetStateAction<RawUserData[]>>) =>
  openConfirmModal({
    title: "Unban User",
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to unban{" "}
        <span style={{ fontWeight: 700 }}>{name}</span>? This action will allow
        this user to login again.
      </Text>
    ),
    labels: { confirm: "Unban user", cancel: "Nevermind" },
    confirmProps: { color: "red" },
    onCancel: () => console.log("Cancel"),
    onConfirm: () => banOrUnbanAdmin(email, true, index, setRawUserList),
  });
