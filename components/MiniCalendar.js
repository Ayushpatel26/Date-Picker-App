import React from 'react';
import { format } from 'date-fns';
import { RecurringDates } from './RecurringDates';

const MiniCalendar = () => {
  const dates = RecurringDates();

  return (
    <div>
      <h3 className="font-bold">Selected Dates Preview</h3>
      {dates.length == 0 && (
        <p>There is nothing to show (Please select Start Date)</p>
      )}
      <ul className="list-disc ml-4">
        {dates.map((date, idx) => (
          <li key={idx}>{format(date, 'dd/MM/yyyy')}</li>
        ))}
      </ul>
    </div>
  );
};

export default MiniCalendar;
