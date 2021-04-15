import React from "react";

import "components/InteviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const nameItem = classNames({
    "interviewers__item--selected": props.selected
  });
  
  return (
    <li className={nameItem}>    
      <img
        onClick={props.setInterviewer}
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}