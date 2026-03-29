import { useState } from "react";
import { DateRange } from "react-date-range";
import CloseButton from "./CloseButton";

export default function CalendarModal({
  onClose,
  onApply,
}: {
  onClose: () => void;
  onApply: (dates: { startDate: Date; endDate: Date }) => void;
}) {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <div className="filters-modal">
      <div className="filters-modal__content">
        <div className="filters-modal__close-wrapper filters-modal__close-calendar">
          <CloseButton onClose={onClose} />
        </div>

        <h2>Select dates</h2>

        <DateRange
          editableDateInputs={true}
          onChange={(item: any) => setRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={range}
        />

        <button
          className="filters-modal__apply "
          onClick={() =>
            onApply({
              startDate: range[0].startDate,
              endDate: range[0].endDate,
            })
          }
        >
          Apply dates
        </button>
      </div>
    </div>
  );
}
