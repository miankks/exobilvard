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
const initialValues =    {
  startedAt: '', // this might be an issue
  endsAt: dayjs(),
}

const Reactdatepicker = ({sendDataToParent}) => {
  let date =  Date();

    const [selectedDate, setSelectedDate ] = useState(initialValues)
    // const [selectedDate, setSelectedDate ] = useState(dayjs(date))
    const [selectedTime, setSelectedTime ] = useState(dayjs(date))

    const handleDateChange = (date, dateType) => {
      setSelectedDate({...selectedDate, [dateType]: date})
      console.log(selectedDate);
      
      sendDataToParent(selectedDate)
    }
     const handleTimeChange = async(data) => {
      setSelectedTime(data)
      sendDataToParent(selectedTime)

    }
    return (
      <div>
        <h4>Välj tid</h4>
        <div className='datepicker'>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="sv">
            <Stack spacing={4} sx={{width:'250px'}}>
              <DatePicker
                label="Välj datum"
                // value={selectedDate}
                value={datejs(formData.dateAvailable)}
                onChange={(newValue) => handleDateChange(newValue, "startedAt")}
              />
            </Stack>
            <Stack spacing={4} sx={{width:'250px'}} className='timepicker'>
              <TimePicker
                label="Välj tid"
                value={selectedTime}
                onChange={(newValue) => handleTimeChange(newValue)}
              />
            </Stack>
          </LocalizationProvider>
        </div>
    </div>
  )
}

export default Reactdatepicker
