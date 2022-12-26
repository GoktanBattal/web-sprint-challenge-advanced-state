import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators';

export function Quiz(props) {
  if (!props.quizState) {
    useEffect(() => {
      props.fetchQuiz();
    }, []);
  }

  const answerSelected = (e) => {
    props.selectAnswer(e.target.id);
  };

  const submitForm = () => {
    props.postAnswer(props.quizState.quiz_id, props.selectedAnswerState === 'choice1' ? props.quizState.answers[0].answer_id : props.quizState.answers[1].answer_id);
  };

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quizState ? (
          <>
            <h2>{props.quizState.question}</h2>

            <div id="quizAnswers">
              <div className={props.selectedAnswerState === 'choice1' ? 'answer selected' : 'answer'}>
                {props.quizState.answers[0].text}
                <button id={'choice1'} onClick={answerSelected}>
                  {props.selectedAnswerState === 'choice1' ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className={props.selectedAnswerState === 'choice2' ? 'answer selected' : 'answer'}>
                {props.quizState.answers[1].text}
                <button id={'choice2'} onClick={answerSelected}>
                  {props.selectedAnswerState === 'choice2' ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onClick={submitForm} disabled={!props.selectedAnswerState}>
              Submit answer
            </button>
          </>
        ) : (
          'Loading next quiz...'
        )
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  quizState: state.quiz,
  selectedAnswerState: state.selectedAnswer
});

export default connect(mapStateToProps, { fetchQuiz, selectAnswer, postAnswer })(Quiz);
