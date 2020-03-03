import PropTypes from 'prop-types';
import {
  CALENDAR_DAY,
  CALENDAR_INTERVAL,
  CALENDAR_PRECISION,
} from './constants';

export default {
  /** Passes a custom ID to the rendered calendar. */
  id: PropTypes.string,
  /** Additional className to apply to the rendered calendar. */
  className: PropTypes.string,
  /** The number of days to be displayed in the rendered calendar. Controls the number of columns that you can render events into. */
  dayCount: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7]),
  /** The number of minutes at which the calendar should begin rendering. Any events that occur before this many minutes will be truncated. */
  startMinutes: PropTypes.number,
  /** The number of minutes at which the calendar should end rendering. Any events that occur past this many minutes will be truncated. */
  endMinutes: PropTypes.number,
  /** Controls the frequency at which the horizontal interval border is displayed. Defaults to CALENDAR_INTERVAL.MEDIUM. */
  displayedInterval: PropTypes.oneOf(Object.values(CALENDAR_INTERVAL)),
  /** The number of minutes that will be resolved as a single "cell" when rendering the calendar. Defaults to CALENDAR_PRECISION.NORMAL. Do not use a number below 5 unless absolutely necessary since many browsers cannot handle a CSS3 grid of that density. */
  minutePrecision: PropTypes.oneOf(Object.values(CALENDAR_PRECISION)),
  /** The day which should be displayed as the left most column (the first day displayed). Defaults to CALENDAR_DAYS.MONDAY. */
  weekStart: PropTypes.oneOf(Object.values(CALENDAR_DAY)),
  /** Translation function to convert from a CALENDAR_DAYS enum to a readable string. Default translator returns string in English. */
  translateDay: PropTypes.func,
  /** Translation function to convert from an absolute number of minutes to a readable timestamp string. Default translator returns a 12-hour timestamp. */
  translateTime: PropTypes.func,
  /** Render function that is called for each day header (the cell that says, eg, "Monday"). Passed the day as a CALENDAR_DAY as well as the translateDay function. Defaults to a renderer which returns a centered <p> with the translated day as text. */
  dayHeaderRenderer: PropTypes.func,
  /** Render function that is called for each time header (the cell that says, eg, "8:30am"). Passed the elapsed minutes of the header as a number as well as the translateTime function. Defaults to a renderer which returns a centered <p> with the translated time as text. */
  timeHeaderRenderer: PropTypes.func,
};
