// import all pieces of the component that are used in the built lib
import ReactMonthCalendar from './ReactMonthCalendar.jsx';
import propTypes from './ReactMonthCalendar.props';

// import styling for component
import './ReactMonthCalendar.scss';

// attach any extra data to the component
ReactMonthCalendar.propTypes = propTypes;

// the exports below will be what the final library exports
export default ReactMonthCalendar;
