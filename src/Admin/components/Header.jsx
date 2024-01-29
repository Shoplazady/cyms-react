import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../hooks/useDarkMode';
import { IoMdMoon, IoMdSunny, IoMdHelp } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FiAlignJustify, FiArrowUp, FiLogOut } from "react-icons/fi";
import {
  Navbar as MaterialNavbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import Logo from '../../components/images/logo.png';

const Header = ({ onToggleSidebar, sidebarOpen }) => {

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const profileMenuItems = [
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
      <MaterialNavbar className={`mx-auto px-2 sm:px-6 lg:px-8 bg-stone-900 border-0 shadow-lg dark:bg-stone-200`}>
        <div className={`relative flex h-16 items-center justify-between text-stone-300 dark:text-black`}>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Sidebar open when phone or tablet*/}
            <div className="lg:hidden xl:hidden md:hidden absolute top-0 left-0 ml-4">
              <IconButton
                variant="text"
                className="p-2"
                ripple={false}
                onClick={onToggleSidebar}
              >
                {sidebarOpen ? (
                  <FiArrowUp className="h-8 w-8 text-white dark:text-black " />
                ) : (
                  <FiAlignJustify className="mx-auto h-8 w-8 text-white dark:text-black" />
                )}
              </IconButton>
            </div>
            <div className="flex flex-shrink-0 items-center">
              <Link to="/">
                <img src={Logo} alt="CYMS Logo" style={{ width: "40px", height: "40px" }} />
              </Link>
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
                    <MenuList className={`p-1 ${isDarkMode ? 'bg-neutral-100 text-stone-800' : 'bg-zinc-700 text-stone-100'}`}>
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
