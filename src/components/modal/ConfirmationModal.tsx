import { openConfirmModal } from "@mantine/modals";
import React from "react";

interface ConfirmationModalProps {
  title: string;
  children: React.ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  color: string;
  handleOnConfirm: () => void;
}

export const openConfirmationModal = ({
  title,
  children,
  confirmLabel,
  cancelLabel,
  color,
  handleOnConfirm,
}: ConfirmationModalProps) => {
  console.log(title, children, confirmLabel, cancelLabel, color);
  openConfirmModal({
    title: title,
    centered: true,
    children: children,
    labels: { confirm: confirmLabel, cancel: cancelLabel },
    confirmProps: { color: color },
    onCancel: () => console.log("Cancel"),
    onConfirm: () => handleOnConfirm(),
  });
};
