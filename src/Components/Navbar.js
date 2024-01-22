// Navbar.js
import React, { useState } from "react";
import { IoMdMoon, IoMdSunny, IoIosCreate, IoMdHelp } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaListOl, FaUserEdit } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FiAlignJustify, FiArrowUp, FiChevronDown, FiChevronUp, FiUser, FiLogOut } from "react-icons/fi";
import {
    Navbar as MaterialNavbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Card,
} from "@material-tailwind/react";

const Navbar = () => {
    const [openNav, setOpenNav] = React.useState(false);
    const [isDarkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!isDarkMode);
    };

    //Profile menu

    const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const profileMenuItems = [
        {
            label: "My Profile",
            icon: FiUser,
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

    React.useEffect(() => {
        // Implement logic to set dark mode in your application (e.g., apply dark theme classes to the body)
        if (isDarkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [isDarkMode]);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const navList = (
        <ul className={`mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 max-w-screen-xl mx-auto ${isDarkMode ? 'text-stone-800' : 'text-stone-200'}`}>
            {/* Add your navigation links here */}
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <IoIosCreate />

                <a href="#" className="flex items-center">
                    Create
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <FaCartShopping />
                <a href="#" className="flex items-center">
                    Order list
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <FaListOl />
                <a className="flex items-center">
                    Order Status
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <IoNotifications />

                <a href="#" className="flex items-center">
                    Log in
                </a>
            </Typography>
        </ul>
    );

    return (
        <MaterialNavbar className={`mx-auto px-4 py-2 lg:px-8 lg:py-4 ${isDarkMode ? 'bg-stone-100' : 'bg-stone-800'}`}>
            <div className={`container mx-auto max-w-screen-xl flex items-center justify-between ${isDarkMode ? 'text-stone-800' : 'text-stone-200'}`}>
                {/* Add your logo or site name */}
                <Typography
                    as="a"
                    href="#"
                    className="mr-4 cursor-pointer py-1.5 font-large"
                >
                    CYMS
                </Typography>
                <div className="hidden lg:block">{navList}</div>
                <div className="flex items-center gap-x-1 ml-auto lg:ml-0 justify-end">
                    {/* Dark mode switch */}
                    <label className="flex items-center cursor-pointer">
                        {isDarkMode ? <IoMdMoon /> : <IoMdSunny />}
                        <input
                            type="checkbox"
                            checked={isDarkMode}
                            onChange={toggleDarkMode}
                            className="hidden"
                        />
                    </label>
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
                                    {isMenuOpen ? <FiChevronUp /> : <FiChevronDown />}
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
                <IconButton
                    variant="text"
                    className="lg:hidden h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <FiArrowUp />
                    ) : (
                        <FiAlignJustify />
                    )}
                </IconButton>
            </div>
            <MobileNav open={openNav}>
                <div className={`container mx-auto ${isDarkMode ? 'bg-stone-100' : 'bg-stone-800'}`}>{navList}</div>
            </MobileNav>
        </MaterialNavbar>
    );
};

export default Navbar;
