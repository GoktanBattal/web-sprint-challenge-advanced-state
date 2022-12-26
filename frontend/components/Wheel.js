import React from 'react';
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

export function Wheel(props) {
  const move = (event) => {
    if (event.target.id === 'counterClockwiseBtn') {
      props.moveCounterClockwise();
    }
    if (event.target.id === 'clockwiseBtn') {
      props.moveClockwise();
    }
  };
  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={props.wheelState === 0 ? `cog active` : `cog`} style={{ '--i': 0 }}>
          {props.wheelState === 0 ? 'B' : ''}
        </div>
        <div className={props.wheelState === 1 ? `cog active` : `cog`} style={{ '--i': 1 }}>
          {props.wheelState === 1 ? 'B' : ''}
        </div>
        <div className={props.wheelState === 2 ? `cog active` : `cog`} style={{ '--i': 2 }}>
          {props.wheelState === 2 ? 'B' : ''}
        </div>
        <div className={props.wheelState === 3 ? `cog active` : `cog`} style={{ '--i': 3 }}>
          {props.wheelState === 3 ? 'B' : ''}
        </div>
        <div className={props.wheelState === 4 ? `cog active` : `cog`} style={{ '--i': 4 }}>
          {props.wheelState === 4 ? 'B' : ''}
        </div>
        <div className={props.wheelState === 5 ? `cog active` : `cog`} style={{ '--i': 5 }}>
          {props.wheelState === 5 ? 'B' : ''}
        </div>
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={() => props.moveCounterClockwise()}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={() => props.moveClockwise()}>
          Clockwise
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  wheelState: state.wheel
});

export default connect(mapStateToProps, { moveClockwise, moveCounterClockwise })(Wheel);
