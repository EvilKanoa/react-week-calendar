import propTypes from './propTypes';

describe('propTypes', () => {
  it('matches snapshot', () => {
    expect(propTypes).toMatchSnapshot();
  });
});
