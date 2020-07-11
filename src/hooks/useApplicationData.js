import axios from "axios";
import {useState, useEffect} from 'react';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });
  
  useEffect(() => {
    const fetchDays = axios.get('/api/days');
    const fetchAppointments = axios.get('/api/appointments');
    const fetchInterviewers = axios.get('/api/interviewers');
    Promise.all([fetchDays, fetchAppointments, fetchInterviewers])
      .then(([daysRes, aptRes, intRes]) => {
        setState(prev => ({...prev, days: daysRes.data, appointments: aptRes.data, interviewers: intRes.data}));
      })
  }, []);
        
  const setDay = day => {
    setState({...state, day});
  }
          
  const bookInterview = (id, interview) => {
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
        setState({...state, appointments});
      })
  };
                
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
        setState({...state, appointments})
      })
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}