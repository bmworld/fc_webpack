
/* 설명 */
// webpack.config.js 는 NodeJS환경에서 돌아간다.
// webpack은 단지 파일을 읽고, 합쳐서 output 해주는 역할만 담당 한다.
// 따라서 CSS파일을 읽기 위해서는 추가적인 plugin을 설치해야한다.



const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require ('copy-webpack-plugin');
// parcel 번들러와 webpack번들러는 성격이 다르므로, 구별해서 생각할 것.
// webpack은 규모가 있는 프로젝트에 적합하며, Detail한 옵션을 구성할 수 있다.
// 따라서, 귀찮지만, 정밀한 config를 설정할 수 있는 것이다.



///// START /////
require('path'); // Nodejs에서 기본제공하는 전역 모듈


module.exports = {
   // 파일을 읽어들이기 시작하는 진입점. // 
     //FLOW: entry -> plugins 확인 -> output
  // webpack은 ***Javascript**를 진입점으로 삼는다 (Not HTML)
  // parcel의 경우 --> parcel index.html
  entry: './js/main.js',
  // entry인 파일의 경우에는 (main.js) 상대경로를 사용하여 import할 수 있다.

  // 결과물(bundle)을 반환하는 설정
  output: {
    path: path.resolve(__dirname, 'dist'),
     // 결과물이 생성될 절.대.경.로. (NodeJS에서 요구하는 사항)
     //__dirname: 현재 파일이 있는 절대경로 ( Nodejs 전역에서 사용할 수 있는 전역 변수)
     // path.resolve ( 현재파일경로 + 'dist') ==> 합친 경로를 반환한다.
    filename: 'main.bundle.js',
    clean: true // 기존에 build되었던 요소에서 변경되었을 경우, 그 남아있는 요소를 clean
  },



 // html의 style태그에 해석된 내용을 삽입
  // *순서중요* 아래에 있는 것이 먼저 해석된다 // css파일자체를 해석하는 역할
module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader' // babel을 해석하기 위한 매개체
        ]
      }
    ],
  },

  // Bundling 후 결과물의 처리방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin ({
      template: './index.html',
    }),
    new CopyPlugin ({
      patterns: [
        {from: 'static'}, // [static]폴더 "하위" 파일들을 Copy하여, [dist]폴더에 붙여넣어줌
        // 배열이므로, 여러 폴더를 함께 지정해줄 수 있다.
      ]
    })
  ],



  // 개발용 서버 option
  devServer: {
    host: 'localhost',
  }
}