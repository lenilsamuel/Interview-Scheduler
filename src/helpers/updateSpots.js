/**
 * Function to update spots remaining on appointment creation & deletion
 * @param {string} action - 'book' to update spots by decrementing
 * @param {object} state - React state object
 * @returns [daysArr] - an array of days with the updated spots remaining 
 */

export default function updateSpots(action, state) {
  const selectedDay = state.day;
  const daysArr = [...state.days];
  daysArr.forEach((day) => {
    if (day.name === selectedDay) {
      if (action === "book") {
        day.spots -= 1;
      } else {
        day.spots += 1;
      }
    }
  });
  return daysArr;
}
