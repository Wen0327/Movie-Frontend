import React from "react";
import ActorForm from "../form/ActorForm";
import ModalContainer from "./ModalContainer";
import { createActor } from "../../api/actor";

export default function ActorUpload({ visible, onClose }) {
  const handleSubmit = (data) => {
    console.log(data);
    createActor(data);
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
