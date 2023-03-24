import React from "react";
import { ImSpinner3 } from "react-icons/im";

export default function Submit({ value, busy, type, onClick }) {
  return (
    <button
      type={ type ||"submit"}
      className="w-full rounded dark:bg-white bg-secondary hover:bg-opacity-90 transition text-lg dark:text-secondary text-white cursor-pointer selection:font-semibold h-10 flex items-center justify-center"
      onClick={onClick}
    >
      {busy ? <ImSpinner3 className="animate-spin " /> : value}
    </button>
  );
}
