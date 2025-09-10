import React from 'react';
import LinkButton from '../components/LinkButton';

const HistoryPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black-100">
      <h2 className="text-3xl font-bold mb-4">History View</h2>
      <p className="text-lg">Look at all your previous tests!</p>
      <div className='flex justify-center'>
        <LinkButton page='/' buttonText='Dashboard' />
      </div>
    </div>
  );
};

export default HistoryPage;
