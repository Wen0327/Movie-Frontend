import React from "react";
import ActorForm from "../form/ActorForm";
import ModalContainer from "./ModalContainer";
import { createActor } from "../../api/actor";
import { useNotification } from "../../hook";

export default function ActorUpload({ visible, onClose }) {
  const { updateNotification } = useNotification();
  const handleSubmit = async (data) => {
    const { error, actor } = await createActor(data);
    if (error) {
      return updateNotification("error", error);
    }
    updateNotification("Success", "Actor created successfully.");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm
        onSubmit={handleSubmit}
        title="Create New Actor"
        btnTitle="Create"
      />
    </ModalContainer>
  );
}
