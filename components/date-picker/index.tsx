import React, { useState, useEffect, useRef, useMemo } from "react";
import CalendarIcon from "../icons/CalendarIcon";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";

// Helpers
// Check the similarity of dates (day, month, year)
const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

// Format: "1 Desember 2025"
const formatDateDisplay = (date: Date) => {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

// Grid date number format: "1", "2"
const formatDay = (date: Date) => date.getDate();

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const YEARS = Array.from(
  { length: 20 },
  (_, i) => new Date().getFullYear() - 10 + i
);
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export interface DatePickerProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
}

export default function DatePicker({
  label = "Date Picker",
  value,
  onChange,
  className,
}: DatePickerProps) {
  const isControlled = value !== undefined;

  // Internal state only for uncontrolled mode
  const [internalDate, setInternalDate] = useState<Date | undefined>(undefined);

  // Date used in UI
  const selectedDate = isControlled ? value : internalDate;

  // Navigation (Currently viewed Month/Year)
  const [viewDate, setViewDate] = useState<Date>(() => value || new Date());

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation Logic
  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value);
    setViewDate(new Date(viewDate.getFullYear(), newMonth, 1));
  };

  const handleYearSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value);
    setViewDate(new Date(newYear, viewDate.getMonth(), 1));
  };

  const handleDateClick = (date: Date) => {
    // Update internal state only if UNCONTROLLED
    if (!isControlled) {
      setInternalDate(date);
    }

    onChange?.(date);

    setIsOpen(false);
  };

  // Grid Logic
  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArray = [];

    // Padding (Empty slots)
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null);
    }
    // Actual days
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(new Date(year, month, i));
    }

    return daysArray;
  }, [viewDate]);

  return (
    <div
      ref={containerRef}
      className={["relative w-full max-w-[300px]", className]
        .filter(Boolean)
        .join(" ")}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={[
          "w-full flex items-center justify-between p-2 rounded-xl border bg-white transition-all text-left group",
          isOpen
            ? "border-neutral-200 hover:border-netural-300"
            : "border-neutral-200 hover:border-netural-300",
        ]
          .filter(Boolean)
          .join(" ")}>
        <div className="flex flex-col gap-0.5">
          <span className="text-[14px] font-medium capitalize tracking-wide text-content-primary">
            {label}
          </span>
          <span
            className={[
              "text-[14px] font-medium",
              selectedDate ? "text-content-primary" : "text-neutral-400",
            ]
              .filter(Boolean)
              .join(" ")}>
            {selectedDate ? formatDateDisplay(selectedDate) : "Select date"}
          </span>
        </div>
        <div
          className={[
            "transition-colors",
            isOpen ? "text-slate-900" : "text-slate-900",
          ]
            .filter(Boolean)
            .join(" ")}>
          <CalendarIcon />
        </div>
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute top-[115%] left-0 z-50 p-4 bg-white border border-slate-100 rounded-2xl w-[320px] animate-in fade-in zoom-in-95 duration-200">
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
              <ChevronLeftIcon className="text-[#1e1e1e]" />
            </button>

            <div className="flex items-center gap-2">
              {/* Month Select */}
              <div className="relative group">
                <select
                  value={viewDate.getMonth()}
                  onChange={handleMonthSelect}
                  className="appearance-none bg-white border border-neutral-200 rounded-lg py-1.5 pl-1.5 pr-[30px] text-[16px] font-normal text-[#1e1e1e] hover:bg-neutral-100 cursor-pointer focus:outline-none transition-colors">
                  {MONTHS.map((month, i) => (
                    <option key={month} value={i}>
                      {month}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <ChevronDownIcon className="text-[#1e1e1e]" />
                </div>
              </div>

              {/* Year Select */}
              <div className="relative group">
                <select
                  value={viewDate.getFullYear()}
                  onChange={handleYearSelect}
                  className="appearance-none bg-white border border-neutral-200 rounded-lg py-1.5 pl-1.5 pr-[30px] text-[16px] font-normal text-[#1e1e1e] hover:bg-neutral-100 cursor-pointer focus:outline-none transition-colors">
                  {YEARS.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <ChevronDownIcon className="text-[#1e1e1e]" />
                </div>
              </div>
            </div>

            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
              <ChevronRightIcon className="text-[#1e1e1e]" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-y-1 text-center">
            {/* Weekday Headers */}
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="text-[11px] text-[#757575] font-medium py-2 capitalize tracking-wider">
                {day}
              </div>
            ))}

            {/* Days */}
            {calendarDays.map((dateItem, idx) => {
              // Render Empty Slot
              if (!dateItem) {
                return <div key={`empty-${idx}`} />;
              }

              const isSelected = selectedDate
                ? isSameDay(dateItem, selectedDate)
                : false;

              return (
                <div key={idx} className="relative p-0.5">
                  <button
                    type="button"
                    onClick={() => handleDateClick(dateItem)}
                    className={[
                      "w-9 h-9 text-[16px] rounded-lg flex items-center justify-center transition-all",
                      isSelected && "bg-[#2c2c2c] text-white",
                      !isSelected &&
                        "hover:bg-background-hover text-[#1e1e1e] font-medium",
                    ]
                      .filter(Boolean)
                      .join(" ")}>
                    {formatDay(dateItem)}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
