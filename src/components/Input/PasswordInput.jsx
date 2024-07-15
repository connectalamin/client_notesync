import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const PasswordInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <div className="mb-4 relative">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="password"
      >
        Password
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        value={value}
        onChange={onChange}
        type={showPassword ? 'text' : 'password'}
        placeholder="********"
      />
      <button
        onClick={handlePassword}
        className="absolute right-0 top-7 mt-[10px] mr-3 text-gray-600 hover:text-gray-900 text-lg"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

export default PasswordInput;
