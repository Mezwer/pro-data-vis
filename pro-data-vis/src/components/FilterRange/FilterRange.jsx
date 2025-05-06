import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";

const FilterRange = ({ filter }) => {
  const [value, setValue] = useState([0, 100]);

  return (
    <div className="flex flex-col w-full">
      <span className="underline"> {filter} </span>

      <div className="flex flex-row gap-3">
        0
        <Slider.Root
          className="relative flex h-5 w-full touch-none select-none items-center my-auto"
          defaultValue={value}
          max={100}
          step={1}
          minStepsBetweenThumbs={1}
          onValueChange={vals => setValue(vals)}
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

        1
      </div>
    </div>
  );
}

export default FilterRange;