module.exports = {
  stories: ['../src/*.stories.js'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport/register',
  ],
};
