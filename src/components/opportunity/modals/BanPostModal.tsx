import { Text } from "@mantine/core";
import { openConfirmationModal } from "../../modal/ConfirmationModal";

export const openBanPostModal = (
  postTitle: string,
  banCurrentPost: () => void
) => {
  const handleOnConfirm = () => {
    banCurrentPost();
  };

  const createChildren = () => {
    return (
      <Text size="sm">
        Are you sure you want to ban the user who created the post titled "
        <span style={{ fontWeight: 700 }}>{postTitle}</span>"?
      </Text>
    );
  };

  const title = "Ban User";
  const confirmLabel = "Ban user";
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
