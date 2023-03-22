import React from "react";
import { commonInputClasses } from "../../utils/theme";
import LiveSearch, { results } from "../LiveSearch";
import TagsInput from "../TagsInput";

export default function MovieForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const renderItem = (result) => {
    return (
      <div key={result.id} className="flex space-x-2 rounded overflow-hidden">
        <img
          className="w-16 h-16 object-cover"
          src={result.avatar}
          alt={result.name}
        />
        <p className="dark:text-white font-semibold">{result.name}</p>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-3">
      <div className="w-[70%] h-5 space-y-5">
        <div>
          <Label htmlFor="title">Title</Label>
          <input
            id="title"
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
            placeholder="Movie story line"
            className={commonInputClasses + " resize-none h-24 border-b-2"}
          ></textarea>
        </div>

        <div>
          <Label htmlFor="tags">Tags</Label>
          <TagsInput name="tags" />
        </div>
        <LiveSearch
          placeholder="Search profile"
          results={results}
          renderItem={renderItem}
          onSelect={(result) => console.log(result)}
        />
      </div>
      <div className="w-[30%] h-5 bg-blue-400 "></div>
    </form>
  );
}

const Label = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="dark:text-dark-subtle text-light-subtle font-semibold"
    >
      {children}
    </label>
  );
};
