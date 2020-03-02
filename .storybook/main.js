const webpackConfig = require('../webpack.config');

module.exports = {
  stories: ['../src/*.stories.js'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport/register',
  ],
  webpackFinal: async config => ({
    ...config,
    module: { ...config.module, rules: webpackConfig.module.rules },
  }),
};
