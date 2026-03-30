import { Slider, SliderTrack, SliderThumb } from "react-aria-components";

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
      <Slider
        value={priceRange}
        // onChange={setPriceRange}
        // value={{ start: priceRange[0], end: priceRange[1] }}
        // onChange={(v) => setPriceRange([v.start, v.end])}
        onChange={(v) => setPriceRange(v as [number, number])}
        minValue={0}
        maxValue={1000}
        step={1}
        className="price-slider"
      >
        <SliderTrack className="track">
          <div className="track-fill" />
        </SliderTrack>

        <SliderThumb index={0} className="thumb" />
        <SliderThumb index={1} className="thumb" />
      </Slider>

      <div className="price-values">
        {priceRange[0]} € – {priceRange[1]} €
      </div>
    </div>
  );
}
