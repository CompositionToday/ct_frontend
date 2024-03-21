import { Text } from "@mantine/core";
import { openConfirmationModal } from "../../modal/ConfirmationModal";

export const openLikePostModal = (
  postTitle: string,
  likeCurrentPost: () => void,
  liked: boolean
) => {
  const handleOnConfirm = () => {
    likeCurrentPost();
  };

  const createChildren = () => {
    if (!liked) {
      return (
        <Text size="sm">
          Are you sure you want to like "
          <span style={{ fontWeight: 700 }}>{postTitle}</span>"?
        </Text>
      );
    } else {
      return (
        <Text size="sm">
          Are you sure you want to unlike "
          <span style={{ fontWeight: 700 }}>{postTitle}</span>"?
        </Text>
      );
    }
  };

  const title = "Like Post";
  const confirmLabel = "Like post";
  const cancelLabel = "Cancel";
  const color = "blue";
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
