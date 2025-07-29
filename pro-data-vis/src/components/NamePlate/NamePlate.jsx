import React from 'react';

const NamePlate = ({ name }) => {
  return (
    <div className="text-4xl w-screen flex flex-row items-center justify-center pt-4 bg-transparent">
      <span className="font-bold"> {name} </span>
    </div>
  );
};

export default NamePlate;
