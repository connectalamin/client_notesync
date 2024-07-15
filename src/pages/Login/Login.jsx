import React, { useState } from 'react';
import Navbar from './../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';
import toast from 'react-hot-toast';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    // Add this console log

    if (!validateEmail(email) || password.length < 6) {
      setError('Invalid email or password');
      return;
    }
    setError('');

    //Login Api
    try {
      const response = await axiosInstance.post('/api/login', {
        email,
        password,
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        toast.success('Logged in successfully!');

        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.'); // Add this console log

      setError('Something went wrong, please try again');
    }
  };
  return (
    <>
      <Navbar />
      <div className="h-screen flex justify-center items-center bg-slate-950 shadow-lg ">
        <div className="md:max-w-md md:w-full bg-slate-100 rounded px-8 pt-6 pb-8 mb-4 sm:w-auto">
          <h2 className="text-3xl font-bold mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <div className="flex items-center justify-between">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="text-sm text-gray-600 mt-4">
              Not registered yet?{' '}
              <Link
                to="/signup"
                className="text-orange-500 hover:text-orange-600"
              >
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
