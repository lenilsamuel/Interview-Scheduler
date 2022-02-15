import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const interviewDays = props.days.map((days) => {
    return (
      <DayListItem
        key={days.id}
        name={days.name}
        spots={days.spots}
        selected={days.name === props.value}
        setDay = {props.setDay}
      />
    );
  });
  return (<ul>
    {interviewDays}
  </ul>);
}
