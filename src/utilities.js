import { CALENDAR_DAY } from './constants';

/**
 * Converts a calendar day enum to a user readable string (in English).
 * Provides a sample implementation of the translation function for the ReactWeekCalendar component.
 * @param {"monday"|"tuesday"|"wednesday"|"thursday"|"friday"|"saturday"|"sunday"} day The day in the format from CALENDAR_DAYS to be translated.
 * @returns {String} The readable translation of the weekday or "Unknown".
 */
export const calendarDayToString = day => {
  switch (day) {
    case CALENDAR_DAY.MONDAY:
      return 'Monday';
    case CALENDAR_DAY.TUESDAY:
      return 'Tuesday';
    case CALENDAR_DAY.WEDNESDAY:
      return 'Wednesday';
    case CALENDAR_DAY.THURSDAY:
      return 'Thursday';
    case CALENDAR_DAY.FRIDAY:
      return 'Friday';
    case CALENDAR_DAY.SATURDAY:
      return 'Saturday';
    case CALENDAR_DAY.SUNDAY:
      return 'Sunday';
    default:
      return 'Unknown';
  }
};

/**
 * Computes a class name string for the given inputs.
 * Inputs can consist of:
 *   1. `String`: will be used as a distinct class name.
 *   2. `Object`: each key in the object will be used as a distinct class name if the value of the property is truthy.
 *   3. `Array`: each entry will have a class name generated for it before each is added as a distinct class name.
 * @param {Array<String|Object|Array<*>>} classes Inputs for class name generation.
 * @returns {String} A stringified class name generated from all inputs.
 */
export const classnames = (...classes) =>
  classes
    .reduce((names, clazz) => {
      let classname = '';

      if (!clazz) {
        classname = '';
      } else if (typeof clazz === 'string') {
        classname = clazz;
      } else if (Array.isArray(clazz)) {
        classname = classnames(...clazz);
      } else if (typeof clazz === 'object') {
        classname = Object.keys(clazz)
          .filter(key => key.length > 0 && !!clazz[key])
          .reduce((str, key) => {
            return `${str} ${key}`;
          }, '');
      }

      // trim the name before checking if it should be prepended
      classname = classname.trim().replace(/\s+/gim, ' ');

      // return the appended name as long as we have a non-empty string
      return classname.length > 0 ? `${names} ${classname}` : names;
    }, '')
    .trim()
    .replace(/\s+/gim, ' ');

/** Provides a wrapper around the console logging methods to ensure all logs from ReactWeekCalendar will be consistent. */
export const log = {
  /** Wraps the `console.debug` function to inject a consistent ReactWeekCalendar tag. */
  debug: (...args) => console.debug('ReactWeekCalendar[DEBUG]->', ...args),
  /** Wraps the `console.warn` function to inject a consistent ReactWeekCalendar tag. */
  warn: (...args) => console.warn('ReactWeekCalendar[WARN]->', ...args),
  /** Wraps the `console.error` function to inject a consistent ReactWeekCalendar tag. */
  error: (...args) => console.error('ReactWeekCalendar[ERROR]->', ...args),
};

/**
 * Merge multiple properties from multiple objects into a base object.
 * Respects priority of properties in the base object. That is, properties are only overwritten if they do not exist in the both object or one of the earlier source objects.
 * Properties are therefore taken with precedence from left to right.
 * Only merges properties at the top most level.
 * Mutates the base object passed in.
 * @param {Object} [base={}] The object to merge all other sources into.
 * @param {Array<Object>} [sources] All other arguments are objects of source properties to be merged into the base object.
 * @returns {Object} The base object is returned after the merge is completed.
 */
export const mergeShallow = (base = {}, ...sources) => {
  sources.forEach(source => {
    if (!source) return;

    Object.keys(source)
      .filter(key => !base.hasOwnProperty(key))
      .forEach(key => (base[key] = source[key]));
  });

  return base;
};

/**
 * Converts a integer representing total minutes since midnight to a human readable timestamp.
 * Uses basic algebra to perform the conversion and some simple string operations.
 * @param {Number} minutes The number of minutes elapsed since the start of the day.
 * @returns {String} The readable timestamp given the minutes elapsed.
 */
export const minutesToTimestampString = minutes => {
  if (typeof minutes !== 'number' || isNaN(minutes)) {
    return '00:00am';
  }

  const hours = minutes / 60;
  const hourStr = `${Math.floor(hours) - (hours < 13 ? 0 : 12)}`.padStart(
    2,
    '0'
  );
  const minuteStr = `${minutes % 60}`.padStart(2, '0');

  return `${hourStr}:${minuteStr}${hours < 12 ? 'am' : 'pm'}`;
};

/**
 * Generates an array of numbers from start (inclusive) to end (exclusive) increasing by step for each entry.
 * Start defaults to 0 and step defaults to 1 to allow quicker usage.
 * When only passed one argument, will treat it as the end value with a start of 0, otherwise, expects arguments in start, end, step order.
 * @example
 * range(3)
 * -> [0, 1, 2]
 *
 * range(-2, 3)
 * -> [-2, -1, 0, 1, 2]
 *
 * range(0, 10, 2)
 * -> [0, 2, 4, 6, 8]
 *
 * range(3, -2, -1)
 * -> [3, 2, 1, 0, -1]
 * @param {Number} [startOrEnd=0] If not providing other arguments, acts as the end value, the value (exclusive) where the range ends. Otherwise, when proving an end value as well as this value, will act as the value (inclusive) where the range begins.
 * @param {Number} [optionalEnd] Where to end the range, when specifying the start value. This is an exclusive end value.
 * @param {Number} [step=1] How much to increase each entry in the range by. Defaults to 1.
 * @returns {Array<Number>} The range list generated, contains each entry of the range from start (inclusive) to end (exclusive) with an interval of step.
 * @throws Error thrown if an incorrect step value is provided based upon the start and end values.
 */
export const range = (startOrEnd = 0, optionalEnd, step = 1) => {
  let start, end;
  if (optionalEnd != null) {
    start = startOrEnd;
    end = optionalEnd;
  } else {
    start = 0;
    end = startOrEnd;
  }

  const range = [];

  if (end > start) {
    if (step <= 0) {
      throw new Error(
        'Cannot generate an ascending range with a non-positive step value!'
      );
    }

    for (let i = start; i < end; i += step) {
      range.push(i);
    }
  } else if (end < start) {
    if (step >= 0) {
      throw new Error(
        'Cannot generate a descending range with a non-negative step value!'
      );
    }

    for (let i = start; i > end; i += step) {
      range.push(i);
    }
  }

  return range;
};
