import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../useAuth';
import { useAlert } from '../../Admin/components/AlertContext';

const Login = () => {

  const { showAlert } = useAlert();

  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Send login request to your server
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Login failed with status ${response.status}: ${errorMessage}`);
      }

      const userData = await response.json();

      // Remember the user only if the "Remember Me" checkbox is checked
      if (rememberMe) {
        // Save the user data to localStorage
        localStorage.setItem('rememberedUser', JSON.stringify(userData));
      }

      // Update the auth context with the user data
      login(userData);

      // Show success alert
      showAlert('success', 'Login successful.');

      // Navigate to the home page or any desired page
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.message);

      // Show error alert
      showAlert('error', 'Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:mt-16 lg:py-0 mb-8">
      <div className="w-full max-w-md bg-stone-900 rounded-lg shadow-lg dark:bg-white border-gray-200 sm:w-full">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <img
            src={require("../../Components/images/logo_full.png")}
            alt="CYMS Logo"
            style={{ width: "400px", height: "auto" }}
          />
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-gray-900">Your email</label>
              <input
                type="email"
                name="email"
                id="email"
                className={`bg-stone-800 text-stone-100 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black`}
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-200 dark:text-gray-800">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className={`bg-stone-800 text-stone-100 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className={`w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800`}
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-200 dark:text-gray-800">Remember me</label>
                </div>
              </div>
              <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
            </div>
            <button
              type="button" // Prevent the form submission for now
              onClick={handleLogin}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign in
            </button>
            <p className="text-sm font-medium text-gray-200 dark:text-gray-800">
              Don’t have an account yet? <Link to="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
