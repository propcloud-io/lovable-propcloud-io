
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="text-center mb-8">
        <Link to="/" className="inline-block">
          <h1 className="text-2xl font-bold text-propcloud-600">
            PropCloud<span className="text-propcloud-400">.io</span>
          </h1>
        </Link>
        <p className="text-muted-foreground">Property Management Platform</p>
      </div>
      <LoginForm />
      <div className="mt-6">
        <Link to="/" className="text-sm text-propcloud-600 hover:underline">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Login;
