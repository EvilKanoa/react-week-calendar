import React from 'react';
import { mount } from 'enzyme';

import ReactMonthCalendar from './ReactMonthCalendar';

describe('ReactMonthCalendar', () => {
  describe('render tests', () => {
    it('renders with default props', () => {
      const wrapper = mount(<ReactMonthCalendar />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
