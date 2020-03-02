// import all pieces of the component that are used in the built lib
import ReactWeekCalendar from './ReactWeekCalendar.jsx';
import propTypes from './ReactWeekCalendar.props';

// import styling for component
import './ReactWeekCalendar.scss';

// attach any extra data to the component
ReactWeekCalendar.propTypes = propTypes;

// the exports below will be what the final library exports
export default ReactWeekCalendar;
