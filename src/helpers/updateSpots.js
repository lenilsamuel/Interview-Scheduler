const updateSpots = (action, state) => {
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
};

export default function updateSpots();