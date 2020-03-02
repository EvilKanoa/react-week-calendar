import PropTypes from 'prop-types';

export default {
  /** Passes a custom ID to the rendered calendar. */
  id: PropTypes.string,
  /** Additional className to apply to the rendered calendar. */
  className: PropTypes.string,
  /** The number of days to be displayed in the rendered calendar. Controls the number of columns that you can render events into. */
  dayCount: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8]),
};
