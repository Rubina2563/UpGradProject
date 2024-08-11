import React from 'react';

const UnderConstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  #ddd077">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Under Construction</h1>
      <p className="text-lg text-gray-600 mb-8">
        We are working hard to bring you a great experience. Stay tuned!
      </p>
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-800"></div>
    </div>
  );
};

export default UnderConstruction;