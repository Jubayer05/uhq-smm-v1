import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Transition from "../utils/Transition";

function ModalSearch({ id, searchId, modalOpen, setModalOpen }) {
  const modalContent = useRef(null);
  const searchInput = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalOpen || modalContent.current.contains(target)) return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    modalOpen && searchInput.current.focus();
  }, [modalOpen]);

  // Example custom data (replace with API later)
  const recentSearches = ["React Components", "Node.js APIs", "Tailwind Layouts"];
  const recentPages = ["Dashboard", "Profile Settings"];

  return (
    <>
      {/* Backdrop */}
      <Transition
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        show={modalOpen}
        enter="transition-opacity ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition-opacity ease-in duration-150"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      />

      {/* Modal */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 flex items-start justify-center mt-24 px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl max-w-xl w-full"
        >
          {/* Search input */}
          <form className="border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <input
                id={searchId}
                ref={searchInput}
                type="search"
                className="w-full px-12 py-3 text-gray-900 dark:text-gray-100 bg-transparent border-0 focus:ring-0 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Search here..."
                style={{paddingLeft: "40px"}}
              />
              <button
                className="absolute inset-y-0 left-3 flex items-center"
                type="submit"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </form>

          {/* Recent searches */}
          <div className="p-4">
            {recentSearches.length > 0 && (
              <div className="mb-3">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  Recent Searches
                </div>
                <ul className="space-y-1">
                  {recentSearches.map((item, i) => (
                    <li key={i}>
                      <Link
                        to="#"
                        className="block px-3 py-2 rounded-lg text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setModalOpen(false)}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {recentPages.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  Recent Pages
                </div>
                <ul className="space-y-1">
                  {recentPages.map((page, i) => (
                    <li key={i}>
                      <Link
                        to="#"
                        className="block px-3 py-2 rounded-lg text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setModalOpen(false)}
                      >
                        {page}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Transition>
    </>
  );
}

export default ModalSearch;
