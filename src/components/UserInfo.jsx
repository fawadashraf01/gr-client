import React, { useContext, useEffect, useState } from 'react';
import credentialsContext from '../context/credentialsContext';

const UserInfo = () => {
  const { user, deleteMe, getMe } = useContext(credentialsContext);

  const [userInfo, setUserInfo] = useState({});

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [user]);

  return (
    <div className="relative flex h-full flex-col items-center justify-start p-4">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-md border-2 border-violet-600 bg-white p-8 shadow-2xl">
        <h2 className="mb-4 text-2xl font-bold">User Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Name:</strong> {userInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p>
            <strong>Subscription:</strong>{' '}
            {userInfo.subscription || 'No Subscription'}
          </p>
          <p>
            <strong>Message Limit:</strong> {userInfo.messagesLimit}
          </p>
          <p>
            <strong>Message Usage:</strong> {userInfo.messagesUsage}
          </p>
          <p>
            <strong>Join Date:</strong> {formatDate(userInfo.joinedAt)}
          </p>
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => deleteMe()}
            className="rounded-md bg-red-600 px-3 py-1 text-white shadow-lg hover:bg-red-700"
          >
            Delete Account
          </button>
          <button
            onClick={() => getMe()}
            className="rounded-md bg-violet-600 px-3 py-1 text-white shadow-lg hover:bg-violet-700"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
