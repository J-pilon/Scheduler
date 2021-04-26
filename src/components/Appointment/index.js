import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from '../../hooks/useVisualMode';
import Form from "./Form";
import Status from './Status';
import Confirm from "./Confirm";
import Error from "./Error";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVING = "ERROR_SAVING";
const ERROR_DELETING = "ERROR_DELETING";

export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    const appointmentId = props.id;
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(appointmentId, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVING, true))
  }

  function deleting() {

    transition(DELETING)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETING, true))

  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={() => transition(EDIT)}
        onDelete={() => transition(CONFIRM)}
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
      {mode === EDIT && (
        <Form
        id={props.id}
        name={props.interview.student}
        interviewers={props.interviewers} 
        interviewer={props.interview.interviewer.id} 
        onSave={save}
        onCancel={back}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving"/>
      )}
      {mode === DELETING && (
        <Status message="Deleting" />
      )}
      {mode === CONFIRM && (
        <Confirm  onCancel={back} onDelete={deleting} message="Are You Sure You Want To Delete?"/>
      )}
      {mode === ERROR_SAVING && (
        <Error message="error while saving" onClose={back} />
      )}
      {mode === ERROR_DELETING && (
        <Error message="error while deleting" onClose={back} />
      )}
    </article>
  )
}

