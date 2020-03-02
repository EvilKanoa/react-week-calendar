// import all pieces of the component that are used in the built lib
import ReactWeekCalendar from './component';
import * as constants from './constants';
import * as utilities from './utilities';
import propTypes from './propTypes';

// import styling for component
import './styles.scss';

// attach any extra data to the component
utilities.mergeShallow(ReactWeekCalendar, constants);
utilities.mergeShallow(ReactWeekCalendar, utilities);
ReactWeekCalendar.propTypes = propTypes;

// the exports below will be what the final library exports
export * from './utilities';
export * from './constants';
export default ReactWeekCalendar;
