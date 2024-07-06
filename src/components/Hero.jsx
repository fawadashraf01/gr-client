import React from 'react';
import { Link as Scroll } from 'react-scroll';

const Hero = () => {
  const sectionStyle = {
    backgroundImage: `url(/imgs/messaging-illustration.jpg)`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <section
      id="hero"
      className="flex h-screen w-full flex-col items-center justify-center bg-white text-violet-600 md:grid md:grid-cols-2"
    >
      <div className="flex flex-col items-center mt-20 p-8 md:items-start md:p-12">
        <h1 className="mb-4 text-3xl font-bold text-center md:mb-8 md:text-4xl md:text-left">
          Welcome to Metered Messages
        </h1>
        <p className="mb-8 text-center text-lg text-gray-600 md:mb-12 md:text-left">
          Metered Messages offers you a flexible and scalable solution for
          managing message quotas and usage. Whether you're a small business or
          a large enterprise, our platform ensures that you have full control
          over your messaging needs. Choose a plan that fits your requirements
          and start messaging with confidence today!
        </p>
        <Scroll
          to="subscriptions"
          activeClass="active"
          spy={true}
          smooth={true}
          duration={500}
          className="cursor-pointer scroll-smooth rounded bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
        >
          Checkout Plans
        </Scroll>
      </div>
      <div
        style={sectionStyle}
        className="h-64 w-full bg-cover bg-center md:h-full"
      ></div>
    </section>
  );
};

export default Hero;
