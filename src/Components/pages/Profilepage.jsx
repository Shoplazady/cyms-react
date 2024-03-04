import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { useAuth } from '../useAuth';
import { useAlert } from "../../Admin/components/AlertContext";

const Profilepage = () => {

  const { user } = useAuth();
  const { showAlert } = useAlert();

  const [userData, setUserData] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [agencies, setAgencies] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user || !user.id) {
          console.error('User is null or user.id is undefined');
          return;
        }

        const response = await fetch(`http://localhost:3001/api/admin/getuser/${user.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const userData = await response.json();
        setUserData(userData);
        console.log(userData);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    const fetchAgenciesForSelectOptions = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user/agency/options');
        if (response.ok) {
          const data = await response.json();
          setAgencies(data.agency);
        } else {
          console.error('Failed to fetch agencies for select options:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching agencies for select options:', error);
      }
    };

    const fetchPositionsForSelectOptions = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/inspector/job/options');
        if (response.ok) {
          const data = await response.json();
          setPositions(data.jobs);
        } else {
          console.error('Failed to fetch positions for select options:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching positions for select options:', error);
      }
    };

    // Fetch data when user changes
    if (user) {
      fetchUserData();
      fetchAgenciesForSelectOptions();
      fetchPositionsForSelectOptions();
    }

  }, [user]);

  useEffect(() => {
    
    const defaultPosition = { value: userData?.position || '', label: userData?.position || 'Select an option...' };
    const defaultAgency = { value: userData?.agency || '', label: userData?.agency || 'Select an option...' };

    setSelectedPosition(defaultPosition);
    setSelectedAgency(defaultAgency);

  }, [userData]);


  const handleInputChange = (e) => {
    // Update the user state when input fields change
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission here, e.g., update user data, change password, etc.
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    // Handle the file upload logic here
    // You may want to use FormData to send the file to your server
    // Example:
    // const formData = new FormData();
    // formData.append('profilePicture', file);
    // then send the formData to your server
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-4 gap-4 flex item-center justify-center space-x-2 flex-col md:flex-row  flex-wrap bg-gray-700 dark:bg-gray-100 w-auto ">

        {/* Left side with user pic */}
        <div className="flex flex-col items-center p-6 w-96 bg-gray-800 dark:bg-white rounded-lg">
          <div className="flex flex-col justify-center items-center pt-16">
            <label className="mb-1 text-5xl font-medium dark:text-gray-900 text-white pb-4">Profile</label>
            <img className="rounded-full w-40 h-40" src={userData.picture_path || 'uploads/user_pic/avatar.png'} alt="profile image" />
            {/* Replace the static label with an input file */}
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={(e) => handleProfilePictureChange(e)}
              className="text-sm dark:text-gray-900 text-white p-2.5 bg-gray-700 border border-gray-600 rounded-lg mt-2"
            />
          </div>
        </div>

        {/* Right side with user data */}
        <div className="flex w-auto max-w-md min-w-96 pr-2 ">
          <div className="w-full dark:bg-white border dark:border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700 ">
            <div className="flex flex-col justify-center p-6 ">
              <h1 className="mb-1 text-2xl font-medium dark:text-gray-900 text-white">User data</h1>
              <form onSubmit={handleSubmit}>


                {/* First row */}
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div className="">
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white pr-2">First Name</label>
                    <input
                      type="text"
                      id="first_name"
                      value={userData?.first_name || ''}
                      onChange={handleInputChange}
                      className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="">
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white pr-2">Last Name</label>
                    <input
                      type="text"
                      id="last_name"
                      value={userData?.last_name || ''}
                      onChange={handleInputChange}
                      className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg  w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                {/* Second row */}
                <div className="grid gap-6 mb-6 md:grid-cols-1">
                  <div className="">
                    <label htmlFor="tel_num" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white pr-2">Tel Number</label>
                    <input
                      type="tel"
                      id="phone"
                      value={userData?.tel_num || ''}
                      onChange={handleInputChange}
                      className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                      placeholder="123-456-789"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div className="">
                    <label htmlFor="job_position" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white pr-2">Job Position</label>
                    <Select
                      options={positions.map((position) => ({ value: position.job_name, label: position.job_name }))}
                      onChange={(selected) => setSelectedPosition(selected)}
                      value={selectedPosition}
                      placeholder="Select a position..."
                    />
                  </div>
                  <div className="">
                    <label htmlFor="agency" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white pr-2">Agency</label>
                    <Select
                      options={agencies.map((agency) => ({ value: agency.cat_name, label: agency.cat_name }))}
                      onChange={(selected) => setSelectedAgency(selected)}
                      value={selectedAgency}
                      placeholder="Select an agency..."
                    />
                  </div>
                </div>

                {/* Third row */}
                <div className="grid gap-6 mb-6 md:grid-cols-1">
                  <div className="">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white pr-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={userData?.email || ''}
                      onChange={handleInputChange}
                      className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                      placeholder="john.doe@company.com"
                      required
                    />
                  </div>
                </div>

                {/* Change Password */}
                <h1 className="mb-1 text-2xl font-medium dark:text-gray-900 text-white">Change Password</h1>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div className="">
                    <label htmlFor="old_password" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white pr-2">Old Password</label>
                    <input
                      type="password"
                      id="password"
                      value={userData?.password || ''}
                      onChange={handleInputChange}
                      className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                      placeholder="•••••••••"
                      required
                    />
                  </div>
                  <div className="">
                    <label htmlFor="new_password" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white pr-2">New Password</label>
                    <input type="password" id="new_password" className="dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 text-white"
                      value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="grid gap-6 mb-6 md:grid-cols-1">
                  <div className="">
                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white pr-2">Confirm Password</label>
                    <input type="password" id="confirm_password" className="dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 text-white" required
                      value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </div>
                </div>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
