import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as eventsActions from "../../actions/eventsActions";

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      month: this.props.month,
      year: this.props.year
    };
    this.submitForm = this.submitForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.state.date) {
      this.setState({ date: nextProps.date });
    }
    if (nextProps.month !== this.state.month) {
      this.setState({ month: nextProps.month });
    }
    if (nextProps.year !== this.state.year) {
      this.setState({ year: nextProps.year });
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.eventsActions.createEvent(
      this.eventTitle.value.trim(),
      this.state.date,
      this.state.month,
      this.state.year
    );
    this.props.close();
  }

  render() {
    return (
      <form className="create-event-box" onSubmit={this.submitForm}>
        <div className="create-event-heading">Create new event</div>
        <input
          type="text"
          placeholder="Title"
          className="create-event-title-q"
          ref={ele => {
            this.eventTitle = ele;
          }}
        />
        <div>
          <button
            type="submit"
            className="create-event-button create-event--submit-button"
          >
            Create
          </button>
          <button
            type="button"
            className="create-event-button create-event--cancel-button"
            onClick={this.props.close}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

CreateEvent.propTypes = {
  close: PropTypes.func.isRequired,
  date: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  eventsActions: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired
};

const mapStateWithProps = state => ({
  date: state.calendar.date,
  month: state.calendar.month,
  year: state.calendar.year,
  events: state.events
});

const mapDispatchWithProps = dispatch => ({
  eventsActions: bindActionCreators(eventsActions, dispatch)
});

export default connect(
  mapStateWithProps,
  mapDispatchWithProps
)(CreateEvent);
