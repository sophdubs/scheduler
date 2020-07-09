
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

export function getInterview(state, interview) {
  if (!interview) return null;
  const interviewerId = interview.interviewer;
  const interviewerDetails = state.interviewers[interviewerId];
  return {...interview, interviewer: interviewerDetails};
}