module.exports = {
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
    "__DEV__": true,
  preset: 'react-native',
  transform: {"\\.ts$": ['ts-jest']}
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|react-native-vector-icons|react-native-webview|react-native-maps|firebase|react-native-get-location|firebase-encode|react)/)"
  ],
};
