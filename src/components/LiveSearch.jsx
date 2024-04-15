import React, { forwardRef, useEffect, useRef, useState } from "react";
import { commonInputClasses } from "../utils/theme";

export default function LiveSearch({
  value = "",
  placeholder = "",
  results = [],
  name,
  resultresultContainerStyle,
  selectedResultStyle,
  resultContainerStyle,
  inputStyle,
  renderItem = null,
  onChange = null,
  onSelect = null,
  visible,
}) {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [defaultValue, setDefaultValue] = useState("");

  const handleOnFocus = () => {
    if (results.length) setDisplaySearch(true);
  };

  const closeSearch = () => {
    setDisplaySearch(false);
    setFocusIndex(-1);
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      closeSearch();
    }, 100);
  };

  const handleSelection = (selectedItem) => {
    if (selectedItem) {
      onSelect(selectedItem);
    }
    closeSearch();
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

    if (key === "Escape") return closeSearch();

    if (key === "Enter") return handleSelection(results[focusIndex]);

    setFocusIndex(nextCount);
  };

  const getInputStyle = () => {
    return inputStyle
      ? inputStyle
      : commonInputClasses + " border-2 rounded p-1 text-lg";
  };

  const handleChange = (e) => {
    setDefaultValue(e.target.value);
    onChange && onChange(e);
  };

  useEffect(() => {
    if (value) setDefaultValue(value);
  }, [value]);

  useEffect(() => {
    if (visible) return setDisplaySearch(visible);

    setDisplaySearch(false);
  }, [visible]);

  return (
    <div className="relative outline-none">
      <input
        autoComplete="off"
        type="text"
        id={name}
        name={name}
        className={getInputStyle()}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
        value={defaultValue}
        onChange={handleChange}
      />
      <SearchResults
        focusIndex={focusIndex}
        visible={displaySearch}
        results={results}
        onSelect={handleSelection}
        renderItem={renderItem}
        resultContainerStyle={resultContainerStyle}
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
  resultContainerStyle,
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
            // ref={index === focusIndex ? resultContainer : null}
            key={index.toString()}
            item={result}
            renderItem={renderItem}
            resultContainerStyle={resultContainerStyle}
            selectedResultStyle={index === focusIndex ? getSelectedClass() : ""}
            onMouseDown={() => onSelect(result)}
          />
        );
      })}
    </div>
  );
};

const ResultCard = forwardRef((props, ref) => {
  const {
    item,
    renderItem,
    resultContainerStyle,
    selectedResultStyle,
    onMouseDown,
  } = props;

  const getClasses = () => {
    if (resultContainerStyle)
      return resultContainerStyle + " " + selectedResultStyle;

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
