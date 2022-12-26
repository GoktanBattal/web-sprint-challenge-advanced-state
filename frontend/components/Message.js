import React from 'react';
import { connect } from 'react-redux';

export function Message(props) {
  return <div id="message">{props.messageState}</div>;
}
const mapStateToProps = (state) => ({
  messageState: state.infoMessage
});

export default connect(mapStateToProps, {})(Message);
