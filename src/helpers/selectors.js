// returns an array of appointment objects for the current day
function getAppointmentsForDay(state, day) {
 
  const days = state.days;
  const currentDay = days.find(item => item.name === day);
  if (!currentDay || state.days.length === 0) {
    return [];
  }
  const appointmentIds = currentDay.appointments;
  const appointments = appointmentIds.map(id => state.appointments[id]);

  return appointments;
}

// returns an interview object
// instead of just an id for the interviewer property, the avatar and name
function getInterview(state, interview) {

  if(!interview) {
    return null;
  }
  
  const interviewerId = interview.interviewer;
  let interviewerProfile = state.interviewers[interviewerId];
  const updatedInterview = {...interview, interviewer: interviewerProfile}

return updatedInterview;
}

// returns an array of objects that contain the interviewers id, name and avatar for that day
function getInterviewersForDay(state, day) {
 
  const days = state.days;
  const currentDay = days.find(item => item.name === day);
  if (!currentDay || state.days.length === 0) {
    return [];
  }

  const interviewersForDayId = currentDay.interviewers;
  const interviewersForDay = interviewersForDayId.map(id => state.interviewers[id]);

  return interviewersForDay;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };