import React, { useContext, useEffect, useState } from 'react';
import UserInfo from '../components/UserInfo';
import Message from '../components/Message';
import credentialsContext from '../context/credentialsContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('UserInfo');
  const { loggedIn } = useContext(credentialsContext);

  return loggedIn ? (
    <div className="flex h-screen">
      <div className="flex w-1/5 flex-col bg-violet-600 p-4">
        <button
          className={`my-2 px-4 py-2 text-white ${activeTab === 'UserInfo' ? 'bg-violet-800' : ''}`}
          onClick={() => setActiveTab('UserInfo')}
        >
          User Info
        </button>
        <button
          className={`my-2 px-4 py-2 text-white ${activeTab === 'Messages' ? 'bg-violet-800' : ''}`}
          onClick={() => setActiveTab('Messages')}
        >
          Messages
        </button>
        <Link className="my-2 px-4 py-2 text-center text-white" to="/">
          Home
        </Link>
      </div>
      <div className="h-full flex-1 px-4 py-16">
        {activeTab === 'UserInfo' && <UserInfo />}
        {activeTab === 'Messages' && <Message />}
      </div>
    </div>
  ) : (
    <div className="flex h-screen items-center justify-center">
      <h2 className="text- text-3xl font-bold text-violet-600">
        You are not Signed In
      </h2>
    </div>
  );
};

export default Dashboard;
