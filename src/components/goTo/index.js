import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as calendarActions from "../../actions/calendarActions";
import { isValidDate, nameOfMonth } from "../../utils/calendarUtils";

class GoTo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      month: this.props.month,
      year: this.props.year
    };
    this.today = new Date();
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTodayClick = this.handleTodayClick.bind(this);
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

  handleDateChange(e) {
    if (e.target.value) this.setState({ date: Number(e.target.value) });
    else {
      this.setState({ date: this.today.getDate() });
    }
  }

  handleMonthChange(e) {
    if (e.target.value) this.setState({ month: Number(e.target.value) });
    else {
      this.setState({ month: this.today.getMonth() + 1 });
    }
  }

  handleYearChange(e) {
    if (e.target.value) this.setState({ year: Number(e.target.value) });
    else {
      this.setState({ year: this.today.getFullYear() });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const date = this.state.date;
    const month = this.state.month;
    const year = this.state.year;
    if (isValidDate(date, month, year)) {
      this.props.calendarActions.setDate(date);
      this.props.calendarActions.setMonth(month);
      this.props.calendarActions.setYear(year);
    } else {
      alert("Invalid Date");
    }
  }

  handleTodayClick() {
    this.props.calendarActions.setDate(this.today.getDate());
    this.props.calendarActions.setMonth(this.today.getMonth() + 1);
    this.props.calendarActions.setYear(this.today.getFullYear());
  }

  render() {
    return (
      <form className="goto-bar">
        <div className="bar-heading">Time Machine</div>
        <div className="bar-today"  onClick={this.handleTodayClick}>
          <div className="today-heading">Today</div>
          <div className="today-date">
            {this.today.getDate() + " "}
            {nameOfMonth(this.today.getMonth() + 1) + ", "}
            {this.today.getFullYear()}
          </div>
        </div>
        <input
          type="number"
          placeholder="Date"
          className="bar-input date"
          onChange={this.handleDateChange}
        />
        <input
          type="number"
          placeholder="Month"
          className="bar-input month"
          onChange={this.handleMonthChange}
        />
        <input
          type="number"
          placeholder="Year"
          className="bar-input year"
          onChange={this.handleYearChange}
        />
        <button
          type="submit"
          className="bar-submit"
          onClick={this.handleSubmit}
        >
          Go
        </button>
      </form>
    );
  }
}

GoTo.propTypes = {
  date: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  calendarActions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  date: state.calendar.date,
  month: state.calendar.month,
  year: state.calendar.year
});

const mapDispatchToProps = dispatch => ({
  calendarActions: bindActionCreators(calendarActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GoTo);
