import React, { useEffect, useMemo, useState } from 'react'
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import {Stack, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import minMax from "dayjs/plugin/minMax";
import 'dayjs/locale/sv';
import './Reactdatepicker.css';

const Reactdatepicker = ({sendDataToParent, selectime}) => {
    const [formData, setFormData] = useState({
      date: dayjs(),
      time: dayjs(),
      combined: dayjs()
    })
    dayjs.extend(minMax);

    const isToday = formData.date.isSame(dayjs(), 'day');
    const now = dayjs();
    const minWorkTime = dayjs().hour(9).minute(0).second(0)
    const maxWorkTime = dayjs().hour(17).minute(0).second(0)

    const minTime = isToday
                    ? dayjs.max(now, minWorkTime)   // pick whichever is later
                      : minWorkTime;

    const saturdayMinTime = dayjs().hour(9).minute(0).second(0)
    const saturdayMaxTime = dayjs().hour(15).minute(0).second(0)

    // Dynamic time limits based on selected date
    const selectedDay = formData.date.day()
    const isSaturday = selectedDay === 6

    const minTimeForDay = isSaturday ? saturdayMinTime : minWorkTime
    const maxTimeForDay = isSaturday ? saturdayMaxTime : maxWorkTime

    // helper to compute and push updated state instantly
    const updateFormData = (newDate, newTime) => {
      const combined = newDate
                          .hour(newTime.hour())
                          .minute(newTime.minute())
                          .second(0);
          
      const updated = {date: newDate, time: newTime, combined};
      setFormData(updated) // always send the correct, current value

      if(sendDataToParent) {
        sendDataToParent(updated)
      }
    }

    const handleDateChange = (newDate) => {
      if (!newDate) return;
      updateFormData(newDate, formData.time)
    }

    const handleTimeChange = (newTime) => {
      if (!newTime) return;
      updateFormData(formData.date, newTime)
    }

    return (
      <div>
        <div className='datepicker'>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="sv">
            <Stack spacing={4} sx={{width:'250px'}}>
              <DatePicker
                label={selectime}
                value={formData.date}
                minDate={dayjs()}
                onChange={handleDateChange}
                shouldDisableDate={(date) => date.day() === 0}
                renderInput= {(params) => <TextField {...params}/>}
              />
            </Stack>
            <Stack spacing={4} sx={{width:'250px'}} className='timepicker'>
              <TimePicker
                label="Välj tid"
                value={formData.time}
                minTime={minTime}
                maxTime={maxTimeForDay}
                onChange={handleTimeChange}
                ampm= {false}
                renderInput= {(params) => <TextField {...params}/>}
              />
            </Stack>
          </LocalizationProvider>
        </div>
    </div>
  )
}

export default Reactdatepicker
