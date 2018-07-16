import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Date from "./Date";
import CreateEvent from "../events/createEvent";
import EventCard from "../events/EventCard";
import * as calendarUtils from "../../utils/calendarUtils";
import * as calendarActions from "../../actions/calendarActions";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      month: this.props.month,
      year: this.props.year,
      events: this.props.events,
      isCreateEventPopupActive: false
    };
    this.makeCalendar = this.makeCalendar.bind(this);
    this.previousMonthHandler = this.previousMonthHandler.bind(this);
    this.nextMonthHandler = this.nextMonthHandler.bind(this);
    this.showCreateEventPopup = this.showCreateEventPopup.bind(this);
    this.hideCreateEventPopup = this.hideCreateEventPopup.bind(this);
    this.closeCreateEventPopup = this.closeCreateEventPopup.bind(this);
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
    if (nextProps.events !== this.state.events) {
      this.setState({ events: nextProps.events });
    }
  }

  /**
   * generates calendar
   *
   * @returns {JSX}
   */
  makeCalendar() {
    let list = [];
    let weeks = [];
    let calendar;
    let day = 1;
    const numDays = calendarUtils.getNumDaysInMonth(
      this.state.month,
      this.state.year
    );
    const start = calendarUtils.getDayOfMonth(
      1,
      this.state.month,
      this.state.year
    );

    if (start !== 0) for (let i = 0; i < start; i++) list[i] = 0;
    for (let i = start; i < start + numDays; i++) list[i] = day++;
    for (let i = start + numDays; i < 42; i++) list[i] = 0;

    for (let i = 0; i < 6; i++) {
      weeks[i] = (
        <tr>
          <Date value={list[i * 7 + 0]} isSunday />
          <Date value={list[i * 7 + 1]} />
          <Date value={list[i * 7 + 2]} />
          <Date value={list[i * 7 + 3]} />
          <Date value={list[i * 7 + 4]} />
          <Date value={list[i * 7 + 5]} />
          <Date value={list[i * 7 + 6]} />
        </tr>
      );
    }
    calendar = (
      <table className="calendar-table">
        <thead>
          <tr>
            <th className="sunday">Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {weeks[0]}
          {weeks[1]}
          {weeks[2]}
          {weeks[3]}
          {weeks[4]}
          {weeks[5]}
          {weeks[6]}
        </tbody>
      </table>
    );
    return calendar;
  }

  previousMonthHandler() {
    const newDay = calendarUtils.previousMonth(
      this.state.date,
      this.state.month,
      this.state.year
    );
    this.props.calendarActions.setDate(newDay[0]);
    this.props.calendarActions.setMonth(newDay[1]);
    this.props.calendarActions.setYear(newDay[2]);
  }

  nextMonthHandler() {
    const newDay = calendarUtils.nextMonth(
      this.state.date,
      this.state.month,
      this.state.year
    );
    this.props.calendarActions.setDate(newDay[0]);
    this.props.calendarActions.setMonth(newDay[1]);
    this.props.calendarActions.setYear(newDay[2]);
  }

  showCreateEventPopup(e) {
    e.preventDefault();
    this.setState({ isCreateEventPopupActive: true }, () => {
      document.addEventListener("click", this.hideCreateEventPopup);
    });
  }

  closeCreateEventPopup() {
    this.setState({ isCreateEventPopupActive: false }, () => {
      document.removeEventListener("click", this.hideCreateEventPopup);
    });
  }

  hideCreateEventPopup(e) {
    if (!this.createEventMenu.contains(e.target)) this.closeCreateEventPopup();
  }

  render() {
    const calendar = this.makeCalendar();
    const events = (
      <div className="info-events">
        {this.props.events.map(
          event =>
            this.props.date === event.date &&
            this.props.month === event.month &&
            this.props.year === event.year && (
              <EventCard {...event} key={event.id} />
            )
        )}
      </div>
    );
    return (
      <div className="calendar">
        <div
          className="arrow-btn arrow-btn--left"
          onClick={this.previousMonthHandler}
        >
          &lt;
        </div>
        <div className="calendar-heading">Dayts</div>
        <div className="calendar-container">
          {calendar}
          <div className="calendar-info">
            <div className="info-date">
              <div>
                {this.state.date + " "}
                {calendarUtils.nameOfMonth(this.state.month) + ", "}
                {this.state.year}
              </div>
              <div
                className={
                  this.state.isCreateEventPopupActive
                    ? "date-new-event active"
                    : "date-new-event inactive"
                }
                title="Create new event"
                onClick={this.showCreateEventPopup}
              />
              {this.state.isCreateEventPopupActive && (
                <div
                  className="create-event-container"
                  ref={element => {
                    this.createEventMenu = element;
                  }}
                >
                  <CreateEvent close={this.closeCreateEventPopup} />
                </div>
              )}
            </div>
            {events}
          </div>
        </div>
        <div
          className="arrow-btn arrow-btn--right"
          onClick={this.nextMonthHandler}
        >
          &gt;
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  date: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  events: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  date: state.calendar.date,
  month: state.calendar.month,
  year: state.calendar.year,
  events: state.events
});

const mapDispatchToProps = dispatch => ({
  calendarActions: bindActionCreators(calendarActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
