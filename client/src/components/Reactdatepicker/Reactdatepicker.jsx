import React, { useState } from 'react'
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {addDays, isWeekend, setDate, toDate} from 'date-fns'
import './Reactdatepicker.css';
import Button from '@mui/material/Button';


const Reactdatepicker = () => {
  let date =  Date();
  
    const [selectedDate, setSelectedDate ] = useState(dayjs(date))
    const [selectedTime, setSelectedTime ] = useState(dayjs(date))
    console.log({
      // selectedTime: selectedTime && selectedTime
      selectedTime: selectedTime && selectedTime.toLocaleTimeString()
    });
    
    const minDate = new Date();
    // const maxDate = new Date()
    // const minDate = new Date(setDate(toDate()));
    // const maxDate = new Date(setDate("2026-12-31"))
    
    const handleClick = () => {
  alert(selectedDate)
}
    return (
      <div>
        <h4>MUI dapte picker</h4>
        <div className='datepicker'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
            <TimePicker 
              value={selectedTime}
              onChange={(newValue) => setSelectedTime(newValue)}
            />
          </LocalizationProvider>
          <Button variant='contained' onClick={handleClick}>Add appointment</Button>
        </div>
    </div>
  )
}

export default Reactdatepicker

// const importantDates = ["2025-11-06", "2025-11-05", "2025-11-04"]

// const highlightImportantDates = (date) => {
//   const formatedDate = date.toLocaleString("sv");
//   return importantDates.includes(formatedDate)
// }
// const handleDateChange = (date) => {
//     setSelectedDate(date)
// }

// // Function to check if a date is a weekend
// const isWeekendDay = (date) => {
//   return isWeekend(date);
// }

// // Function to filter out weekends
// const filterWeekends = (date) => {
//   return !isWeekendDay(date)
// }

// const disableDateRanges = (date) => {
//   {start: new Date("2025-11-11"); end: new Date("2025-11-12")}
// }

// const handleClick = () => {
//   alert(selectedDate)
// }

{/* <div>
  <DatePicker 
  inline
  selected={selectedDate}
  onChange={handleDateChange}
  // dateFormat="DD/MM/YYYY; hh:mm"
  dateFormat="y-MM-dd; HH:mm"
  minDate={minDate}
  // maxDate={maxDate}
  filterDate={filterWeekends}
  showTimeSelect
  timeIntervals={30}
  timeFormat='HH:mm'
  highlightDates={importantDates.map((dateString) => new Date(dateString))}
  // excludeDateIntervals={disableDateRanges}
  // showMonthDropdown
  // showYearDropdown
  // scrollableYearDropdown
    showWeekNumbers
  />
</div> */}