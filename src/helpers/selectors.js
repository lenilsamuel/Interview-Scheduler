/**
 * Appointments selector function
 * @param {object} state - React state object
 * @param {string} day - name
 * @returns an array of interviews for the given day, or null if not found
 */
export function getAppointmentsForDay(state, day) {
  const output = [];
  const daysArr = state.days;
  let appointmentArr;
  let flag = false;

  if (state.days.length === 0 || !state.days) return [];

  for (let dayItem of daysArr) {
    if (dayItem.name === day) {
      appointmentArr = dayItem.appointments;
      flag = true;
    }
  }
  if (!flag) return [];
  for (let appointment of appointmentArr) {
    if (state.appointments[appointment]) {
      output.push(state.appointments[appointment]);
    }
  }
  return output;
}

/**
 * Interviewers selector function
 * @param {object} state - React state object
 * @param {string} day - name
 * @returns an array of interviewers for the given day, or null if not found
 */
export function getInterviewersForDay(state, day) {
  const output = [];
  const daysArr = state.days;

  if (state.days.length === 0) {
    return [];
  }

  const matchingDayArr = daysArr.filter((d) => d.name === day);

  if (matchingDayArr.length === 0) return [];

  const interviewersIDArr = matchingDayArr[0].interviewers;

  const interviewersObj = state["interviewers"];
  for (let id of interviewersIDArr) {
    if (interviewersObj[id]) {
      output.push(interviewersObj[id]);
    }
  }

  return output;
}

/**
 * Interview selector function
 * @param {object} state - React state object
 * @param {object} interview - interview object
 * @returns interview object
 */
export function getInterview(state, interview) {
  const output = {};
  if (!interview) return null;
  const target = interview.interviewer;
  
  for (let key in state.interviewers) {
    if (Number(key) === target) {
      output["student"] = interview.student;
      output["interviewer"] = state.interviewers[key];
    }
  }

  return output;
}
