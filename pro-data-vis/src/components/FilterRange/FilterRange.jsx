import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";

const FilterRange = ({ filter, label, setFilter }) => {
  const max = 6000;
  const [value, setValue] = useState([0, max]);

  const onValueChange = (val) => {
    setValue(val);
    setFilter(prev => ({...prev, [filter]: val}));
  }

  function secondsToHMS(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num) => String(num).padStart(2, '0');

    return `${hours ? `${pad(hours)}:`: ""}${pad(minutes)}:${pad(seconds)}`;
  }

  return (
    <div className="flex flex-col w-full">
      <span className="underline"> {label} </span>

      <div className="flex flex-row gap-3 items-center">
        <span className="w-[2rem] text-sm"> {secondsToHMS(value[0])} </span>
        <Slider.Root
          className="relative flex h-5 w-full touch-none select-none items-center my-auto"
          defaultValue={value}
          max={max}
          step={1}
          minStepsBetweenThumbs={1}
          onValueChange={vals => onValueChange(vals)}
        >
          <Slider.Track className="relative h-[3px] grow rounded-full bg-neutral-600">
            <Slider.Range className="absolute h-full rounded-full bg-[#ededed]" />
          </Slider.Track>
          <Slider.Thumb
            className="block size-4 rounded-[10px] bg-[#ededed] focus:outline-none"
            aria-label="Volume"
          />
          <Slider.Thumb
            className="block size-4 rounded-[10px] bg-[#ededed] focus:outline-none"
            aria-label="Volume"
          />
		    </Slider.Root>

        <span className="w-[2rem] text-sm"> {secondsToHMS(value[1])} </span>
      </div>
    </div>
  );
}

export default FilterRange;