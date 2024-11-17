import { create } from 'zustand';

export const useRecurrenceStore = create((set) => ({
  startDate: null,
  endDate: null,
  recurrenceType: 'daily',
  interval: 1,
  customInterval: { value: 1, unit: 'days' },
  minDate: new Date(),
  maxDate: new Date(2024, 11, 31), // because month start from 0
  customValue: 1,
  customUnit: 'days',
  selectedDays: [],
  nthDay: { nth: 'First', day: 'Monday' },

  setStartDate: (date) =>
    set((state) => {
      if (state.endDate && date > state.endDate) {
        return { startDate: date, endDate: null };
      }
      return { startDate: date };
    }),
  setEndDate: (date) =>
    set((state) => {
      if (state.startDate && date < state.startDate) {
        return { startDate: null, endDate: date };
      }
      return { endDate: date };
    }),
  setRecurrenceType: (type) => set({ recurrenceType: type }),
  setInterval: (interval) => set({ interval }),
  setCustomInterval: (interval) => set({ customInterval: interval }),
  setCustomValue: (value) => set({ customValue: value }),
  setCustomUnit: (unit) => set({ customUnit: unit }),
  setSelectedDays: (days) => set({ selectedDays: days }),
  setNthDay: (nthDay) => set({ nthDay: nthDay }),
}));
