import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as eventsActions from "../../actions/eventsActions";

class EventCard extends React.Component {
  constructor(props) {
    super(props);
    this.deleteThisEvent = this.deleteThisEvent.bind(this);
  }

  deleteThisEvent() {
    this.props.eventsActions.deleteEvent(this.props.id);
  }

  render() {
    return (
      <div className="events-card" key={this.props.id}>
        <span className="close-btn" onClick={this.deleteThisEvent}>
          &times;
        </span>
        <div className="card-content">{this.props.title}</div>
      </div>
    );
  }
}

EventCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  eventsActions: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  eventsActions: bindActionCreators(eventsActions, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(EventCard);
