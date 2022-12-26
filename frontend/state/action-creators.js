// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios';
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM } from './action-types';

export function moveClockwise() {
  return {
    type: MOVE_CLOCKWISE
  };
}

export function moveCounterClockwise() {
  return {
    type: MOVE_COUNTERCLOCKWISE
  };
}

export function selectAnswer(answerId) {
  return {
    type: SET_SELECTED_ANSWER,
    payload: answerId
  };
}

export function setMessage(message) {
  return {
    type: SET_INFO_MESSAGE,
    payload: message
  };
}

export function setQuiz(data) {
  return {
    type: SET_QUIZ_INTO_STATE,
    payload: data
  };
}

export function inputChange(id, value) {
  return {
    type: INPUT_CHANGE,
    payload: { id, value }
  };
}

export function resetForm() {
  return {
    type: RESET_FORM
  };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios
      .get('http://localhost:9000/api/quiz/next')
      .then((response) =>
        dispatch({
          type: SET_QUIZ_INTO_STATE,
          payload: response.data
        })
      )
      .catch((error) => dispatch(setMessage(error.message)));
  };
}
export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    const payload = {
      quiz_id,
      answer_id
    };
    axios.post('http://localhost:9000/api/quiz/answer', payload).then((response) => {
      dispatch(selectAnswer(null));
      dispatch(setMessage(response.data.message));
      axios
        .get('http://localhost:9000/api/quiz/next')
        .then((next) => dispatch({ type: SET_QUIZ_INTO_STATE, payload: next.data }))
        .catch((error) => dispatch(setMessage(error.message)));
    });
  };
}
export function postQuiz(data) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    const payload = {
      question_text: data.newQuestion,
      true_answer_text: data.newTrueAnswer,
      false_answer_text: data.newFalseAnswer
    };
    axios
      .post('http://localhost:9000/api/quiz/new', payload)
      .then((response) => {
        dispatch(setMessage(`Congrats: "${response.data.question}" is a great question!`));
        dispatch(resetForm());
      })
      .catch((error) => dispatch(setMessage(error.message)));
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
