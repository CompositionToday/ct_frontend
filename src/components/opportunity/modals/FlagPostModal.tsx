import { Text } from "@mantine/core";
import { openConfirmationModal } from "../../modal/ConfirmationModal";

export const openFlagPostModal = (
  postTitle: string,
  flagCurrentPost: () => void
) => {
  const handleOnConfirm = () => {
    flagCurrentPost();
  };

  const createChildren = () => {
    return (
      <Text size="sm">
        Are you sure you want to report the post titled "
        <span style={{ fontWeight: 700 }}>{postTitle}</span>"?
      </Text>
    );
  };

  const title = "Report Post";
  const confirmLabel = "Report post";
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
