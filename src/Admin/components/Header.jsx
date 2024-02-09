import React from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';
import { IoMdMoon, IoMdSunny, IoMdHelp } from "react-icons/io";
import { FaUserEdit, FaUserAstronaut} from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FiAlignJustify, FiLogOut } from "react-icons/fi";
import {
  Navbar as MaterialNavbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";

const Header = ({ onToggleSidebar }) => {

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const profileMenuItems = [
    {
      label: "User name",
      icon: FaUserAstronaut,
    },
    {
      label: "Edit Profile",
      icon: FaUserEdit,
    },
    {
      label: "Help",
      icon: IoMdHelp,
    },
    {
      label: "Sign Out",
      icon: FiLogOut,
    },
  ];

  return (
    <header>
      <MaterialNavbar className={`max-w-full mx-auto px-2 duration-300 ease-linear sm:px-6 lg:px-8 bg-gray-900 border-0 shadow-lg dark:bg-gray-50`}>
        <div className={`relative flex h-16 items-center justify-between text-stone-300 dark:text-black`}>
          <div className="flex flex-1 items-center justify-center xl:items-stretch xl:justify-start">
            {/* Sidebar open when phone or tablet*/}
            <div className="lg:hidden xl:hidden  absolute top-0 left-0 ml-4">
              <Button
                variant="text"
                className="p-2"
                onClick={onToggleSidebar}
              >                
                  <FiAlignJustify className="mx-auto h-8 w-8 text-white dark:text-black" />
              </Button>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {/* Dark mode switch */}
            <label className="flex items-center gap-x-2 cursor-pointer">
              {isDarkMode ? <IoMdMoon className="w-5 h-5" style={{ marginRight: '8px' }} /> : <IoMdSunny className="w-5 h-5" style={{ marginRight: '8px' }} />}
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                className="hidden"
              />
            </label>

            <div className="flex items-center gap-x-2 p-1">
              <IoNotifications className="w-5 h-5" />
            </div>

            <div className="flex items-center gap-x-1 ml-auto justify-end">

              <div className="ml-3">
                {/* Profile avatar */}
                <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                  <MenuHandler>
                    <Button
                      variant="text"
                      color="blue-gray"
                      className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                      <Avatar
                        variant="circular"
                        alt="Your Name"
                        className="border border-gray-900 p-0.5 rounded-full"
                        style={{ width: '40px', height: '40px' }}
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                      />
                    </Button>
                  </MenuHandler>
                  {/* Profile menu */}
                  {isMenuOpen && (
                    <MenuList className="p-1 space-y-2 border-0 font-medium bg-zinc-700 dark:bg-neutral-100 text-stone-100 dark:text-stone-900">
                      {profileMenuItems.map(({ label, icon }, key) => (
                        <MenuItem
                          key={label}
                          className={`flex items-center gap-2 rounded ${key === profileMenuItems.length - 1
                            ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                            : ""
                            }`}
                        >
                          {React.createElement(icon, {
                            className: `h-4 w-4 ${key === profileMenuItems.length - 1 ? "text-red-500" : ""
                              }`,
                            strokeWidth: 2,
                          })}
                          <Typography
                            as="span"
                            variant="small"
                            className="font-normal"
                            color={
                              key === profileMenuItems.length - 1 ? "red" : "inherit"
                            }
                          >
                            {label}
                          </Typography>
                        </MenuItem>
                      ))}
                    </MenuList>
                  )}
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </MaterialNavbar>
    </header>
  );
};

export default Header;
