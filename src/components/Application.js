import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList.js";
import InterviewerListItem from "components/InterviewerListItem.js";
import Appointment from "./Appointment";
import axios from "axios";
import getAppointmentsForDay from "./helpers/selectors";


export default function Application(props) {

  const [state, setState ] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    inteviewers: {}
  })

  const setDay = day => setState({ ...state, day });
  
  
  const daysUrl = `http://localhost:8001/api/days`;
  const appointmentUrl = `http://localhost:8001/api/appointments`;
  const interviewerUrl = `http://localhost:8001/api/interviewers`;
  
  useEffect(() => {
    const daysPromise = axios.get(daysUrl);
    const appointmentPromise = axios.get(appointmentUrl);
    const interviewerPromise = axios.get(interviewerUrl);

    Promise.all([daysPromise, appointmentPromise, interviewerPromise])
      .then(all => {
        const daysValues = all[0].data;
        const appointmentValues = all[1].data
        const interviewerValues = all[2].data

        console.log("!!!! ", interviewerValues);
        
        setState(prev => ({...prev, days: daysValues, appointments: appointmentValues, inteviewers: interviewerValues}))
      })
    }, [])
   
    
    const dailyAppointments = getAppointmentsForDay(state, state.day);    

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
        <InterviewerListItem />
        {dailyAppointments.map(appointment => <Appointment key={appointment.id} {...appointment} />)}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
