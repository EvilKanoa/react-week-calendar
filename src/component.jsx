import React, { useEffect, useMemo, useCallback } from 'react';
import {
  CALENDAR_DAY,
  CALENDAR_DAY_ORDER,
  CALENDAR_INTERVAL,
  CALENDAR_PRECISION,
} from './constants';
import { calendarDayToString, classnames as cx, log, range } from './utilities';

const defaultDayHeaderRenderer = (day, translate) => (
  <p className="ek-rwc-header-day-default">{translate(day)}</p>
);

const GridDiv = ({ cStart, cEnd, rStart, rEnd, style = {}, ...props }) => (
  <div
    {...props}
    style={{
      gridColumnStart: cStart,
      gridColumnEnd: cEnd,
      gridRowStart: rStart,
      gridRowEnd: rEnd,
      ...style,
    }}
  ></div>
);

const DayHeader = ({
  dayIndex,
  dayOffset,
  dayHeaderRenderer,
  translateDay,
  lastGridRow,
}) => (
  <>
    <GridDiv
      className={cx('ek-rwc-header-day')}
      cStart={dayIndex + 2}
      cEnd={dayIndex + 3}
      rStart={1}
      rEnd={2}
    >
      {dayHeaderRenderer(
        CALENDAR_DAY_ORDER[(dayIndex + dayOffset) % CALENDAR_DAY_ORDER.length],
        translateDay
      )}
    </GridDiv>
    <GridDiv
      className={cx('ek-rwc-grid-line-y')}
      cStart={dayIndex + 2}
      cEnd={dayIndex + 3}
      rStart={2}
      rEnd={lastGridRow}
    />
  </>
);

const TimeHeader = ({}) => null;

const ReactWeekCalendar = ({
  id = '',
  className,
  dayCount = 7,
  startMinutes = 0,
  endMinutes = 24 * 60 - 1,
  displayedInterval = CALENDAR_INTERVAL.MEDIUM,
  minutePrecision = CALENDAR_PRECISION.NORMAL,
  weekStart = CALENDAR_DAY.MONDAY,
  translateDay = calendarDayToString,
  dayHeaderRenderer = defaultDayHeaderRenderer,
  ...rest
}) => {
  // warn if unknown props were passed
  useEffect(() => {
    Object.keys(rest).forEach(prop =>
      log.warn(
        'Unknown prop received, this may indicate a typo or some other error.',
        { propName: prop, propValue: rest[prop] }
      )
    );
  });

  const toGridRow = useCallback(
    minutes => Math.floor(minutes / minutePrecision),
    [minutePrecision]
  );

  // render each group of components if needed
  const dayHeaders = useMemo(
    () =>
      range(dayCount).map(idx => (
        <DayHeader
          key={`${weekStart}-${idx}`}
          dayIndex={idx}
          dayOffset={CALENDAR_DAY_ORDER.indexOf(weekStart)}
          dayHeaderRenderer={dayHeaderRenderer}
          translateDay={translateDay}
          lastGridRow={
            toGridRow(endMinutes - startMinutes + displayedInterval) + 2
          }
        />
      )),
    [
      dayCount,
      weekStart,
      dayHeaderRenderer,
      translateDay,
      endMinutes,
      startMinutes,
      displayedInterval,
    ]
  );
  const timeHeaders = useMemo(() => [], []);

  return (
    <div id={id} className={cx('ek-rwc-root', className)}>
      <GridDiv
        className="ek-rwc-header-day-container"
        cStart={1}
        cEnd={dayCount + 2}
        rStart={1}
        rEnd={2}
      />
      {dayHeaders}
      {timeHeaders}
    </div>
  );
};

export default ReactWeekCalendar;
