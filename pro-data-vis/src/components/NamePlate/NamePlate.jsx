import React from "react";

const NamePlate = ({ name }) => {
  return (
    <div className="text-4xl w-screen flex flex-row items-center justify-center mt-4">
      <span className="underline decoration-2"> Stats for {name} </span>
    </div>
  );
};

export default NamePlate;