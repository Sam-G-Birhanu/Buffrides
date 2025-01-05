import { slotData } from "@/store/features/booking";
import { formatDate, formatTime } from "@/utlis/format";
import React from "react";
import { useSelector } from "react-redux";

export default function SlotDisplay() {
  const slot = useSelector(slotData);

  
  return (
    <div className="border my-5 border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm">
      <h4 className="text-lg font-medium text-gray-800 mb-2">Selected Slot</h4>
      {slot?.selectedDate ? (
        <div className="text-gray-700 space-y-2">
          <p className="flex items-center">
            <span className="font-semibold">Date: </span>
            <span className="ml-2">{formatDate(slot.selectedDate)}</span>
          </p>
          <p className="flex items-center">
            <span className="font-semibold">Time: </span>
            <span className="ml-2">{formatTime(slot.selectedDate)}</span>
          </p>
        </div>
      ) : (
        <p className="text-gray-500 italic">No slot selected</p>
      )}
    </div>
  );
}
