import react, { useState, useEffect } from "react";
import { Text, Textarea } from "@mantine/core";
import { openConfirmationModal } from "../../modal/ConfirmationModal";

export const openDeletePostModal = (
  postTitle: string,
  deleteCurrentPost: () => void,
  isAdminDeletingUserPost: boolean,
  setHelperDeleteComment: React.Dispatch<React.SetStateAction<string>>
) => {
  const handleOnConfirm = () => {
    deleteCurrentPost();
  };

  const createChildren = () => {
    return (
      <>
        <Text size="sm">
          Are you sure you want to delete{" "}
          {isAdminDeletingUserPost ? "the" : "your"} post titled "
          <span style={{ fontWeight: 700 }}>{postTitle}</span>"?
        </Text>
        {isAdminDeletingUserPost && (
          <Textarea
            onChange={(e) => {
              setHelperDeleteComment(e.target.value);
              console.log("delete comment input:", e.target.value);
            }}
            placeholder="Tell the user why you deleted their post"
            label="Why are you deleting this post?"
            sx={{ marginTop: "20px" }}
          />
        )}
      </>
    );
  };

  const title = "Delete Post";
  const confirmLabel = "Delete post";
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
