import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  };

  const deleteApt = (name, interviewer) => {
    const interview = {
      student: name, 
      interviewer,
    };
    console.log('clicked', interview)
    transition(DELETE);
    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => deleteApt(props.interview.student, props.interview.interviewer)}
        />
      )}
      {mode === SAVING && <Status message='Saving' />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === DELETE && <Status message='Deleting'/>}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interviewer}
          onCancel={() => back()}
          onSave={save}
        />
      )}
    </article>
  );
}
