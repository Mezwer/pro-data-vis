import React from 'react';
import Spinner from '@/components/Spinner/Spinner';

const loading = () => {
  return (
    <div className="w-full h-screen">
      <Spinner />
    </div>
  );
};

export default loading;
