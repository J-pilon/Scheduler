import React from "react";

import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  
  console.log("props.days &&& ", props.days);

  const days = props.days;
  const dayList = days.map(day => {
    return <DayListItem
      key={day.id}
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}  />
  })

  return (
    <ul>{dayList}</ul>
  );
}