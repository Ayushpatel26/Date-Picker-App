'use client';
import React from 'react';
import CustomDatePicker from '../components/DatePicker';
import RecurringOptions from '../components/RecurringOptions';
import MiniCalendar from '../components/MiniCalendar';

export default function Home() {
  return (
    <div className="max-w-xl mx-auto p-4 text-center ml-2">
      <h1 className="text-2xl font-black mb-2">Recurring Date Picker</h1>
      <RecurringOptions />
      <CustomDatePicker />
      <MiniCalendar />
    </div>
  );
}
