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
