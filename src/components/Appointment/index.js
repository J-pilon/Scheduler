import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from '../../hooks/useVisualMode';
import Form from "./Form";
import Status from './Status';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const appointmentId = props.id;
    // confused about how to input appointment id, so added this ^^

    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(appointmentId, interview)
      .then(() => transition(SHOW));
  }

  console.log("!!!! ", props);

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
      />
      )}
      {mode === CREATE && (
      <Form 
      id={props.id}
      interviewers={props.interviewers} 
      onSave={save}
      onCancel={back}
      />
      )}
      {mode === SAVING && (
        <Status message="saving"/>
      )}
    </article>
  )
}

// question about onSave, onEdit, and onDelete