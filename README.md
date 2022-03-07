# PROJECT SETUP
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


# EXPRESS
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

# TEMPLATES

## 요약
* Pug 설치 및 세팅, 적용
* MVP Styles 적용
  + <https://andybrewer.github.io/mvp/>
  + ```link(rel="stylesheet" href="https://unpkg.com/mvp.css")```

## Pug
### 개념
* HTML을 리턴하는 데 두 가지 옵션이 있다
  + 하나는 그냥 ```res.send("<h1>이런식</h1>");``` (미친짓)
  + Template engine 사용하기 -> 여기서는 __Pug__
    + template을 사용해서 view를 만드는 것

* PUG: Html template helper
  + express view engine으로 설정할 거야
  + 우리가 pug file을 보내면 pug가 pug 파일을 평범한 html로 변화해서 사용자에게 제공함

### 설치
```$ npm i pug```

### 설정
* Express에게 view engine으로 pug를 쓰겠다고 해줘야지
```js
app.set("view engine", "pug");
app.set("views", process.cwd()+"/src/views");
```
* pug는 기본적으로 cwd(current working directory)에서 views 폴더를 찾는다
  + cwd의 위치는 package.json이 실행되는 곳
  + server.js에서 ```process.cwd()``` 찍어보면 정확하게 알 수 있음

* 그런데 우리 views는 src 아래에 있으니까 ```"/src/views"```라고 명시할 것

### 사용
* view를 생성한다 (home.pug)
* videoController.js
```js
res.render("home")
```
  + render 안에 __view 이름__ 을 넣는다.


### Partials
* pug 파일을 생성한 후 필요한 다른 pug 파일에 include로 추가한다.
```pug
include partials/footer.pug
```

### Inheritance
* base.pug 내에 __block__ 을 생성하고 해당 base.pug를 다른 pug에서 __extends__ 한 후 block에 내용을 채운다.
  + 토대를 만들고 다른 pug는 거기서부터 확장해나간다.
```pug
extends base

block content
  h1 Home!
```

### Variables
* pug에서는 ```#{}```로 JS를 실행할 수 있어
```pug
head 
  title #{pageTitle} | Rootube 🐶
```
  + Controller에서 rendering 하면서 오브젝트를 같이 넘겨준다 : ```res.render("home", { pageTitle: "Home" })```

* 다른 string이랑 같이 쓰는 거 아니면 아래처럼도 설정 가능
```pug
body
  header
    h1=pageTitle
```

### Conditionals
* if/else statement
```pug
body
  header
    if fakeUser.loggedIn
      small Hello #{fakeUser.username}
    nav 
      ul 
        if fakeUser.loggedIn
          li 
            a(href="/login") Log out
        else
          li 
            a(href="/login") Login
    h1=pageTitle
  main 
    block content
```

### Iteration
* for loop
```pug
block content
  h1 home
  ul 
    each video in videos
      li=video
    else
      li Sorry nothing found.
```
  + videos는 controller에서 parameter로 넘겨줌

### Mixins (pug references)
* 데이터를 받을 수 있고 + 반복할 수 있는 partial

#### 생성
* mixins 디렉토리를 만들고 그 안에 video.pug 파일을 생성
```pug
mixin video(video)
  div 
    h4 #{video.title} 🎬
    ul 
      li #{video.rating}/5
      li #{video.comments} comments.
      li Posted  video.createdAt
      li #{video.views} views.
```
  + info라는 정보를 받아와서 어떻게 출력하겠다 라는 의미

#### 사용
```pug
extends base
include mixins/video

block content
  h1 home
  ul 
    each video in videos
      +video(video)
    else
      li Sorry nothing found.
```
* include 후 __+__ 표시로 사용

# MONGODB AND MONGOOSE

## DB를 사용하려면 우선
* get이 아닌 post를 이해해야 함
  + ```videoRouter.get(~)``` 여태까지 get만 씀

* 미션
  + 가짜 DB (array)의 모든 비디오를 나열
  + 유저가 하나의 비디오를 볼 수 있으면 좋겠어 (watch)
  + 비디오를 업로드 하고 싶어

* ternary operation in pug
```pug
#{video.views} #{video.views === 1 ? "view." : "views."}
```

* Absoulte URL vs. Relative URL
```pug
a(href=`${video.id}/edit`) Edit Video &rarr;
```
  + ```"/edit"```을 입력하면 localhost:4000/edit으로 이동한다
  + ```"edit"```을 입력하면 localhost:4000/videos/edit으로 이동한다.
    + 왜냐면 현재 current directory가 localhost:4000/videos 이기 때문

## POST / GET 이해하기
* HTTP method

### form
```pug
form(method="POST")
  input(name="title", placeholder="Video title", value=video.title, required)
  input(value="Save", type="submit")
```
* ```form(action="/save-changes")```라고 하면 입력된 URL로 GET 요청을 날린다.
  + method 값을 따로 명시하지 않으면 GET
* ```form(method="POST")```는 우리가 이미 알고 있는 url로 method를 POST로 요청을 날린다.

### GET
* 서버에서 어떤 데이터를 가져와서 보여줄 때, 어떤 값이나 상태 등을 바꾸지 않을 때
  + 정보를 요청할 때 사용
  + 데이터를 __읽거나__ , __검색__ 할 때 사용
  + idempotent: 연산을 여러 번 수행해도 결과가 같음
* 요청할 때 URL 주소 끝에 parameter로 데이터를 포함해서 전송 (__쿼리 스트링__)
  + ```search?검색어```의 형태
  + parameter에 내용이 노출되기 때문에 민감한 데이터 사용 X
* default http method라 따로 method 설정 안해주면 get으로 되어 있음

### POST
* 파일을 보내거나 DB에 있는 값을 바꾸는(__수정/삭제__) 작업을 할 때 사용
  + 전송해야 할 데이터를 __HTTP 메시지의 Body__ 에 담아서 전송
  + Body의 타입은 요청 헤더의 Content-Type에 명시

### express가 form을 이해하게 하려면
* router에 연결되기 전에 form을 JS가 이해할 수 있도록 변환해주는 __middleware__ 를 써야한다.
> app.use(express.urlencoded({extended: true}));