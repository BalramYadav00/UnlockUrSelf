import React from "react";
import { Link } from "react-router-dom";
import logo2 from "../images/logo2.png";
function Landingnav() {
  return (
    <nav class="bg-[#2DAA90] border-gray-200 px-2 sm:px-4 py-2.5">
      <div class="container flex flex-wrap items-center justify-between px-28 mx-auto">
        <Link to="/landing">
          <div class="flex items-center">
            <img src={logo2} class="h-6 mr-3 sm:h-9" alt="UnlockUrSelf Logo" />
            <span class="self-center text-xl text-white font-semibold whitespace-nowrap dark:text-white">
              UnlockUrSelf
            </span>
          </div>
        </Link>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="flex flex-col p-4 mt-4 border text-white rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  ">
            {localStorage.getItem("token") ? (
              <li>
                <Link
                  to="/"
                  class="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  class="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Login/Register
                </Link>
              </li>
            )}

            {/* <li>
              <Link
                href="#"
                class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#"
                class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Services
              </Link>
            </li> */}
            <li>
              <Link
                to="/blogs"
                class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0"
              >
                Blog's
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Landingnav;
