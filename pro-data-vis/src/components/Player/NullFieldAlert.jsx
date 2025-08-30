import { ShieldAlert } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import { fieldsInfo } from '@/constants/fields';

const NullFieldAlert = ({ field }) => {
  return (
    <>
      <ShieldAlert
        className="text-red-500 right-0 absolute cursor-pointer"
        data-tooltip-delay-show={500}
        data-tooltip-id={field}
      />
      <Tooltip
        id={field}
        place="bottom"
        content={`The field "${fieldsInfo[field].name}" likely has inaccurate data for this player for certain years. If the number of games matches a more reliable field (Win Rate, Kills, etc.), it can most likely be trusted.`}
        opacity={1}
        className="!bg-slate-900/100 !text-xs !rounded-md !z-[9999] !max-w-[30rem]"
      />
    </>
  );
};

export default NullFieldAlert;
