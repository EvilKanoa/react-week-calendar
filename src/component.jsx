import React, { useEffect, useMemo, useCallback } from 'react';
import {
  CALENDAR_DAY,
  CALENDAR_DAY_ORDER,
  CALENDAR_INTERVAL,
  CALENDAR_PRECISION,
} from './constants';
import {
  calendarDayToString,
  classnames as cx,
  log,
  minutesToTimestampString,
  range,
} from './utilities';

const defaultDayHeaderRenderer = (day, translate) => (
  <p className="ek-rwc-header-day-default">{translate(day)}</p>
);

const defaultTimeHeaderRenderer = (minutes, translate) => (
  <p className="ek-rwc-header-time-default">{translate(minutes)}</p>
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

/** Renders a RWC header for a weekday (column header). */
const DayHeader = ({
  isFirst,
  dayIndex,
  dayOffset,
  lastGridRow,
  dayHeaderRenderer,
  translateDay,
}) => {
  const content = useMemo(
    () =>
      dayHeaderRenderer(
        CALENDAR_DAY_ORDER[(dayIndex + dayOffset) % CALENDAR_DAY_ORDER.length],
        translateDay
      ),
    [dayIndex, dayOffset, dayHeaderRenderer, translateDay]
  );

  return (
    <>
      <GridDiv
        className={cx('ek-rwc-header ek-rwc-header-day', { first: isFirst })}
        cStart={dayIndex + 2}
        cEnd={dayIndex + 3}
        rStart={1}
        rEnd={2}
      >
        {content}
      </GridDiv>
      <GridDiv
        className={cx('ek-rwc-grid-line-y', { first: isFirst })}
        cStart={dayIndex + 2}
        cEnd={dayIndex + 3}
        rStart={2}
        rEnd={lastGridRow}
      />
    </>
  );
};

/** Renders a RWC header for a time period (row header). */
const TimeHeader = ({
  isFirst,
  minutes,
  dayCount,
  gridRowStart,
  gridRowEnd,
  timeHeaderRenderer,
  translateTime,
}) => {
  const content = useMemo(() => timeHeaderRenderer(minutes, translateTime), [
    timeHeaderRenderer,
    minutes,
    translateTime,
  ]);

  return (
    <>
      <GridDiv
        className={cx('ek-rwc-header ek-rwc-header-time', { first: isFirst })}
        cStart={1}
        cEnd={2}
        rStart={gridRowStart}
        rEnd={gridRowEnd}
      >
        {content}
      </GridDiv>
      <GridDiv
        className={cx('ek-rwc-grid-line-x', { first: isFirst })}
        cStart={2}
        cEnd={dayCount + 2}
        rStart={gridRowStart}
        rEnd={gridRowEnd}
      />
    </>
  );
};

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
  translateTime = minutesToTimestampString,
  dayHeaderRenderer = defaultDayHeaderRenderer,
  timeHeaderRenderer = defaultTimeHeaderRenderer,
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
  const lastGridRow = useMemo(
    () =>
      toGridRow(
        Math.ceil((endMinutes - startMinutes) / displayedInterval) *
          displayedInterval
      ) + 2,
    [startMinutes, endMinutes, toGridRow]
  );

  // render each group of components if needed
  const dayHeaders = useMemo(
    () =>
      range(dayCount).map(idx => (
        <DayHeader
          key={`${weekStart}-${idx}`}
          isFirst={idx === 0}
          dayIndex={idx}
          dayOffset={CALENDAR_DAY_ORDER.indexOf(weekStart)}
          lastGridRow={lastGridRow}
          dayHeaderRenderer={dayHeaderRenderer}
          translateDay={translateDay}
        />
      )),
    [dayCount, weekStart, dayHeaderRenderer, translateDay, lastGridRow]
  );
  const timeHeaders = useMemo(
    () =>
      range(startMinutes, endMinutes, displayedInterval).map(minutes => (
        <TimeHeader
          key={minutes}
          isFirst={minutes === startMinutes}
          minutes={minutes}
          dayCount={dayCount}
          gridRowStart={toGridRow(minutes - startMinutes) + 2}
          gridRowEnd={toGridRow(minutes - startMinutes + displayedInterval) + 2}
          timeHeaderRenderer={timeHeaderRenderer}
          translateTime={translateTime}
        />
      )),
    [
      startMinutes,
      endMinutes,
      displayedInterval,
      dayCount,
      toGridRow,
      timeHeaderRenderer,
      translateTime,
    ]
  );

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
      <GridDiv
        className="ek-rwc-header-time-container"
        cStart={1}
        cEnd={2}
        rStart={1}
        rEnd={lastGridRow}
      />
      {timeHeaders}
    </div>
  );
};

export default ReactWeekCalendar;
