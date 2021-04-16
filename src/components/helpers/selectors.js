
export default function getAppointmentsForDay(state, day) {
 
  const days = state.days;
  const currentDay = days.find(item => item.name === day);
  if (!currentDay || state.days.length === 0) {
    return [];
  }
  const appointmentIds = currentDay.appointments;
  const appointments = appointmentIds.map(id => state.appointments[id]);

  return appointments;
}