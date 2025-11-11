import React, { useEffect, useMemo, useState } from 'react'
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import {Stack, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import './Reactdatepicker.css';

const Reactdatepicker = ({sendDataToParent}) => {
    let date =  Date();
    const [selectedDate, setSelectedDate ] = useState(dayjs(date))
    const [selectedTime, setSelectedTime ] = useState(dayjs(date))
    const [formData, setFormData] = useState({
      date: dayjs(),
      time: dayjs(),
      combined: dayjs()
    })

    const now = useMemo(() => dayjs(), []);
    const isToday = selectedDate.isSame(dayjs(), 'day');
    const normalizeMinTime = now.minute(Math.ceil(now.minute() / 5) * 5).second(0)
    const minTime = isToday? normalizeMinTime : dayjs().startOf('day')

    const handleDateChange = (newDate) => {
      if (!newDate) return;
      // const combined = newDate.hour(formData.time.hour())
      //                           .minute(formData.time.minute());
      setFormData({...formData, date: newDate})
      sendDataToParent(formData.date.format('YYYY MM DD'), 'date');
    }

    const handleTimeChange = (newTime) => {
      if (!newTime) return;
      // const combined = formData.date.hour(newTime.hour())
      //                           .minute(newTime.minute());
      setFormData({...formData, time: newTime})
      sendDataToParent(formData.time.format('HH:mm'), 'time');
    }

    useEffect(() => {
      // console.log("Updated Date", formData.date.format('YYYY MM DD'));
      // console.log("Updated time", formData.time.format('HH:mm'));
      // console.log("Updated time", formData.combined.format('YYYY MM DD HH:mm'));
    }, [formData.date, formData.time])
    

    return (
      <div>
        <div className='datepicker'>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="sv">
            <Stack spacing={4} sx={{width:'250px'}}>
              <DatePicker
                label="Välj datum"
                value={formData.date}
                minDate={dayjs()}
                onChange={handleDateChange}
                renderInput= {(params) => <TextField {...params}/>}
              />
            </Stack>
            <Stack spacing={4} sx={{width:'250px'}} className='timepicker'>
              <TimePicker
                label="Välj tid"
                value={formData.time}
                minTime={minTime}
                onChange={handleTimeChange}
                ampm= {false}
                renderInput= {(params) => <TextField {...params}/>}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        <div>
          <b>Selected</b>
          <p>Date: {formData.date.format('YYYY MM DD')}</p>
          <p>Time: {formData.time.format('HH:mm')}</p>
          Combined: {formData.combined.format('YYYY MM DD HH:mm')}
        </div>
    </div>
  )
}

export default Reactdatepicker


    // const handleDateChange = (data, check) => {
    //   if (check === 'date') {
    //     setSelectedDate(data)
    //     sendDataToParent(selectedDate)
        
    //   } else {
    //     setSelectedTime(data)
    //     sendDataToParent(selectedTime)
    //   }
    // }
