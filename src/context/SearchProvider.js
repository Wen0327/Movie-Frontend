import React, { createContext, useEffect } from "react";
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
  const [searching, setSearching] = useEffect(false);
  const [results, setResults] = useEffect([]);
  const [resultNotFound, setResultNotFound] = useEffect(false);

  const { updateNotification } = useNotification();

  const search = async (method, query) => {
    const { error, results } = await method(query);
    if (error) {
      return updateNotification("error", error);
    }

    if (!results.length) {
      return setResultNotFound(true);
    }

    setResults(results);
  };

  const debounceFunc = debounce(search, 300);

  const handleSearch = (method, query) => {
    setSearching(true);
    if (!query.trim()) {
      setSearching(false);
      setResults([]);
      setResultNotFound(false);
    }

    debounceFunc(method, query);
  };

  return (
    <SearchContext.Provider
      value={(handleSearch, searching, resultNotFound, results)}
    >
      {children}
    </SearchContext.Provider>
  );
}
