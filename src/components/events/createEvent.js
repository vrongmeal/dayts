import React from "react";
import { connect } from "react-redux";

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="create-event-box" />;
  }
}

export default connect()(CreateEvent);
