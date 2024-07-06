import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import credentialsContext from '../context/credentialsContext';

const SignupForm = () => {
  const { signup } = useContext(credentialsContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (signup) {
      const userObj = {
        name,
        email,
        password,
        passwordConfirm,
      };

      try {
        const data = await signup(userObj);

        if (data.status === 'success') {
          toast.success('Signup successful!');
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('An error occurred. Please try again later.');
      }
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <ToastContainer /> {/* Ensure ToastContainer is here */}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-base leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
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
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-base leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
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
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-base leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="passwordConfirm"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="••••••••"
            minLength="8"
            className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 text-base leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-violet-600 px-4 py-2 text-lg font-bold text-white hover:bg-purple-700 focus:outline-none mr-2"
          >
            Signup
          </button>
          <Link to="/login" className="text-violet-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
