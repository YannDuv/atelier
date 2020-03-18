module.exports = {
  stories: ["../stories/**/*.stories.js", "../src/**/*.stories.js"],
  addons: [
    "@storybook/addon-backgrounds/register",
    "@storybook/addon-viewport/register"
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("ts-loader")
        }
      ]
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  }
};
