import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadMovie, uploadTrailer } from "../../api/movie";
import { useNotification } from "../../hook";
import ModalContainer from "../modal/ModalContainer";
import MovieForm from "./MovieForm";

export default function MovieUpload({ visible, onClose }) {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoInfo, setVideoInfo] = useState({});

  const { updateNotification } = useNotification();

  const handleUploadTrailer = async (data) => {
    const { error, url, public_id } = await uploadTrailer(
      data,
      setUploadProgress
    );

    if (error) return updateNotification("error", error);

    setVideoUploaded(true);
    setVideoInfo({ url, public_id });
  };

  const handleTypeError = (error) => {
    updateNotification("error", error);
  };

  // console.log(videoInfo);

  const handleChange = (file) => {
    const formData = new FormData();
    formData.append("video", file);

    setVideoSelected(true);
    handleUploadTrailer(formData);
  };

  const getUploadProgressValue = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return "Processing";
    }

    return `Upload progress ${uploadProgress}%`;
  };

  const handleSubmit = async (movieInfoData) => {
    const validateTrailer = !videoInfo.url || !videoInfo.public_id;
    if (validateTrailer) {
      return updateNotification("error", "Trailer is missing!");
    }

    movieInfoData.append("trailer", JSON.stringify(videoInfo));

    const res = await uploadMovie(movieInfoData);
    console.log(res);
  };

  return (
    <ModalContainer visible={visible}>
      <UploadProgress
        visible={!videoUploaded && videoSelected}
        message={getUploadProgressValue()}
        width={uploadProgress}
      />
      {!videoUploaded ? (
        <TrailerSelector
          visible={!videoSelected}
          onTypeError={handleTypeError}
          handleChange={handleChange}
        />
      ) : (
        <MovieForm onsubmit={handleSubmit} />
      )}
    </ModalContainer>
  );
}

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;

  return (
    <div className="h-full flex items-center justify-center">
      <FileUploader
        handleChange={handleChange}
        onTypeError={onTypeError}
        types={["mp4", "avi"]}
      >
        <div className="w-48 h-48 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex items-center justify-center flex-col text-secondary dark:text-dark-subtle cursor-pointer">
          <AiOutlineCloudUpload size={80} />
          <p>Drop your file here!</p>
        </div>
      </FileUploader>
    </div>
  );
};

const UploadProgress = ({ width, message, visible }) => {
  if (!visible) return null;

  return (
    <div className="dark:bg-secondary bg-white drop-shadow-lg rounded p-3">
      <div className="relative h-3 dark:bg-dark-subtle bg-light-subtle overflow-hidden">
        <div
          style={{ width: width + "%" }}
          className="h-full absolute bg-secondary left-0 dark:bg-white"
        />
      </div>
      <p className="font-semibold dark:text-dark-subtle text-light-subtle animate-puls mt-1">
        {message}
      </p>
    </div>
  );
};
