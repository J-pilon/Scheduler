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
        
        setState(prev => ({...prev, days: daysValues, appointments: appointmentValues, interviewers: interviewerValues}))
      })
    }, [daysUrl, appointmentUrl, interviewerUrl])

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(res => {console.log("res.data ", res.data);
        setState({...state, appointments});
      })
      // .catch(err => console.log("ERROR ", err.toJSON()))
    // I thought this had to be in a useEffect ^^
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
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(res => {console.log(res.data);
      setState({...state, [id]: appointment});
      })
      // .catch(err => console.log("ERROR ", err.toJSON())) 
  }

  return { state, setDay, bookInterview, cancelInterview }
};
