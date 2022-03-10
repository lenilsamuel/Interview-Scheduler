import { useState, useEffect } from "react";
import axios from "axios";
import updateSpots from "helpers/updateSpots";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const daysUrl = `api/days`;
    const appointmentsUrl = "api/appointments";
    const interviewersUrl = "api/interviewers";

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
    return axios.put(`api/appointments/${id}`, appointment).then(() => {
      if (!state.appointments[id].interview) {
        const days = updateSpots("book", state);
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
      const days = updateSpots("cancel", state);
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
