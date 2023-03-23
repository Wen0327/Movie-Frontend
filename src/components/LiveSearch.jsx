import React, { forwardRef, useEffect, useRef, useState } from "react";
import { commonInputClasses } from "../utils/theme";



export default function LiveSearch({
  defaultValue = "",
  placeholder = "",
  results = [],
  name,
  selectedResultStyle,
  containerStyle,
  inputStyle,
  renderItem = null,
  onChange = null,
  onSelect = null,
}) {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);

  const handleOnFocus = () => {
    if (results.length) setDisplaySearch(true);
  };

  const closeSearch = () => {
    setDisplaySearch(false);
    setFocusIndex(-1);
  };

  const handleOnBlur = () => {
    closeSearch();
  };

  const handleSelection = (selectedItem) => {
    onSelect(selectedItem);
  };

  const handleKeyDown = ({ key }) => {
    let nextCount;
    const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape"];

    if (!keys.includes(key)) return;

    // move selections up and down
    if (key === "ArrowDown") {
      nextCount = (focusIndex + 1) % results.length;
    }

    if (key === "ArrowUp") {
      nextCount = (focusIndex + results.length - 1) % results.length;
    }

    if (key === "Enter") return handleSelection(results[focusIndex]);

    setFocusIndex(nextCount);
  };

  const getInputStyle = () => {
    return inputStyle
      ? inputStyle
      : commonInputClasses + " border-2 rounded p-1 text-lg";
  };
  return (
    <div className="relative outline-none">
      <input
        type="text"
        id={name}
        name={name}
        className={getInputStyle()}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      <SearchResults
        focusIndex={focusIndex}
        visible={displaySearch}
        results={results}
        onSelect={handleSelection}
        renderItem={renderItem}
        containerStyle={containerStyle}
        selectedResultStyle={selectedResultStyle}
      />
    </div>
  );
}

const SearchResults = ({
  visible,
  results = [],
  focusIndex,
  onSelect,
  renderItem,
  containerStyle,
  selectedResultStyle,
}) => {
  const resultContainer = useRef();

  useEffect(() => {
    resultContainer.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [focusIndex]);

  if (!visible) return null;
  return (
    <div className="absolute z-50 right-0 left-0 top-10 bg-white dark:bg-secondary shadow-md p-2 max-h-64 space-y-2 mt-1 overflow-auto custom-scroll-bar">
      {results.map((result, index) => {
        const getSelectedClass = () => {
          return selectedResultStyle
            ? selectedResultStyle
            : "dark:bg-dark-subtle bg-light-subtle";
        };

        return (
          <ResultCard
            ref={index === focusIndex ? resultContainer : null}
            key={index.toString()}
            item={result}
            renderItem={renderItem}
            containerStyle={containerStyle}
            selectedResultStyle={index === focusIndex ? getSelectedClass() : ""}
            onMouseDown={() => onSelect(result)}
          />
        );
      })}
    </div>
  );
};

const ResultCard = forwardRef((props, ref) => {
  const { item, renderItem, containerStyle, selectedResultStyle, onMouseDown } =
    props;

  const getClasses = () => {
    if (containerStyle) return containerStyle + " " + selectedResultStyle;

    return (
      selectedResultStyle +
      " cursor-pointer rounded overflow-hidden dark:hover:bg-dark-subtle hover:bg-light-subtle transition "
    );
  };
  return (
    <div onMouseDown={onMouseDown} ref={ref} className={getClasses()}>
      {renderItem(item)}
    </div>
  );
});
