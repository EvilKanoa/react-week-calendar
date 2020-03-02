import React from 'react';
import { text, number, select } from '@storybook/addon-knobs';

import ReactWeekCalendar, {
  CALENDAR_DAY,
  CALENDAR_INTERVAL,
  CALENDAR_PRECISION,
} from './index';

export default { component: ReactWeekCalendar, title: 'ReactWeekCalendar' };

export const withCustomProps = () => (
  <ReactWeekCalendar
    id={text('id', '')}
    className={text('className', '')}
    dayCount={number('dayCount', 7, { range: true, min: 1, max: 7, step: 1 })}
    startMinutes={number('startMinutes', 0)}
    endMinutes={number('endMinutes', 24 * 60 - 1)}
    displayedInterval={select(
      'displayedInterval',
      CALENDAR_INTERVAL,
      CALENDAR_INTERVAL.MEDIUM
    )}
    minutePrecision={select(
      'minutePrecision',
      CALENDAR_PRECISION,
      CALENDAR_PRECISION.NORMAL
    )}
    weekStart={select('weekStart', CALENDAR_DAY, CALENDAR_DAY.MONDAY)}
  />
);

export const withDefaultProps = () => <ReactWeekCalendar />;
