import React from 'react';

// Create function component for App
const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">PropCloud.io</h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              The Autonomous Property Management Platform
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              PropCloud.io helps short-term rental hosts automate their operations,
              increase bookings, and deliver exceptional guest experiences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Join Waitlist
              </button>
              <button
                className="bg-gray-100 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} PropCloud.io. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
