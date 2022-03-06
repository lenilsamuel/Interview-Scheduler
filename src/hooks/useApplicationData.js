import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const updateSpots = (action) => {
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

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const daysUrl = `http://localhost:8001/api/days`;
    const appointmentsUrl = "http://localhost:8001/api/appointments";
    const interviewersUrl = "http://localhost:8001/api/interviewers";

    const getDays = axios.get(daysUrl);
    const getAppointments = axios.get(appointmentsUrl);
    const getInterviewer = axios.get(interviewersUrl);

    Promise.all([getDays, getAppointments, getInterviewer]).then((response) => {
      setState({
        ...state,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      });
    });
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    console.log(state.appointments);
    return axios.put(`api/appointments/${id}`, appointment).then(() => {
      if (!state.appointments[id].interview) {
        const days = updateSpots("book");
        setState({
          ...state,
          appointments,
          days,
        });
      } else {
        setState({
          ...state,
          appointments,
        });
      }
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`api/appointments/${id}`, appointment).then(() => {
      const days = updateSpots("cancel");
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
