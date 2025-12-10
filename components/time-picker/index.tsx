import React, { useState, useEffect, useRef, useMemo } from "react";
import TimeIcon from "../icons/TimeIcon";
import Button from "../button";

// Helper: Generate Time Slots
const generateTimeSlots = (intervalMinutes: number = 30): string[] => {
  const times: string[] = [];
  let start = 0; // minutes from midnight

  while (start < 24 * 60) {
    const hours = Math.floor(start / 60);
    const minutes = start % 60;

    // Format HH.mm
    const formatted = `${hours.toString().padStart(2, "0")}.${minutes
      .toString()
      .padStart(2, "0")}`;
    times.push(formatted);
    start += intervalMinutes;
  }
  return times;
};

export interface TimePickerProps {
  label?: string;
  value?: string; // Format "HH.mm"
  onChange?: (time: string) => void;
  interval?: number;
  className?: string;
  placeholder?: string;
}

export default function TimePicker({
  label = "Select Time",
  value,
  onChange,
  interval = 30,
  className,
  placeholder = "Select Time",
}: TimePickerProps) {
  const [tempValue, setTempValue] = useState<string | undefined>(value);

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const timeSlots = useMemo(() => generateTimeSlots(interval), [interval]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setTempValue(value);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  const handleItemClick = (time: string) => {
    setTempValue(time);
  };

  const handleConfirm = () => {
    if (tempValue) {
      onChange?.(tempValue);
      setIsOpen(false);
    }
  };

  const confirmedValue = value;

  return (
    <div
      ref={containerRef}
      className={["relative w-full", className].filter(Boolean).join(" ")}>
      {label && (
        <label className="block mb-1 text-[14px] font-medium text-black">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          const next = !isOpen;
          setIsOpen(next);
          if (next) {
            setTempValue(value);
          }
        }}
        className="w-full flex items-center justify-between p-2 rounded-xl border bg-white transition-all text-left border-neutral-200 hover:border-neutral-300">
        <span className="text-sm font-medium text-slate-900">
          {confirmedValue || placeholder}
        </span>
        <TimeIcon />
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute top-[130%] left-0 z-50 w-full bg-white border border-neutral-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col">
          {/* Scrollable List */}
          <div className="max-h-60 overflow-y-auto p-2 space-y-1">
            {timeSlots.map((time) => {
              const isSelected = tempValue === time;
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleItemClick(time)}
                  className={[
                    "w-full text-left px-4 py-3 text-[14px] font-medium rounded-lg transition-colors border-b border-neutral-200 last:border-0",
                    isSelected
                      ? "bg-slate-100 text-black"
                      : "text-black hover:bg-white",
                  ]
                    .filter(Boolean)
                    .join(" ")}>
                  {time}
                </button>
              );
            })}
          </div>

          {/* Footer Action */}
          <div className="p-3 border-t border-slate-100 flex justify-end">
            <Button
              variant="primary"
              shape="pill"
              onClick={handleConfirm}
              disabled={!tempValue}>
              Select
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
