import React from 'react';
import Card from '../components/Card';
import SignupForm from '../components/SignupForm';

const Signup = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-violet-600">
      <Card title="Signup">
        <SignupForm />
      </Card>
    </div>
  );
};

export default Signup;
