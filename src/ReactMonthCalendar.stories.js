import React from 'react';
import { text } from '@storybook/addon-knobs';

import ReactMonthCalendar from './index';

export default { component: ReactMonthCalendar, title: 'ReactMonthCalendar' };

export const withAllProps = () => <ReactMonthCalendar />;

export const defaultEmpty = () => <ReactMonthCalendar />;

export const withName = () => (
  <ReactMonthCalendar name={text('name', 'Hello World!')} />
);
