import React from 'react';
import { text } from '@storybook/addon-knobs';

import ReactWeekCalendar from './index';

export default { component: ReactWeekCalendar, title: 'ReactWeekCalendar' };

export const withAllProps = () => <ReactWeekCalendar />;

export const defaultEmpty = () => <ReactWeekCalendar />;

export const withName = () => (
  <ReactWeekCalendar name={text('name', 'Hello World!')} />
);
