
export function getAppointmentsForDay(state, day) {
  if (!state.days || !state.appointments) {
    return [];
  }
  
  let appt =[];
  let sol = [];
  for (const stateDay of state.days) {
    if (stateDay.name === day) {
      appt = stateDay.appointments;
    }
  }
  
  for (const stateApt of Object.values(state.appointments)) {
    if (appt.includes(stateApt.id)) {
      sol.push(stateApt);
    }
  }
  return sol;
}