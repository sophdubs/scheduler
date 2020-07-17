import axios from "axios";
import {useState, useEffect} from 'react';

// All of the apps state management has been factored out into this file
export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });
  
  // Makes the axios calls once when page is rendered
  useEffect(() => {
    const fetchDays = axios.get('/api/days');
    const fetchAppointments = axios.get('/api/appointments');
    const fetchInterviewers = axios.get('/api/interviewers');
    Promise.all([fetchDays, fetchAppointments, fetchInterviewers])
      .then(([daysRes, aptRes, intRes]) => {
        setState(prev => ({...prev, days: daysRes.data, appointments: aptRes.data, interviewers: intRes.data}));
      })
  }, []);
  
  // Updates selected day 
  const setDay = day => {
    setState({...state, day});
  }
  
  // Updates number of spots available (+1 or -1) when user books or deletes an interview
  const updateSpots = (id, increase) => {
    state.days.forEach(day => {
      if(day.appointments.includes(id)) {
        if (increase) {
          day.spots += 1;
        } else {
          day.spots -= 1;
        }
      }
    })
  }

  // Adds the interview to the db and the state
  const bookInterview = (id, interview) => {
    const isNew = state.appointments[id].interview === null;
    const appointment = {
        ...state.appointments[id],
        interview: {...interview}
      }
    
    const appointments = {
        ...state.appointments, 
        [id]: appointment
      };
    
    return axios.put(`/api/appointments/${id}`, {...appointment})
      .then(response => {
        isNew && updateSpots(id, false);
        setState({...state, appointments});
      })
  };
  
  // Removes the interview from the db and the state
  const cancelInterview = (id) => {
    const appointment = {
        ...state.appointments[id],
        interview: null
      }
    
    const appointments = {
        ...state.appointments,
        [id]: appointment
      }
  
    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        updateSpots(id, true);
        setState({...state, appointments})
      })
  };

  // Returns these functions that can be used elsewhere in the app to manage the state
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}