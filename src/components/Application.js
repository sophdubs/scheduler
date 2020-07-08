import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";

import { getAppointmentsForDay } from "../helpers/selectors";


export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    const fetchDays = axios.get('/api/days');
    const fetchAppointments = axios.get('/api/appointments');
    Promise.all([fetchDays, fetchAppointments])
      .then(([daysRes, aptRes]) => {
        setState(prev => ({...prev, days: daysRes.data, appointments: aptRes.data}));
      })
  }, []);

  const setDay = day => {
    setState({...state, day});
  }

  const appointments = getAppointmentsForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map(appointment => (
          <Appointment key={appointment.id} {...appointment}  />
        ))}
      </section>
    </main>
  );
}
