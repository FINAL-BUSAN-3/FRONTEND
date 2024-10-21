const path = require('path');

module.exports = {
  transpileDependencies: [
    // 필요한 경우 여기에 transpile할 패키지 이름을 추가하세요
  ],
  devServer: {
    allowedHosts: "all"
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // '@'를 'src' 디렉토리로 설정
      },
    },
  },
};
