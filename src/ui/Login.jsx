import React from 'react';
import Card from '../components/Card';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-violet-600">
      <Card>
        <LoginForm />
      </Card>
    </div>
  );
};

export default Login;
