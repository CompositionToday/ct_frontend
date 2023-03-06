import { Text } from "@mantine/core";
import { openConfirmationModal } from "../../modal/ConfirmationModal";

export const openResetFlagCountPostModal = (
  postTitle: string,
  resetReportCount: () => void
) => {
  const handleOnConfirm = () => {
    resetReportCount();
  };

  const createChildren = () => {
    return (
      <Text size="sm">
        Are you sure you want to reset the amount of reports to zero for the
        post titled "<span style={{ fontWeight: 700 }}>{postTitle}</span>"?
      </Text>
    );
  };

  const title = "Reset Report Count";
  const confirmLabel = "Reset report count";
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
