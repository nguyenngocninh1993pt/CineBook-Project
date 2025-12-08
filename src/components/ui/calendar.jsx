import React from 'react';
import { DayPicker } from 'react-day-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './calendar.css';

export const Calendar = ({ className = '', classNames = {}, showOutsideDays = true, ...props }) => {
  const mergedClassNames = {
    months: 'calendar-months',
    month: 'calendar-month',
    caption: 'calendar-caption',
    caption_label: 'calendar-caption-label',
    nav: 'calendar-nav',
    nav_button: 'calendar-nav-button',
    nav_button_previous: 'calendar-nav-button-prev',
    nav_button_next: 'calendar-nav-button-next',
    table: 'calendar-table',
    head_row: 'calendar-head-row',
    head_cell: 'calendar-head-cell',
    row: 'calendar-row',
    cell: 'calendar-cell',
    day: 'calendar-day',
    day_selected: 'calendar-day-selected',
    day_today: 'calendar-day-today',
    day_outside: 'calendar-day-outside',
    day_disabled: 'calendar-day-disabled',
    ...classNames,
  };

  const components = {
    IconLeft: () => <ChevronLeft className="calendar-icon" />,
    IconRight: () => <ChevronRight className="calendar-icon" />,
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={`calendar ${className}`}
      classNames={mergedClassNames}
      components={components}
      {...props}
    />
  );
};
