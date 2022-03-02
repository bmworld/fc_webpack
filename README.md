# WEBPACK 사용법

### 0. webpack의 역할
- 웹팩의 순수기능은 config에 지정된 파일들을 읽고, 합쳐서 output해주는 것 까지다.
- 파일을 read 또는 compile하려면 plugin의 도움이 필요하다.

### 1. webpack 설치 <br>
$ npm i -D webpack webpack-cli webpack-dev-server@next
webpack-dev-server에 @next는 webpack-cli와 메이저 버전을 맞춰주기 위해서 필요한 옵션이다.

<br>


### 2. webpack-cli (webpack Command-line-interface)
터미널에서 webpack 명령어를 입력하게 지원하게 해주는 모듈

<br>


### 3. webpack-dev-server <br>
개발 시, 저장 후 comfile결과를 바로 확인할 수 있도록 지원하는 기능
```plain
- DEV
$ webpack-dev-server --mode development
```

<br>

```plain
- BUILD
$ webpack --mode production
```

<br>

### 4. webpack.config.js
webpack.config.js는 NodeJS환경에서 돌아간다.

- configuration 공식문서
*https://webpack.js.org/configuration/entry-context/*
```js
module.exports = {
   // 파일을 읽어들이기 시작하는 진입점. // 
  // webpack은 ***Javascript**를 진입점으로 삼는다 (Not HTML)
  // parcel의 경우 --> parcel index.html
  entry: './js/main.js',

  // 결과물(bundle)을 반환하는 설정
  output: {
    path: path.resolve(__dirname, 'dist'),
     // 결과물이 생성될 절.대.경.로. (NodeJS에서 요구하는 사항)
     //__dirname: 현재 파일이 있는 절대경로 ( Nodejs 전역에서 사용할 수 있는 전역 변수)
     // path.resolve ( 현재파일경로 + 'dist') ==> 합친 경로를 반환한다.
    filename: 'main.js'
  },
}
```





### 5. Dev Server 열기
- 플러그인 설치
```
$ npm i -D html-webpack-plugin
```

<br>

- webpack.config.js 설정

```js
//플러그인 불러오기
const HtmlPlugin = require('html-webpack-plugin'); // 설치한 플러그인 import
  module.exports = {
    //...
    plugins: [ //// 여기여기
      new HtmlPlugin({
        template: './index.html',
      })
    ]
  }
```
<br>

```js
// devServer 옵션 추가
  module.exports = {
    //...
    devServer: {
      host: 'localhost',
      port: 1234
    }
  }
```

- 개발 의존성 모듈 추가 (copy-webpack-plugin)
설치
```plain
$ npm i -D copy-webpack-plugin
```

<br>

```js
const CopyPlugin = require ('copy-webpack-plugin');
```





### 6. 파일 읽기

#### CSS
- 모듈 설치 
```
$ npm i -D css-loader

// jsx와 같이 자바스크립트를 이용한 마크업에 스타일링을 입힐 때는 import "global.css" 와 같이 css 파일을 임포트한다. 임포트한다는 말은 css 파일을 하나의 모듈로 취급하여 js,tsx 파일에서 불러 사용한다는 것인데 (babel을 사용하여 import 구문을 require 구문으로 바꾼다) 이렇게 css 파일을 모듈로 부르기 위해서 사용하는 로더가 css-loader이다.

$ npm i -D style-loader

Inject CSS into the DOM.

```

- webpack.config.js 파일 설정하기

```js
// module 속성의 위치는 관계 없다.
module.exports = {

  //...

module: {
    rules: [
      {
        test: /\.s?css$/i, // <--- regexp에....... "/\.s?css$/i" 따옴표 넣어서.... css안먹히고 삽질 겁나했음.
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
}
```

#### SCSS 읽기
- 모듈 설치  (2가지)
```
$ npm i -D sass-loader sass
```


#### CSS를 import하기 -> js파일속에

```js
// entry file인 main.js
import '../static/scss/main.scss';
import '../static/css/main.css';

// css파일을 모듈로 취급하여, js 또는 jsx파일에서 불러 사용하기위하여 "css-loader"가 필요한 것이다.
```


<br>

### 7. Autoprefixer: 모든 브라우저 CSS 대응

7-1. install plugin
```bash
$ npm i -D postcss autoprefixer postcss-loader
```
---
- postcss: STYLE

- autoprefixer : 브라우저별 대응되는 코드 추가
- postcss-loader: 공급업체 접두사 추가. 
- postcss플러그인 적용

<br>

7-2. package.json의 browserslist에 옵션 추가
```json
"browserslist": [
  "> 1%",
  "last 2 versions"
]
```


7-3. .pstcssrc.js 파일 설정
```js
// node JS 에서 실행되는 설정 파일이다.
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

이제 display:flex등의 코드는 autoprefixer기능을 통해서 다음과 같은 효과를 낸다

```html
h1 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
```


<br>

### 8. Babel 설치

<br>

#### babel package 3가지 설치
```bash
$ npm i -D @babel/core @babel/preset-env @babel/plugin-transform-runtime
```


#### .babelrc파일 설정
```js
module.exports = {
  presets: ['@babel/preset-env'], // 일일이 명시해야 하는 js기능을 한번에 지원
  plugins: [
    ['@babel/plugin-transform-runtime'] // 비동기 처리를 위함
  ]
}
```

<br>

#### babel-loader 설치
```bash
$ npm i -D babel-loader
```




