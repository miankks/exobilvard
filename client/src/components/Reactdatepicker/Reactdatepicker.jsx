import React, { useState } from 'react'
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

    const handleDateChange = (data, check) => {
      if (check === 'date') {
        setSelectedDate(data)
        sendDataToParent(selectedDate)
        
      } else {
        setSelectedTime(data)
        sendDataToParent(selectedTime)
      }
    }
    return (
      <div>
        <div className='datepicker'>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="sv">
            <Stack spacing={4} sx={{width:'250px'}}>
              <DatePicker
                label="Välj datum"
                value={selectedDate}
                onChange={(e) => handleDateChange(e, 'date')}
                renderInput= {(params) => <TextField {...params}/>}
              />
            </Stack>
            <Stack spacing={4} sx={{width:'250px'}} className='timepicker'>
              <TimePicker
                label="Välj tid"
                value={selectedTime}
                onChange={(e) => handleDateChange(e, 'time')}
              />
            </Stack>
          </LocalizationProvider>
        </div>
    </div>
  )
}

export default Reactdatepicker
