import * as Slider from '@radix-ui/react-slider';
import { useContext } from 'react';
import { AppContext } from '@/contexts/StateProvider';
import { secondsToHMS } from '@/lib/utils';

const FilterRange = ({ filter, label, maxTime }) => {
  const { filters, setFilters } = useContext(AppContext);
  const value = filters[filter].length > 0 ? filters[filter] : [0, maxTime];

  const onValueChange = (val) => {
    setFilters((prev) => ({ ...prev, [filter]: val }));
  };

  return (
    <div className="flex flex-col w-full">
      <span className="underline"> {label} </span>

      <div className="flex flex-row gap-3 items-center">
        <span className="w-[2rem] text-sm"> {secondsToHMS(value[0])} </span>
        <Slider.Root
          className="relative flex h-5 w-full touch-none select-none items-center my-auto"
          value={value}
          max={maxTime}
          step={1}
          minStepsBetweenThumbs={1}
          onValueChange={(vals) => onValueChange(vals)}
        >
          <Slider.Track className="relative h-[3px] grow rounded-full bg-neutral-600">
            <Slider.Range className="absolute h-full rounded-full bg-[#ededed]" />
          </Slider.Track>
          <Slider.Thumb className="block size-4 rounded-[10px] bg-[#ededed] focus:outline-none" aria-label="Volume" />
          <Slider.Thumb className="block size-4 rounded-[10px] bg-[#ededed] focus:outline-none" aria-label="Volume" />
        </Slider.Root>

        <span className="w-[2rem] text-sm"> {secondsToHMS(value[1])} </span>
      </div>
    </div>
  );
};

export default FilterRange;
