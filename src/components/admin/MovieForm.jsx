import React, { useState } from "react";
import { useNotification } from "../../hook";
import {
  languageOptions,
  statusOptions,
  typeOptions,
} from "../../utils/options";
import { commonInputClasses } from "../../utils/theme";
import CastForm from "../form/CastForm";
import Submit from "../form/Submit";
import GenreSelector from "../GenreSelector";
import CastModal from "../modal/CastModal";
import GenresModal from "../modal/GenresModal";
import WritersModal from "../modal/WritersModal";
import PosterSelector from "../PosterSelector";
import Selector from "../Selector";
import TagsInput from "../TagsInput";
import { Label } from "../Label";
import DirectorSelector from "../DirectorSelector";
import WriterSelector from "../WriterSelector";
import { ViewAllBtn } from "../ViewAllButton";
import { LabelWithBadge } from "../LabelWithBadge";

const defaultMovieInfo = {
  title: "",
  storyLine: "",
  tags: [],
  cast: [],
  director: {},
  writers: [],
  releaseDate: "",
  poster: null,
  genres: [],
  type: "",
  language: "",
  status: "",
};

const validateMovie = (movieInfo) => {
  const {
    title,
    storyLine,
    status,
    type,
    language,
    releaseDate,
    tags,
    genres,
    cast,
  } = movieInfo;

  const validators = [
    { field: title, errorMessage: "Title is missing!" },
    { field: storyLine, errorMessage: "Storyline is missing!" },
    { field: status, errorMessage: "Status is missing!" },
    { field: type, errorMessage: "Type is missing!" },
    { field: language, errorMessage: "Language is missing!" },
    { field: releaseDate, errorMessage: "Release Date is missing!" },
    // { field: "tags", errorMessage: "Tags are missing!" },
    // { field: "cast", errorMessage: "Cast is missing!" },
  ];

  for (const { field, errorMessage } of validators) {
    if (!field.trim()) {
      return { error: errorMessage };
    }
  }

  if (!Array.isArray(genres)) return { error: "Genres is missing!" };

  for (let gen of genres) {
    if (!gen.trim()) return { error: "Invalid genres" };
  }

  //valid is array
  if (!Array.isArray(tags)) return { error: "Tags is missing!" };

  //valid is string
  for (let tag of tags) {
    if (!tag.trim()) return { error: "Invalid tags" };
  }

  //valid is array
  if (!Array.isArray(cast)) return { error: "Cast is missing!" };

  //valid is object
  for (let c of cast) {
    if (typeof c !== "object") return { error: "Invalid cast" };
  }
};

export default function MovieForm() {
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const [showWriterModal, setShowWriterModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);
  const [showGenresModal, setShowGenresModal] = useState(false);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState("");
  const { updateNotification } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateMovie(movieInfo);
    console.log(error);
  };

  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedPosterForUI(url);
  };

  const handleChange = ({ target }) => {
    const { value, name, files } = target;
    if (name === "poster") {
      const poster = files[0];
      updatePosterForUI(poster);
      return setMovieInfo({ ...movieInfo, poster });
    }
    setMovieInfo({ ...movieInfo, [name]: value });
  };

  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };

  const updateDirector = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile });
  };

  const updateCast = (castInfo) => {
    const { cast } = movieInfo;
    setMovieInfo({ ...movieInfo, cast: [...cast, castInfo] });
  };

  const updateGenres = (genres) => {
    const { cast } = movieInfo;
    setMovieInfo({ ...movieInfo, genres });
  };

  const updateWriters = (profile) => {
    const { writers } = movieInfo;
    for (let writer of writers) {
      if (writer.id === profile.id) {
        return updateNotification(
          "warning",
          "this profile is already selected!"
        );
      }
    }
    setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
  };

  const hideWritersModal = () => {
    setShowWriterModal(false);
  };

  const displayWritersModal = () => {
    setShowWriterModal(true);
  };

  const hideCastModal = () => {
    setShowCastModal(false);
  };

  const displayCastModal = () => {
    setShowCastModal(true);
  };

  const hideGenresModal = () => {
    setShowGenresModal(false);
  };

  const displayGenresModal = () => {
    setShowGenresModal(true);
  };

  const handleWriterRemove = (profileId) => {
    const { writers } = movieInfo;
    const newWriters = writers.filter(({ id }) => id !== profileId);
    if (!newWriters.length) hideWritersModal();
    setMovieInfo({ ...movieInfo, writers: [...newWriters] });
  };

  const handleCastRemove = (profileId) => {
    const { cast } = movieInfo;
    const newCast = cast.filter(({ profile }) => profile.id !== profileId);
    if (!newCast.length) hideCastModal();
    setMovieInfo({ ...movieInfo, cast: [...newCast] });
  };

  const {
    title,
    storyLine,
    writers,
    cast,
    tags,
    genres,
    type,
    language,
    status,
  } = movieInfo;
  return (
    <>
      <div autoComplete="off" className="flex space-x-3">
        <div className="w-[70%] space-y-5">
          <div>
            <Label htmlFor="title">Title</Label>
            <input
              id="title"
              value={title}
              onChange={handleChange}
              name="title"
              type="text"
              placeholder="Movie title"
              className={
                commonInputClasses +
                " outline-none border-b-2 font-semibold text-xl "
              }
            />
          </div>

          <div>
            <Label htmlFor="storyLine">Story Line</Label>
            <textarea
              id="storyLine"
              defaultValue={storyLine}
              name="storyLine"
              placeholder="Movie story line"
              className={commonInputClasses + " resize-none h-24 border-b-2"}
            ></textarea>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <TagsInput value={tags} name="tags" onChange={updateTags} />
          </div>

          <DirectorSelector onSelect={updateDirector} />

          <div>
            <div className="flex justify-between">
              <LabelWithBadge badge={writers.length} htmlFor="writers">
                Writers
              </LabelWithBadge>
              <ViewAllBtn
                onClick={displayWritersModal}
                visible={writers.length}
              >
                View All
              </ViewAllBtn>
            </div>
            <WriterSelector onSelect={updateWriters} />
          </div>
          <div>
            <div className="flex justify-between">
              <LabelWithBadge badge={cast.length}>
                Add Cast & Crew
              </LabelWithBadge>
              <ViewAllBtn onClick={displayCastModal} visible={cast.length}>
                View All
              </ViewAllBtn>
            </div>
            <CastForm onSubmit={updateCast} />
          </div>

          <input
            type="date"
            onChange={handleChange}
            name="releaseDate"
            className={commonInputClasses + " border-2 rounded p-1 w-auto"}
          />

          <Submit value="Upload" onClick={handleSubmit} type="button" />
        </div>
        <div className="w-[30%] space-y-5 ">
          <PosterSelector
            name="poster"
            onChange={handleChange}
            selectedPoster={selectedPosterForUI}
            accept="image/jpg, image/jpeg, image/png"
            label="Select Poster"
          />
          <GenreSelector badge={genres.length} onClick={displayGenresModal} />

          <Selector
            onChange={handleChange}
            name="type"
            value={type}
            options={typeOptions}
            label="Type"
          />
          <Selector
            onChange={handleChange}
            name="language"
            value={language}
            options={languageOptions}
            label="Language"
          />
          <Selector
            onChange={handleChange}
            name="status"
            value={status}
            options={statusOptions}
            label="Status"
          />
        </div>
      </div>

      <WritersModal
        onClose={hideWritersModal}
        profiles={writers}
        visible={showWriterModal}
        onRemoveClick={handleWriterRemove}
      />

      <CastModal
        onClose={hideCastModal}
        casts={cast}
        visible={showCastModal}
        onRemoveClick={handleCastRemove}
      />
      <GenresModal
        onSubmit={updateGenres}
        visible={showGenresModal}
        onClose={hideGenresModal}
        previousSelection={genres}
      />
    </>
  );
}
