"use client";
import React from "react";
import LineGraph from "@/components/LineGraph/LineGraph";
import StatToolbar from "@/components/StatToolbar/StatToolbar";
import NamePlate from "@/components/NamePlate/NamePlate";
import { useState } from "react";
import { fields, colors } from "@/constants/fields";

const dummyData = [
  {
    Kills: 19,
    Deaths: 5,
    Assists: 4,
    CS: 101,
    Year: 2019
  },
  {
    Kills: 14,
    Deaths: 5,
    Assists: 4,
    CS: 101,
    Year: 2020
  },
  {
    Kills: 10,
    Deaths: 5,
    Assists: 4,
    CS: 101,
    Year: 2021
  },
  {
    Kills: 5,
    Deaths: 10,
    Assists: 3,
    CS: 105,
    Year: 2022
  },
  {
    Kills: 15, 
    Deaths: 12,
    Assists: 10,
    CS: 89,
    Year: 2023
  },
  {
    Kills: 21,
    Deaths: 7,
    Assists: 8,
    CS: 150,
    Year: 2024
  }
];

const Player = ({ params }) => {
  const param = React.use(params);
  const [show, setShow] = useState(fields.map(((field, index) => [field, index, true])));
  const [layout, setLayout] = useState(0); // 0 = vertical, 1 = compact

  const changeShow = (index) => {
    const newShow = [...show];
    newShow[index][2] = !newShow[index][2];

    setShow(newShow);
  };

  const arrange = layout == 1 ? "grid grid-cols-3" : "";
  return (
    <>
      <NamePlate name={param.playername}/>
      <StatToolbar 
        state={{show: show, setShow: changeShow}} 
        layoutState={{layout: layout, setLayout: setLayout}}
      />
      <div className={arrange}>
        {show.map((item) => 
          item[2] ? (      
          <div className="h-[50vh] flex items-center justify-center flex-col" key={item[0]}>
            <LineGraph 
              color={colors[item[0]]}
              data={dummyData}
              ydata={item[0]}
            />
          </div>
          ) : null
        )}
      </div>
    </>
  );
};

export default Player;