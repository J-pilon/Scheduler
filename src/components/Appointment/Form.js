import React, { useState } from "react";

import InterviewerList from "../InteviewerList";
import Button from "../Button";

export default function Form(props) {

  const [ name, setName ] = useState(props.name || "");
  const [ interviewer, setInterviewer ] = useState(props.interviewer || null);

  // const reset = function() {
  //   setName("");
  //   setInterviewer(null);
  // }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => setName(event.target.value)}
            onSubmit={event => event.preventDefault()}
          />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(name, interviewer)
          }>Save</Button>
        </section>
      </section>
    </main>
  )
}