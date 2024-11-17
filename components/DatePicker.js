import React from 'react';
import DatePicker from 'react-datepicker';
import { useRecurrenceStore } from '../stores/recurrenceStore';
import 'react-datepicker/dist/react-datepicker.css';

import { RecurringDates } from './RecurringDates';

const CustomDatePicker = () => {
  const { startDate, setStartDate, endDate, setEndDate, minDate, maxDate } =
    useRecurrenceStore();

  const recDates = RecurringDates();

  return (
    <div className="flex flex-col space-y-4 m-1">
      <div>
        <label>Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="border p-2"
          placeholderText="Select start date"
          minDate={minDate}
          maxDate={maxDate}
          dateFormat="dd/MM/yyyy"
          highlightDates={recDates.map((dateString) => new Date(dateString))}
        />
      </div>
      <div>
        <label>End Date</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          className="border p-2"
          placeholderText="Select end date (optional)"
          minDate={minDate}
          maxDate={maxDate}
          dateFormat="dd/MM/yyyy"
          highlightDates={recDates.map((dateString) => new Date(dateString))}
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;
