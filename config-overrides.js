const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@redux': path.resolve(__dirname, 'src/redux'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@configs': path.resolve(__dirname, 'src/configs'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@routes': path.resolve(__dirname, 'src/routes'),
    }),
);
