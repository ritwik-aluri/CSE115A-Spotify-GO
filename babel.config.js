module.exports = {presets: ['@babel/preset-env', "@babel/preset-react", "module:metro-react-native-babel-preset"],
  env: {
    test: {
      plugins: [["@babel/plugin-transform-runtime"],["@babel/plugin-proposal-private-property-in-object", { "loose": true }],["@babel/plugin-proposal-private-methods", { "loose": true }]]
    }
  }
}