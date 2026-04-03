// import { Slider, SliderTrack, SliderThumb } from "react-aria-components";

import * as Slider from "@radix-ui/react-slider";

interface PriceSliderProps {
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
}

export default function PriceSlider({
  priceRange,
  setPriceRange,
}: PriceSliderProps) {
  return (
    <div className="price-slider-wrapper">
      <Slider.Root
        className="price-slider"
        value={priceRange}
        onValueChange={(v) => setPriceRange(v as [number, number])}
        min={0}
        max={1000}
        step={1}
      >
        <Slider.Track className="price-slider__track">
          <Slider.Range className="price-slider__range" />
        </Slider.Track>

        <Slider.Thumb className="price-slider__thumb" aria-label="Minimum price" />
        <Slider.Thumb className="price-slider__thumb" aria-label="Maximum price" />
      </Slider.Root>

      <div className="price-values">
        {priceRange[0]} € – {priceRange[1]} €
      </div>
    </div>
  );
}
