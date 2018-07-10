import React from "react";
import PropTypes from "prop-types";

class EventCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="events-card">
        <span className="close-btn">&times;</span>
        <div className="card-time">{this.props.time}</div>
        <div className="card-content">{this.props.content}</div>
      </div>
    );
  }
}

EventCard.propTypes = {
  time: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default EventCard;
