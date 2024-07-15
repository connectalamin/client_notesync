import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateEmail(email) || password.length < 6) {
      setError('Invalid email or password');
      return;
    }

    //SignUp api
    try {
      const response = await axiosInstance.post('/api/register', {
        fullName: name,
        email,
        password,
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        toast.success('Registered successfully!');

        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');

      setError('Something went wrong, please try again');
    }
  };
  return (
    <>
      <Navbar />
      <div className="h-screen flex justify-center items-center bg-slate-950 shadow-lg ">
        <div className="md:max-w-md md:w-full bg-slate-100 rounded px-8 pt-6 pb-8 mb-4 sm:w-auto">
          <h2 className="text-3xl font-bold mb-4">Register</h2>
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Type your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                Register
              </button>
            </div>
            <div className="text-sm text-gray-600 mt-4">
              Already registered ?{' '}
              <Link
                to="/login"
                className="text-orange-500 hover:text-orange-600"
              >
                Click here to log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
