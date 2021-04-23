import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss"

export default function DayListItem(props) {
  
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });
 
  return (
    <li>
      <div className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
        <h2>{props.name}</h2> 
        <h3>{props.spots === 0 ? (`no spots remaining`) : (props.spots === 1 ? (`${props.spots} spot remaining`) : (`${props.spots} spots remaining`)  )}</h3>
      </div>
    </li>
  );
}