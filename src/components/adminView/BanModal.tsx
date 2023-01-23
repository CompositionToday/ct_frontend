import { Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";

export const openBanModal = (name: string) =>
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
    onConfirm: () => console.log("Confirmed"),
  });

export const openUnbanModal = (name: string) =>
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
    onConfirm: () => console.log("Confirmed"),
  });
