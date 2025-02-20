const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// Lấy config mặc định
const defaultConfig = getDefaultConfig(__dirname);

// Gộp config mặc định với config của bạn
const customConfig = mergeConfig(defaultConfig, {});

// Bọc config với Reanimated
module.exports = wrapWithReanimatedMetroConfig(customConfig);
