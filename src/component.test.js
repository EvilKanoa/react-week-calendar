import React from 'react';
import { mount } from 'enzyme';

import ReactWeekCalendar from './component';

describe('ReactWeekCalendar', () => {
  describe('render tests', () => {
    it('renders with default props', () => {
      const wrapper = mount(<ReactWeekCalendar />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
