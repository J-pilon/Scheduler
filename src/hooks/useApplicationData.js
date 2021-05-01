import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {
  const [state, setState ] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });

  useEffect(() => {

    const daysPromise = axios.get(`/api/days`);
    const appointmentPromise = axios.get(`/api/appointments`);
    const interviewerPromise = axios.get(`/api/interviewers`);
    
    Promise.all([daysPromise, appointmentPromise, interviewerPromise])
    .then(all => {
      const daysValues = all[0].data
      const appointmentValues = all[1].data
      const interviewerValues = all[2].data
      setState(prev => ({...prev, days: daysValues, appointments: appointmentValues, interviewers: interviewerValues}))
    })
  }, [])

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const { emptySpots, dayId } = updateSpots(state.days, state.day, appointments);

    const day = {
      ...state.days[dayId - 1], 
      spots: emptySpots
    };

    const days = [...state.days];
    days[dayId - 1] = day;
    
        return axios.put(`/api/appointments/${id}`, { interview })
      .then(res => {console.log("res.data ", res.data);
        setState({...state, appointments, days});

      })
      .catch(err => console.log("ERROR ", err.toJSON()))
  };

  
  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const { emptySpots, dayId } = updateSpots(state.days, state.day, appointments);

    const day = {
      ...state.days[dayId - 1], 
      spots: emptySpots
    };
    const days = [...state.days];
    days[dayId - 1] = day;

    return axios.delete(`/api/appointments/${id}`)
      .then(res => {console.log(res);
      setState({...state, appointments, days});
      })
      .catch(err => console.log("ERROR ", err.toJSON())) 
  }
  return { state, setDay, bookInterview, cancelInterview }
};

// after an appointment is added or deleted the spots remaining are updated
function updateSpots(days, currentDay, dayAppointments) {

  const dayObj = days.find(day => day.name === currentDay);
  
  const dayId = dayObj.id;
  const spots = dayObj.appointments.filter(id => dayAppointments[id].interview === null);
  const emptySpots = spots.length;

  return { emptySpots, dayId };
}
