import { createContext, useContext, useState, useCallback } from 'react';

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);

  const navigateMonth = useCallback((direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  }, []);

  const toggleDateSelection = useCallback((date) => {
    setSelectedDates(prevDates => {
      const dateStr = date.toISOString().split('T')[0];
      return prevDates.includes(dateStr)
        ? prevDates.filter(d => d !== dateStr)
        : [...prevDates, dateStr];
    });
  }, []);

  const value = {
    currentDate,
    selectedDates,
    navigateMonth,
    toggleDateSelection
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
}; 