import { useRecurrenceStore } from '../stores/recurrenceStore';

export const RecurringDates = () => {
  const {
    startDate,
    endDate,
    maxDate,
    interval,
    recurrenceType,
    customInterval,
    selectedDays,
    nthDay,
  } = useRecurrenceStore();

  if (!startDate) return [];
  let dates = [];
  let currentDate = new Date(startDate);
  let EndingDate = endDate == null ? maxDate : endDate;

  // Helper to get the day index (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayToIndex = (day) => {
    const daysMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    return daysMap[day];
  };

  // Sort selected days by their index to maintain order
  const sortedSelectedDays = selectedDays
    .map((day) => dayToIndex(day))
    .sort((a, b) => a - b);

  while (currentDate <= new Date(EndingDate)) {
    if (recurrenceType === 'daily') {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + parseInt(interval));
    } else if (recurrenceType === 'weekly') {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 7 * parseInt(interval));
    } else if (recurrenceType === 'monthly') {
      dates.push(new Date(currentDate));
      currentDate.setMonth(currentDate.getMonth() + parseInt(interval));
    } else if (recurrenceType === 'yearly') {
      dates.push(new Date(currentDate));
      currentDate.setFullYear(currentDate.getFullYear() + parseInt(interval));
    } else if (recurrenceType === 'custom') {
      if (customInterval.unit === 'days') {
        dates.push(new Date(currentDate));
        currentDate.setDate(
          currentDate.getDate() + parseInt(customInterval.value)
        );
      } else if (customInterval.unit === 'weeks') {
        // If specific days are selected, handle them
        if (selectedDays.length > 0) {
          // Loop through selected days within the current week
          for (const dayIndex of sortedSelectedDays) {
            let tempDate = new Date(currentDate);
            // Adjust tempDate to the next occurrence of the selected day
            while (tempDate.getDay() !== dayIndex) {
              tempDate.setDate(tempDate.getDate() + 1);
            }
            if (tempDate <= new Date(EndingDate)) {
              dates.push(new Date(tempDate));
            }
          }
          // Move to the next week
          currentDate.setDate(
            currentDate.getDate() + 7 * parseInt(customInterval.value)
          );
        } else {
          // If no specific days, default weekly interval
          dates.push(new Date(currentDate));
          currentDate.setDate(
            currentDate.getDate() + 7 * parseInt(customInterval.value)
          );
        }
      } else if (customInterval.unit === 'months') {
        dates.push(new Date(currentDate));
        currentDate.setMonth(
          currentDate.getMonth() + parseInt(customInterval.value)
        );
      } else if (customInterval.unit === 'years') {
        dates.push(new Date(currentDate));
        currentDate.setFullYear(
          currentDate.getFullYear() + parseInt(customInterval.value)
        );
      } else if (customInterval.unit === 'nth') {
        const nth = nthDay.nth; // For example: "Second", "Third", etc.
        const dayIndex = dayToIndex(nthDay.day); // Day of the week index (0 = Sunday, 1 = Monday, etc.)

        // Mapping nth string to numeric occurrence (e.g., "First" => 1, "Second" => 2)
        const nthMap = {
          First: 1,
          Second: 2,
          Third: 3,
          Fourth: 4,
          Last: 'last',
        };
        const nthOccurrence = nthMap[nth];

        // Loop to find the nth occurrence of the specified weekday in the current month
        const targetMonth = currentDate.getMonth();
        let occurrenceCount = 0;
        let tempDate = new Date(currentDate);
        tempDate.setDate(1);

        let lastMatchingDate = null; // Keep track of the last valid date

        // Iterate through the month to find the correct day
        while (tempDate.getMonth() === targetMonth) {
          if (tempDate.getDay() === dayIndex) {
            occurrenceCount++;
            // Track the last matching day
            if (tempDate > currentDate) {
              lastMatchingDate = new Date(tempDate);
            }

            // If it's the exact nth occurrence
            if (occurrenceCount === nthOccurrence && nthOccurrence !== 'last') {
              dates.push(new Date(tempDate));
              break;
            }
          }
          if (occurrenceCount) {
            tempDate.setDate(tempDate.getDate() + 7);
          } else {
            tempDate.setDate(tempDate.getDate() + 1);
          }
        }

        // If it's the 'last' occurrence, use the tracked last matching date
        if (nthOccurrence === 'last' && lastMatchingDate) {
          dates.push(lastMatchingDate);
        }

        // Move to the next month
        currentDate.setMonth(
          currentDate.getMonth() + parseInt(customInterval.value)
        );
        currentDate.setDate(1); // Reset to the start of the month
      }
    }
  }
  return dates;
};
