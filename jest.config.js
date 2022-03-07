module.exports = {
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  preset: 'jest-puppeteer',
  transform: {"\\.ts$": ['ts-jest']}
  },
};
