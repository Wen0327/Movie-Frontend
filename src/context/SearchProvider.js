import React, { createContext, useEffect, useState } from "react";
import { useNotification } from "../hook";

export const SearchContext = createContext();

let timeoutId;
const debounce = (func, delay) => {
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

export default function SearchProvider({ children }) {
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);

  const { updateNotification } = useNotification();

  const search = async (method, query, updateFunc) => {
    const { error, results } = await method(query);
    if (error) {
      return updateNotification("error", error);
    }

    if (!results.length) {
      return setResultNotFound(true);
    }

    setResults(results);
    updateFunc([...results]);
  };

  const debounceFunc = debounce(search, 300);

  const handleSearch = (method, query, updateFunc) => {
    setSearching(true);
    if (!query.trim()) {
      updateFunc([]);
      resetSearch();
    }

    debounceFunc(method, query, updateFunc);
  };

  const resetSearch = () => {
    setSearching(false);
    setResults([]);
    setResultNotFound(false);
  };

  return (
    <SearchContext.Provider
      value={{ handleSearch, resetSearch, searching, resultNotFound, results }}
    >
      {children}
    </SearchContext.Provider>
  );
}
