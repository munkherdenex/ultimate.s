import React, { useState,  } from 'react';
import moment from 'moment';
import {Calendar, momentLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Day } from './Day';

export function BigCalendar(props){
  // const { t } = useTranslation();
  const { view, handleViewChange, day, setDay } = props;
  const localizer = momentLocalizer(moment)
    const [sites, setSites] = useState([]);

  const customFormats = {
    dayFormat: (date, culture, localizer) => 
      localizer.format(date, 'dddd', culture) === 'Monday' ? 'Даваа ' + localizer.format(date, 'MM/DD', culture)
      : localizer.format(date, 'dddd', culture) === 'Tuesday' ? 'Мягмар ' + localizer.format(date, 'MM/DD', culture)
      : localizer.format(date, 'dddd', culture) === 'Wednesday' ? 'Лхагва ' + localizer.format(date, 'MM/DD', culture)
      : localizer.format(date, 'dddd', culture) === 'Thursday' ? 'Пүрэв ' + localizer.format(date, 'MM/DD', culture)
      : localizer.format(date, 'dddd', culture) === 'Friday' ? 'Баасан ' + localizer.format(date, 'MM/DD', culture)
      : localizer.format(date, 'dddd', culture) === 'Saturday' ? 'Бямба ' + localizer.format(date, 'MM/DD', culture)
      : localizer.format(date, 'dddd', culture) === 'Sunday' ? 'Ням ' + localizer.format(date, 'MM/DD', culture) : '',
    timeGutterFormat: 'HH:mm',
    dayHeaderFormat: (date, culture, localizer) => 
      localizer.format(date, 'dddd', culture) === 'Monday' ? 'Даваа ' + localizer.format(date, 'MM/DD', culture)
      : localizer.format(date, 'dddd', culture) === 'Tuesday' ? 'Мягмар ' + localizer.format(date, 'MM/DD', culture)
      : localizer.format(date, 'dddd', culture) === 'Wednesday' ? 'Лхагва ' + localizer.format(date, 'MM/DD', culture)
      : localizer.format(date, 'dddd', culture) === 'Thursday' ? 'Пүрэв ' + localizer.format(date, 'MM/DD', culture)
      : localizer.format(date, 'dddd', culture) === 'Friday' ? 'Баасан ' + localizer.format(date, 'MM/DD', culture)
      : localizer.format(date, 'dddd', culture) === 'Saturday' ? 'Бямба ' + localizer.format(date, 'MM/DD', culture)
      : localizer.format(date, 'dddd', culture) === 'Sunday' ? 'Ням ' + localizer.format(date, 'MM/DD', culture) : '',   
  };

  const customMonthHeader = ({ label }) => {
    return (
        <span>{label === 'Mon' ? 'Даваа' : label === 'Tue' ? 'Мягмар' : label === 'Wed' ? 'Лхагва' : label === 'Thu' ? 'Пүрэв'
              : label === 'Fri' ? 'Баасан': label === 'Sat' ? 'Бямба': label === 'Sun' ? 'Ням' : ''}
        </span>
    )};
  const customDayHeader = (label) => {
    // console.log(label?.label)
    return (
        <span>{label?.label}</span>
    )
  };

  const customToolbar = (toolbar) => {
      // console.log(toolbar)
      const { label } = toolbar;
      return (
        <div className="custom-toolbar">{view === 'day' ?  <span>{label}</span>: null}</div>
  )};

  const yourEventsArray = [
    // {
    //   title: 'Event 1',
    //   start: new Date(2024, 1, 1),
    //   end: new Date(2024, 1, 2),
    // },
    // Add more events as needed
  ];

  const components = {
    month: { 
        header: customMonthHeader,
    },
    day: { 
      header: customDayHeader,
    },
    toolbar: customToolbar,
  };
  
  // const resourceMap = (toolbar) => {
  //    let resourceMap = [{ resourceId: 1, resourceTitle: 'day'}] 
  //    return resourceMap
  // };

  const resourceMap = [{ resourceId: 1, resourceTitle: 'day' }]
  const dayProps = { customDayHeader, setDay}

  return (
    <div className='tm_bc_back'>
      <Calendar localizer={localizer} 
          className='tm_calendar'
          view={view} 
          events={yourEventsArray}
          startAccessor="start"
          endAccessor="end"
          timeslots={4}
          step={15}
          customDayHeader={2}
          views={['month', 'week', 'work_week', 'day']}
          onView={ handleViewChange}  
          formats={customFormats}
          components={components}
          // resources={view === 'day' ? resourceMap : null}
      />
      {view === 'day' && <Day {...dayProps}/>}
    </div>
  );
}