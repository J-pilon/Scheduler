import React from "react";

import "components/InteviewerList.scss";
import InteviewerListItem from "components/InterviewerListItem.js";

export default function InteviewerList(props) {

  const interviewers = props.interviewers;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map(interviewer => 
          <InteviewerListItem 
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === props.interviewer}
            setInterviewer={() => props.setInterviewer(interviewer.id)}
          />
        )}       
      </ul>
    </section>
  )
};