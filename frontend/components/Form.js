import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Form(props) {
  const onChange = (evt) => {
    const { id, value } = evt.target;
    props.inputChange(id, value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const payload = {
      newQuestion: props.form.newQuestion,
      newTrueAnswer: props.form.newTrueAnswer,
      newFalseAnswer: props.form.newFalseAnswer
    };
    props.postQuiz(payload);
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={props.form.newQuestion} />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={props.form.newTrueAnswer} />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={props.form.newFalseAnswer} />
      <button id="submitNewQuizBtn" disabled={!props.form.newQuestion.trim() || !props.form.newTrueAnswer.trim() || !props.form.newFalseAnswer.trim()}>
        Submit new quiz
      </button>
    </form>
  );
}

export default connect((st) => st, actionCreators)(Form);
