import React from 'react';
import Tabs from './Tabs';

const NamePlate = ({ name }) => {
  return (
    <div className="text-4xl w-screen flex flex-row items-center justify-center pt-4 bg-transparent relative">
      <Tabs />
      <span className="font-bold"> {name} </span>
    </div>
  );
};

export default NamePlate;
