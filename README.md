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
* src 폴더 생성 후 코드와 로직을 갖고 있는 모든 파일들을 그 안에 넣는다.

## package.json
* Node.js 관련 정보가 담겨 있는 파일
  + 앞으로 점차 확장될 예정
  + 만약 내용이 잘못 됐으면 바로 수정 가능. 그냥 text file이니까
* __얘만 있으면 나중에 프로젝트 세팅할 때 ```$ npm i```로만 모든 모듈을 다시 설치 할 수 있어__
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
* 두 가지 종류로 나눠져있으나 둘 다 node_modules에서 찾아오는 건 똑같다
  + 체계화하기 위해 나눠 놓은 것
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

## 디렉토리 정리
* src 아래에 로직이나 코드 관련 파일을 넣을 거야
  + 그래서 index.js도 그 아래로 옮겼고 server.js로 이름 바꾼 다음에 package.json에서 스크립트도 수정함


# Express
## 서버 구축하기
### 서버란
* 인터넷에 연결되어 있는 항상 켜져있는 컴퓨터
* express 사용해서 app(server) 생성
  + 이제 이 app을 listen 해야 해
* 브라우저가 Website(server)로 request를 보내고 server는 그에 대한 response를 준다.
  + 그러면 서버는 request가 오는지 오지 않는지 계속 __listening__ 하고 있어야 해
  + Port? 서버는 컴퓨터 전체를 listening 할 수 없어

## Request / Response
* __HTTP__ 는 우리가 서버와 소통하는 방법
  + 정보를 전달할 때도 사용
### Get Request
* Http method
> Cannot Get /
  + root page (/)를 열 수 없다는 뜻

### Router params
* express app에서 Http method 쓸 때 (__app.get(route, controller)__) 콜백 함수 param으로 __req, res__ 가 있다.
  + request: 브라우저가 뭔가를 요청하는 것 (e.g. method, cookie, url, ...)
  + response: 백엔드가 브라우저로 응답해주는 것
  + route: "/" 같은 url

## Middlewares
* middle software between request and response
  + All controllers can be a middleware.
  + argument req, res, next
    + __next()__ 는 다음 함수를 호출

* __app.use()__ 로 글로벌 미들웨어 생성 가능
  + 어느 URL에도 작동하는 미들웨어
  + 다른 get 함수 보다 위에 있어야겠지?

### morgan
* log를 더 정교하게 출력하는 미들웨어
#### 설치
```$ npm i morgan```

#### 사용
```js
import morgan from "morgan";
app.use(morgan("dev"));
```
* type에 총 5개
  + combined, common, dev, short, tiny

# Routers
* 우리의 Controller나 URL 관리를 쉽게 해줌

## Router Plan

* global router (accessible from home)
  / -> Home
  /join -> Join
  /login -> Login
  /search -> Search

* users router
  /users/:id -> User profile
  /users/logout -> Log Out
  /users/edit -> Edit My Profile
  /users/delete -> Delete My Account

* videos router
  /videos/:id -> Watch Video :video id
  /videos/:id/edit -> Edit Video
  /videos/:id/delete -> Delete Video
  /videos/upload -> Upload Video

## Router 구조
* globalRouter.js
```js
const globalRouter = express.Router();
const handleHome = (req, res) => res.send("Home");
globalRouter.get("/", handleHome);

export default globalRouter;
```
* express로 생성하고 __router.get(route, controller)__ 형태로 사용한다.
* server.js에서 사용하기 위해 __export default__ 한다.

## Router 사용
* server.js
```js
import globalRouter from "./routers/globalRouter";

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
```
* globalRouter.js에서 export된 __globalRouter__ 를 import 받아서 사용한다.
* default export 된 것이기 때문에 ```import global from "./routers/globalRouter";```처럼 이름을 바꿔서도 사용할 수 있다.

## Controller 분리
* router.js에 함께 있던 controller 함수를 분리

### Controller 구조
* userController.js
```js
export const join = (req, res) => res.send("Join");
```
* 함수를 생성 후 export 한다.

### Controller 사용
```js
import { join } from "../controllers/userController";

globalRouter.get("/join", join);
```
* import해서 사용한다.

## export
### default export
* import 했을 때 ```import globalRouter from "./routers/globalRouter";``` 형식이다.
  + 그래서 우린 express도 default export라는 걸 알 수 있지

### export
* import 할 때 ```import { deleteUser, edit } from "../controllers/userController";``` 형식이다.
* 이름을 변경할 수 없고 하나의 파일에서 여러 개의 함수를 import 할 수 있다.

## URL Parameter
### Regular Expression
* 문자열로부터 특정 정보를 추출해내는 방법
* 모든 프로그래밍 언어에 존재

* 숫자만 표현하고 싶을 때
>> (\d+)

* JS에서 사용할 때
>> (\\d+)