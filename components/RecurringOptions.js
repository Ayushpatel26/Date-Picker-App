import React from 'react';
import { useRecurrenceStore } from '../stores/recurrenceStore';

const RecurringOptions = () => {
  const {
    recurrenceType,
    setRecurrenceType,
    setCustomInterval,
    customValue,
    customUnit,
    setCustomValue,
    setCustomUnit,
    selectedDays,
    setSelectedDays,
    nthDay,
    setNthDay,
  } = useRecurrenceStore();

  const handleCustomChange = () => {
    setCustomInterval({ value: customValue, unit: customUnit });
  };

  const handleDaySelection = (day) => {
    if (selectedDays.includes(day)) {
      // Remove the day if it's already selected
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      // Add the day if it's not selected
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleNthDayChange = (nth, day) => {
    setNthDay({ nth, day });
  };

  const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const nthOptions = ['First', 'Second', 'Third', 'Fourth', 'Last'];

  return (
    <div className="flex flex-col space-y-2 mb-2">
      <label>Repeat</label>
      <select
        className="border p-2"
        value={recurrenceType}
        onChange={(e) => setRecurrenceType(e.target.value)}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
        <option value="custom">Custom</option>
      </select>

      {recurrenceType === 'custom' && (
        <div className="flex space-x-2 mt-2">
          <input
            type="number"
            className="border p-2 w-16"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            min="1"
          />
          <select
            className="border p-2"
            value={customUnit}
            onChange={(e) => setCustomUnit(e.target.value)}
          >
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
            <option value="nth">Nth day of the month</option>
          </select>
          <button
            className="px-2 py-0 bg-blue-500 text-white rounded"
            onClick={handleCustomChange}
          >
            Set
          </button>
        </div>
      )}

      {customUnit === 'weeks' && (
        <div className="mt-2 space-y-1">
          <label>Select Days of the Week:</label>
          <div className="flex flex-wrap gap-2">
            {weekdays.map((day) => (
              <label key={day} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={selectedDays.includes(day)}
                  onChange={() => handleDaySelection(day)}
                  className="form-checkbox"
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {customUnit === 'nth' && (
        <div className="mt-4">
          <label>Select the nth day of the month:</label>
          <div className="flex space-x-2 mt-2">
            <select
              className="border p-2"
              value={nthDay.nth}
              onChange={(e) => handleNthDayChange(e.target.value, nthDay.day)}
            >
              {nthOptions.map((nth) => (
                <option key={nth} value={nth}>
                  {nth}
                </option>
              ))}
            </select>

            <select
              className="border p-2"
              value={nthDay.day}
              onChange={(e) => handleNthDayChange(nthDay.nth, e.target.value)}
            >
              {weekdays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecurringOptions;
