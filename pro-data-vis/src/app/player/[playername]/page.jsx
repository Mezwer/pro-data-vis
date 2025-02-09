"use client";
import React from "react";
import LineGraph from "@/components/LineGraph/LineGraph";
import StatToolbar from "@/components/StatToolbar/StatToolbar";
import NamePlate from "@/components/NamePlate/NamePlate";
import Spinner from "@/components/Spinner/Spinner";
import FilterToolbar from "@/components/FilterToolbar/FilterToolbar";
import { useState, useEffect } from "react";
import { fields, colors, mapping } from "@/constants/fields.js";

const Player = ({ params }) => {
  const param = React.use(params); // playername

  // show which items
  const [show, setShow] = useState(fields.map(((field, index) => 
    [
      mapping[field], 
      index, 
      ["kills", "deaths", "assists", "total cs"].includes(field)
    ]
  )));

  // layout of graphs: 0 = vertical, 1 = compact
  const [layout, setLayout] = useState(0);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [champions, setChampions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/data?playername=${param.playername}`);
        const d = await res.json();
        setData(d);

        const champres = await fetch("https://ddragon.leagueoflegends.com/cdn/15.2.1/data/en_US/champion.json");
        const c = (await champres.json()).data;
        setChampions(Object.keys(c).map((item) => c[item].name));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [param.playername]);

  const changeShow = (index) => {
    const newShow = [...show];
    newShow[index][2] = !newShow[index][2];

    setShow(newShow);
  };

  if (loading) {
    return (<Spinner />);
  }

  const arrange = layout == 1 ? "grid grid-cols-3" : "";
  return (
    <>
      <NamePlate name={param.playername}/>
      <StatToolbar 
        state={{show: show, setShow: changeShow}} 
        layoutState={{layout: layout, setLayout: setLayout}}
      />
      <FilterToolbar champions={champions}/>
      <div className={`${arrange} place-items-center`}>
        {show.map((item) => 
          item[2] ? (      
          <div className="h-[45vh] w-11/12 flex flex-col gap-12 items-center justify-center border-solid border-zinc-800 bg-zinc-800/40 border-2 rounded-2xl mb-10" key={item[0]}>
            <span> {item[0]} </span>
            <LineGraph 
              color={colors[item[0]]}
              data={data}
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