"use client";
import React from "react";
import { useRouter } from "next/navigation";
import LineGraph from "@/components/LineGraph/LineGraph";

const dummyData = [
  {
    kills: 19,
    deaths: 5,
    assists: 4,
    cs: 101,
    year: 2019
  },
  {
    kills: 14,
    deaths: 5,
    assists: 4,
    cs: 101,
    year: 2020
  },
  {
    kills: 10,
    deaths: 5,
    assists: 4,
    cs: 101,
    year: 2021
  },
  {
    kills: 5,
    deaths: 10,
    assists: 3,
    cs: 105,
    year: 2022
  },
  {
    kills: 15, 
    deaths: 12,
    assists: 10,
    cs: 89,
    year: 2023
  },
  {
    kills: 21,
    deaths: 7,
    assists: 8,
    cs: 150,
    year: 2024
  }
];

const Player = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <LineGraph 
        color="#FFFFFF"
        data={dummyData}
        ydata="kills"
      />
            
      <LineGraph 
        color="#FFFFFF"
        data={dummyData}
        ydata="cs"
      />
    </div>
  );
};

export default Player;