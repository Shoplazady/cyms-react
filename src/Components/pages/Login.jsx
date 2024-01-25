import React, { useState } from 'react';
import { Label, TextInput, Checkbox, Button } from 'flowbite-react';

const Login = ({ darkMode, toggleDarkMode }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login logic goes here');
  };
  return (
    <div>
      <h1>Login Page</h1>
      {/* Login form*/}
      <form className={`flex max-w-md flex-col gap-4 ${darkMode ? 'dark' : ''}`} onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Login;