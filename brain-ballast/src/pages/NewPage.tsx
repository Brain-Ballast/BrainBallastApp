
import React from "react";


const NewPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Welcome to the New Page!</h2>

      <p className="text-lg">
        This is a separate page routed with React Router.
      </p>
    </div>
  );
};

export default NewPage;
