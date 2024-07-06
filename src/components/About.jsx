import React from 'react';

const About = () => {
  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center bg-violet-600 px-10 py-20 text-gray-600"
    >
      <div className="max-w-3xl text-center">
        <h2 className="mb-8 text-4xl font-bold text-white">
          About Metered Messages
        </h2>
        <p className="mb-12 text-lg text-white">
          Metered Messages provides a flexible and scalable solution for
          managing message quotas and usage. Whether you're a small business or
          a large enterprise, our platform ensures that you have full control
          over your messaging needs. With customizable plans and robust
          analytics, you can optimize your communication strategy effectively.
          Join Metered Messages today and experience seamless messaging
          solutions tailored to your business.
        </p>
      </div>
    </section>
  );
};

export default About;
