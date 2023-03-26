import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { useTheme } from "../../hook";

export default function Header({onAddMovieClick,onAddActorClick}) {
  // toggle
  const [showOptions, setShowOptions] = useState(false);
  const { toggleTheme } = useTheme();
  const options = [
    { title: "Add Movie", onClick: onAddMovieClick },
    { title: "Add Actor", onClick: onAddActorClick },
  ];

  return (
    <div className="flex items-center justify-between relative">
      {/* search bar */}
      <input
        type="text"
        className="border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary  dark:text-white transition bg-transparent rounded text-lg p-1 outline-none"
        placeholder="Search movies..."
      ></input>
      {/* toggle */}

      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="dark:text-white text-light-subtle"
        >
          <BsFillSunFill size={24} />
        </button>
        <button
          onClick={() => setShowOptions(true)}
          className="flex items-center space-x-2 dark:border-dark-subtle border-light-subtle border-secondary  text-secondary hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3 py-1 dark:text-white text-light-subtle"
        >
          <span>Create</span>
          <AiOutlinePlus />
        </button>

        <CreateOptions
          visible={showOptions}
          onClose={() => setShowOptions(false)}
          options={options}
        />
      </div>
    </div>
  );
}

const CreateOptions = ({ options, visible, onClose }) => {
  // toggle
  const container = useRef();
  const containerID = "option-container";

  useEffect(() => {
    const handleClose = (e) => {
      if (!visible) return;
      const { parentElement, id } = e.target;

      //   not close when click Option's items
      if (parentElement.id === containerID || id === containerID) return;

      //   close when click outside
      if (container.current) {
        if (!container.current.classList.contains("animate-scale"))
          container.current.classList.add("animate-scale-reverse");
      }
    };

    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [visible]);

  const handleAnimationEnd = (e) => {
    if (e.target.classList.contains("animate-scale-reverse")) onClose();
    e.target.classList.remove("animate-scale");
  };

  // auto close the option when click a fn
  const handleClick = (fn)=>{
    fn()
    onClose()
  }

  if (!visible) return null;

  return (
    <div
      id={containerID}
      ref={container}
      className="absolute right-0 top-12 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded animate-scale"
      onAnimationEnd={handleAnimationEnd}
    >
      {options.map(({ title, onClick }) => {
        return <Option onClick={()=> handleClick(onClick) }>{title}</Option>;
      })}
    </div>
  );
};

const Option = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="dark:text-white text-secondary hover:opacity-80 transition"
    >
      {children}
    </button>
  );
};
