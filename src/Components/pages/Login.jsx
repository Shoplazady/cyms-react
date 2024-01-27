import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

  return (
    <main className="min-h-screen flex items-center justify-center">
      {/* Login form*/}
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:mt-16 lg:py-0 mb-8">
        <div class="w-full max-w-md bg-stone-900 rounded-lg shadow-lg dark:bg-white border-gray-200 sm:w-full">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <img
              src={require("../../components/images/logo_full.png")}
              alt="CYMS Logo"
              style={{ width: "400px", height: "auto" }}
            />
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-white dark:text-gray-900">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`bg-stone-800 text-stone-100 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black`}
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-200 dark:text-gray-800">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`bg-stone-800 text-stone-100 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-100 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black`}
                  required
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className={`w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800`}
                      required
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="remember" class="text-gray-200 dark:text-gray-800">Remember me</label>
                  </div>
                </div>
                <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
              </div>
              <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
              <p class="text-sm font-medium text-gray-200 dark:text-gray-800">
                Don’t have an account yet? <Link to="/register" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;