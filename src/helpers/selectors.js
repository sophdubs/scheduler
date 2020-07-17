// Selects appointments for given day and returns them in an array
export function getAppointmentsForDay(state, day) {
  if (!state.days || !state.appointments) {
    return [];
  }
  
  let appt =[];
  const sol = [];
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

// Selects interviewers for given day and returns them in an array
export function getInterviewersForDay(state, day) {
  if (!state.days || !state.interviewers) {
    return [];
  }
  
  let interviewerList =[];
  const sol = [];
  for (const stateDay of state.days) {
    if (stateDay.name === day) {
      interviewerList = stateDay.interviewers;
    }
  }
  
  for (const interviewer of Object.values(state.interviewers)) {
    if (interviewerList.includes(interviewer.id)) {
      sol.push(interviewer);
    }
  }
  return sol;
}

// Fetches the interviewer details and returns an interview object including the interviewer details
export function getInterview(state, interview) {
  if (!interview) return null;
  const interviewerId = interview.interviewer;
  const interviewerDetails = state.interviewers[interviewerId];
  return {...interview, interviewer: interviewerDetails};
}