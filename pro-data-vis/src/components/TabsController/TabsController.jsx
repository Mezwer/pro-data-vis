'use client';
import { AppContext } from '@/contexts/StateProvider';
import { useContext } from 'react';
import Player from '../Player/Player';
import PlayerTables from '../PlayerTables/PlayerTables';
import NamePlate from './NamePlate';

const TabsController = (props) => {
  const { activeView } = useContext(AppContext);

  return (
    <>
      <NamePlate name={props.playername} />
      <div className="relative overflow-hidden">
        <div
          className={`transition-opacity duration-150 ${activeView === 0 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}
        >
          <Player {...props} />
        </div>
        <div
          className={`w-screen flex justify-center transition-opacity duration-150 ${activeView === 1 ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}
        >
          <PlayerTables {...props} />
        </div>
      </div>
    </>
  );
};

export default TabsController;
