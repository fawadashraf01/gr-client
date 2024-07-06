import React, { useContext, useState } from 'react';
import credentialsContext from '../context/credentialsContext';
import Popup from './Popup';

const SubscriptionCard = ({ priceId, heading, description, features }) => {
  const { createCheckout, loggedIn, user } = useContext(credentialsContext);
  const [displayPopup, setDisplayPopup] = useState(false);

  const gradient = 'bg-gradient-to-br from-violet-500 to-violet-700';
  const isSubscribed = user?.subscription === heading;

  async function handleCheckout() {
    if (loggedIn && priceId) {
      createCheckout(priceId);
    } else {
      setDisplayPopup(true);
    }
  }

  return (
    <div
      className={`rounded-lg p-6 pt-10 text-center shadow-xl transform transition-transform duration-300 hover:scale-105 ${gradient} h-full flex flex-col justify-between`}
    >
      <div>
        <h2 className="mb-4 text-2xl font-semibold text-white">{heading}</h2>
        <p className="mb-6 text-lg text-white">{description}</p>
        <ul className="mb-6 text-center text-white font-medium">
          {features.map((feature, index) => (
            <li key={index} className="mb-2">
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleCheckout}
        disabled={isSubscribed}
        className={`rounded-full px-4 py-2 text-lg font-semibold transition-colors duration-300 ${
          isSubscribed
            ? 'cursor-not-allowed bg-gray-400 text-gray-800'
            : 'bg-white text-gray-800 hover:bg-gray-200'
        }`}
      >
        {isSubscribed ? 'Subscribed' : 'Subscribe'}
      </button>
      {displayPopup && (
        <Popup onClose={() => setDisplayPopup(false)}>
          You are not signed in.
        </Popup>
      )}
    </div>
  );
};

export default SubscriptionCard;
