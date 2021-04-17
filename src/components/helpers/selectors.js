
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

function getInterview(state, interview) {

  if(!interview) {
    return null;
  }
  
  const interviewerId = interview.interviewer;
  let interviewProfile = state.interviewers[interviewerId];
  interview.interviewer = interviewProfile;

return interview;
}

export { getAppointmentsForDay, getInterview };