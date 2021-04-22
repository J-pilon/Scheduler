import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss"

export default function DayListItem(props) {
  
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });
  
  const formatSpots = function() {
    if(props.spots === 0) {
      return <h3>no spots remaining</h3>
    } 
    if(props.spots === 1) {
      return <h3>{props.spots} spot remaining</h3>
    }
    if(props.spots > 1) {
      return <h3>{props.spots} spots remaining</h3>
    }
  }

  return (
    <li onClick={() => props.setDay(props.name)} data-testid="day" >
      <div className={dayClass}>
        <h2>{props.name}</h2> 
        {formatSpots()}
      </div>
    </li>
  );
}