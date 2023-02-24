import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "../../hook";
import Container from "../Container";

export default function Navbar() {
  const { toggleTheme } = useTheme();
  const { authInfo,handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;

  return (
    <div className="bg-secondary shadow-sm shadow-gray-500">
      <Container className="p-2">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="./logo.png" alt="" className="h-10"></img>
          </Link>

          <ul className="flex items-center space-x-4">
            <li>
              <button
                onClick={toggleTheme}
                className="bg-dark-subtle  p-1 rounded"
              >
                <BsFillSunFill
                  id="BsFillSunFill"
                  className=" text-yellow-400 dark:text-white"
                  size={24}
                />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle p-1 rounded bg-transparent outline-none text-lg 
                         focus:border-white transition text-white"
                placeholder="Search..."
              ></input>
            </li>
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="text-white font-semibold text-lg">Log out</button>
              ) : (
                <Link
                  className="text-white font-semibold text-lg"
                  to="/auth/SignIn"
                >
                  Log In
                </Link>
              )}
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
