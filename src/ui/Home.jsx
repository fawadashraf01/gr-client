import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Subscription from '../components/Subscription';

const Home = () => {
  return (
    <div className="h-screen">
      <Navigation />
      <Hero />
      <About />
      <Subscription />
    </div>
  );
};

export default Home;
