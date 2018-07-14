import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as calendarActions from "../../actions/calendarActions";

class Date extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: this.props.date === this.props.value };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.date === nextProps.value) !== this.state.active) {
      this.setState({ active: nextProps.date === nextProps.value });
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.props.calendarActions.setDate(this.props.value);
  }

  render() {
    let className = "calendar-date";
    if (this.props.isSunday) className += " sunday";
    if (this.state.active) className += " selected";
    let date = this.props.value ? (
      <td onClick={this.handleClick} className={className}>
        {this.props.value}
      </td>
    ) : (
      <td />
    );
    return date;
  }
}

Date.propTypes = {
  value: PropTypes.number.isRequired,
  date: PropTypes.number.isRequired,
  calendarActions: PropTypes.object.isRequired,
  isSunday: PropTypes.bool
};

const mapStateToProps = state => ({
  date: state.calendar.date
});

const mapDispatchToProps = dispatch => ({
  calendarActions: bindActionCreators(calendarActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Date);
