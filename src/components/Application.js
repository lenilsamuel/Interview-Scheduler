import React, { useEffect, useState } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from "axios";

const appointments = {
  1: {
    id: 1,
    time: "12pm",
  },
  2: {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  3: {
    id: 3,
    time: "2pm",
  },
  4: {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      },
    },
  },
  5: {
    id: 5,
    time: "4pm",
  },
};

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
  });

  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => {
    setState(prev => ({...prev, days}))
    // setState({ ...state }, days);
  };

  useEffect(() => {
    const daysUrl = `http://localhost:8001/api/days`;
    axios.get(daysUrl).then((response) => {
      console.log(response.data);
      setDays([...response.data]);
    });
  }, []);

  const appointmentsArr = Object.values(appointments);

  const appointmentData = appointmentsArr.map((appointment) => {
    return <Appointment key={appointment.id} {...appointment} />;
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentData}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
