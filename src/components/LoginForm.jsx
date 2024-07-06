import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import credentialsContext from '../context/credentialsContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(credentialsContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (login) {
      try {
        const data = await login(email, password);
        if (data.status === 'success') {
          navigate('/');
        } else {
          if (data.message === 'Email not found') {
            toast.error('Email not found. Please check your email.');
          } else {
            toast.error(data.message);
          }
        }
      } catch (error) {
        toast.error('An error occurred. Please try again.');
      }
    }
  }

  function handleBack() {
    navigate(-1);
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4 font-bold text-center text-gray-700">Login</h2>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            minLength="8"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-base leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            minLength="8"
            className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 text-base leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-violet-600 px-4 py-2 text-lg font-bold text-white hover:bg-purple-700 focus:outline-none"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="focus:shadow-outline rounded bg-gray-600 px-4 py-2 text-lg font-bold text-white hover:bg-gray-700 focus:outline-none"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
