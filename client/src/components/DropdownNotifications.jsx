import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Transition from "../utils/Transition";
import { FiBell } from "react-icons/fi";

function DropdownNotifications({ align = "right" }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // Example notifications (replace with API data later)
  const notifications = [
    {
      id: 1,
      message: "New order #2487 has been placed",
      icon: "🛒",
      date: "Aug 28, 2025",
    },
    {
      id: 2,
      message: "System maintenance scheduled at 2:00 AM",
      icon: "⚙️",
      date: "Aug 27, 2025",
    },
    {
      id: 3,
      message: "You have 3 unread support tickets",
      icon: "📩",
      date: "Aug 25, 2025",
    },
  ];

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close on ESC
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative inline-flex">
      {/* Trigger */}
      <button
        ref={trigger}
        className={`w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-blue-700/50 rounded-full ${dropdownOpen && "bg-gray-200 dark:bg-gray-800"}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Notifications</span>
        <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        {notifications.length > 0 && (
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
        )}
      </button>

      {/* Dropdown */}
     <Transition
  className={`origin-top-right z-10 absolute top-full w-56 sm:w-80 max-w-[90vw] 
              bg-white dark:bg-gray-800 border border-gray-200 
              dark:border-gray-700 py-1.5 shadow-lg mt-1 
              ${align === "right" ? "right-0" : "left-0"}`}
  show={dropdownOpen}
  enter="transition ease-out duration-200 transform"
  enterStart="opacity-0 -translate-y-2"
  enterEnd="opacity-100 translate-y-0"
  leave="transition ease-in duration-150"
  leaveStart="opacity-100"
  leaveEnd="opacity-0"
>

        <div ref={dropdown}>
          <div className="text-xs font-semibold text-gray-500 uppercase pt-1.5 pb-2 px-4">
            Notifications
          </div>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <li
                  key={n.id}
                  className="border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <Link
                    to="#"
                    className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-700/20"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span className="block text-sm mb-1">
                      {n.icon}{" "}
                      <span className="font-medium text-gray-800 dark:text-gray-100">
                        {n.message}
                      </span>
                    </span>
                    <span className="block text-xs text-gray-400 dark:text-gray-500">
                      {n.date}
                    </span>
                  </Link>
                </li>
              ))
            ) : (
              <li className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                No new notifications
              </li>
            )}
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownNotifications;
