# Project Setup
## 프로젝트 처음 세팅 할 때 필요한 것
* Nodejs, npm 설치
* Project folder 생성
* 폴더 내에서 ```$ npm init```으로 세팅 -> 자동으로 __package.json__ 생성
* express 설치
* babel 설치
  + __babel.config.json__ 생성 후 presets 설정
* nodemon 설치
* .gitignore
  + ```/node_modules```

## package.json
* 앞으로 점차 확장될 예정
* 만약 내용이 잘못 됐으면 바로 수정 가능. 그냥 text file이니까
* 얘만 있으면 나중에 프로젝트 세팅할 때 ```$ npm i```로만 모든 모듈을 다시 설치 할 수 있어.
  + 왜냐면 dependency에 모듈이 다 적혀 있으니까

### scripts?
* 우리가 node 명령어로 실행할 수 있도록 하는 스크립트
```json
"scripts": {
  "win": "node index.js"
},
```

### dependency?
* 얘만 있으면 나중에 프로젝트 세팅할 때 ```$ npm i```로만 모든 모듈을 다시 설치 할 수 있어.
  + 왜냐면 dependency에 모듈이 다 적혀 있으니까
#### 종류
* dependencies? 프로젝트를 실행하기 위한 것 (e.g. 가솔린, 운전 면허)
* devDependencies? 개발자에게 필요한 것 (e.g. 음악)

### package-lock.json
* 설치한 패키지를 안전하게 관리
  + 패키지가 수정 되었는지 해시값으로 체크 등
  + 말 그대로 잠겨(lock) 있음

## Express
### 정의
Node.js 웹 어플리케이션 프레임워크

### 설치
```npm i express```
* 설치하고 나면 node_modules 폴더가 생김
  + npm으로 설치한 모든 패키지가 이 곳에 있음

## Babel
### 정의
* Nodejs가 아직 이해하지 못하는 최신 JS 문법들을 전환해줌
* 참고: <https://babeljs.io/setup>

### 설치
```bash
$ npm i --save-dev @babel/core @babel/node
$ npm i --save-dev @babel/preset-env
```
* preset?
  + babel을 위한 엄청 거대한 plugin
  + preset-env가 제일 유명한 애

### 설정
* babel.config.json
```json
{
  "presets": ["@babel/preset-env"]
}
```

## Nodemon
### 정의
* 파일이 수정되면 알아서 재시작을 해주는 얘야
  + 우리가 매번 *npm run dev* 할 필요 없어
* 참고: <https://www.npmjs.com/package/nodemon>

### 설치
```bash
$ npm install --save-dev nodemon
```

### 설정
* package.json
```json
"scripts": {
  "dev": "nodemon --exec babel-node index.js"
},
```