
import React from 'react';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-propcloud-600">
          PropCloud<span className="text-propcloud-400">.io</span>
        </h1>
        <p className="text-muted-foreground">Demo Dashboard Access</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
