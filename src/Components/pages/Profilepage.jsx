import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { Button } from '@material-tailwind/react';
import { useAuth } from '../useAuth';
import { useAlert } from "../../Admin/components/AlertContext";
import Esignature from "../modal/EsignatureModal";

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
  const [profilePicture, setProfilePicture] = useState(null);

  const [signatureModalOpen, setSignatureModalOpen] = useState(false);

  const opensignatureModal = () => setSignatureModalOpen(true);
  const closeSignatureModal = () => setSignatureModalOpen(false);

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
        console.log('User Data:', userData);


      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    const fetchAgenciesAndPositions = async () => {
      try {
        const [agenciesResponse, positionsResponse] = await Promise.all([
          fetch('http://localhost:3001/api/user/agency/options'),
          fetch('http://localhost:3001/api/inspector/job/options'),
        ]);

        if (agenciesResponse.ok) {
          const agenciesData = await agenciesResponse.json();
          setAgencies(agenciesData.agency);
        } else {
          console.error('Failed to fetch agencies for select options:', agenciesResponse.statusText);
        }

        if (positionsResponse.ok) {
          const positionsData = await positionsResponse.json();
          setPositions(positionsData.jobs);
        } else {
          console.error('Failed to fetch positions for select options:', positionsResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching agencies and positions for select options:', error);
      }
    };

    // Fetch data when user changes
    if (user && user.id) {
      fetchUserData();
      fetchAgenciesAndPositions();
    }

  }, [user]);

  useEffect(() => {
    const defaultPosition = { value: userData?.position || '', label: userData?.position || 'Select an option...' };
    const defaultAgency = { value: userData?.agency || '', label: userData?.agency || 'Select an option...' };

    setSelectedPosition(defaultPosition);
    setSelectedAgency(defaultAgency);

  }, [userData]);

  const handleInputChange = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleEditProfile = async () => {
    try {
      const requestBody = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        tel_num: userData.tel_num,
        job_position: selectedPosition?.value || '',
        agency: selectedAgency?.value || '',
        email: userData.email,
        new_password: newPassword,
        confirmPassword: confirmPassword,
      };

      const editProfileResponse = await fetch(`http://localhost:3001/api/user/editprofile/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!editProfileResponse.ok) {
        throw new Error(`Failed to update profile data: ${editProfileResponse.statusText}`);
      }

      showAlert('success', 'Profile data updated successfully');
    } catch (error) {
      showAlert('error', `Error updating profile data: ${error.message}`);
    }
  };


  const handleEditProfilePicture = async () => {
    try {
      const formData = new FormData();
      formData.append('profilePic', profilePicture);

      const response = await fetch(`http://localhost:3001/api/user/editprofileimages/${user.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile picture: ${response.statusText}`);
      }

      showAlert('success', 'Profile picture updated successfully');
    } catch (error) {
      showAlert('error', `Error updating profile picture: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-4 gap-4 flex item-center justify-center space-x-2 flex-col md:flex-row  flex-wrap bg-gray-700 dark:bg-gray-100 w-auto ">
        {/* Left side with user pic */}
        <div className="flex flex-col items-center p-6 w-96 bg-gray-800 dark:bg-white rounded-lg">
          <div className="flex flex-col justify-center items-center pt-16">
            <label className="mb-1 text-5xl font-medium dark:text-gray-900 text-white pb-4">Profile</label>
            <img className="rounded-full w-40 h-40" src={userData.picture_path || 'uploads/user_pic/avatar.png'} alt="profileuser" />
            <form>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="text-sm dark:text-gray-900 text-white p-2.5 bg-gray-700 dark:bg-gray-200 border border-gray-600 dark:border-gray-300 rounded-lg mt-2"
              />
            </form>
            <Button onClick={handleEditProfilePicture} className="text-white bg-yellow-500 py-2 px-4 rounded-lg mt-2">
              Change profile
            </Button>


            <Button onClick={opensignatureModal} className="text-white bg-green-700 py-2 px-4 rounded-lg mt-4">
              Add E-Signature
            </Button>


          </div>
          <Esignature open={signatureModalOpen} onClose={closeSignatureModal} userId={userData.id} />
        </div>
        {/* Right side with user data */}
        <div className="flex w-auto max-w-md min-w-96 pr-2 ">
          <div className="w-full dark:bg-white border dark:border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700 ">
            <div className="flex flex-col justify-center p-6 ">
              <h1 className="mb-1 text-2xl font-medium dark:text-gray-900 text-white">User data</h1>
              <form>
                {/* First row */}
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
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
                  <div>
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
                  <div>
                    <label htmlFor="tel_num" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white pr-2">Tel Number</label>
                    <input
                      type="tel"
                      id="tel_num"
                      value={userData?.tel_num || ''}
                      onChange={handleInputChange}
                      className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-900"
                      placeholder="123-456-789"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="job_position" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white pr-2">Job Position</label>
                    <Select
                      options={positions.map((position) => ({ value: position.job_name, label: position.job_name }))}
                      onChange={(selected) => setSelectedPosition(selected)}
                      value={selectedPosition}
                      placeholder="Select a position..."
                    />
                  </div>
                  <div>
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
                  <div>
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
                <div className="grid gap-6 mb-6 md:grid-cols-1">
                  <div>
                    <label htmlFor="new_password" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white pr-2">New Password</label>
                    <input type="password" id="new_password" className="dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 text-white"
                      value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  </div>
                </div>
                {/* Confirm Password */}
                <div className="grid gap-6 mb-6 md:grid-cols-1">
                  <div>
                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white pr-2">Confirm Password</label>
                    <input type="password" id="confirm_password" className="dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 text-white" required
                      value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </div>
                </div>
              </form>
              <Button onClick={handleEditProfile} className="text-white bg-blue-500 py-2 px-4 rounded-lg mt-4">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
