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

# Array Data (Fake Data)

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

# MONGODB AND MONGOOSE
## MongoDB
### 설명
* document-based 임 => objects(json like documents)
* 만약 sql-based 였다면 rdb였겠지 엑셀처럼 column/rows (not flexible)

### 설치
* 참고: <https://docs.mongodb.com/manual/installation>

* MongoDB 설치 (MacOS용)
1. xcode-select --install
2. brew tap mongodb/brew
3. brew install mongodb-community@5.0   
(버전은 추후에 달라질 수 있습니다.)

* MongoDB Compass (MongoDB GUI): <https://www.mongodb.com/products/compass>

### 설치 확인
* terminal 열어서
```
$ mongod
$ mongo
```

## Mongoose
* nodeJS랑 mongoDB를 연결

### 설치
```bash
$ npm i mongoose
```

### 설정
* ```$ mongo``` 후 url rkwudhrl
* db.js 생성 후 mongoose랑 mongoDB 연결
```js
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/rootube")

db.on("error", (error) => console.log("❌ DB Error", error));
db.once("open", () => console.log("Connect to DB 🐝"));
```
  + __on__: 계속 보고 있음
  + __once__: 한 번 보고 말아

* 서버와 DB 연결
```js
import "./db";
```

## CRUD
> Create, Read, Update, Delete

## Model
* Models 아래에 데이터가 어떻게 생겼는지 정의 한다.

### 스키마 Schema
* 데이터 모양을 정의
```js
const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }], // array
  meta: {
    views: Number,
    rating: Number,
  },
});
```

### 모델 생성
* 스키마 정의에서 컴파일 된 생성자
* 위에서 생성한 스키마로 모델을 생성 후 __export__ 한다.
```js
const Video = mongoose.model("Video", videoSchema);
export default Video;
```
  + 해당 모델을 사용하기 위해서 필요한 곳에서 ```import "./models/Video";``` 한다. (서버나 init)

## Model 사용
* controller에 생성했던 fake data (array)를 지우고 Video를 import 해서 사용하자

### Callback 함수로 이해하기
```js
export const home = (req, res) => {
  Video.find({}, (err, videos) => {
    return res.render();
  });
};
```
* mongoose는 __search term({})__ 조건에 따라 데이터를 가져온 후에 callback 함수를 실행한다.
  + search term이 비어있으면 모든 데이터를 가져온다
* 바로 error를 확인할 수 있는 장점이 있다 (인자로 넘어오니까)

### Async/await로 이해하기
```js
export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render();
};
```
* 순서대로 동작함, 직관적
* 에러는 try catch로 잡아야 함

## MongoDB 커맨드
```bash
> show dbs;
admin   0.000GB
config  0.000GB
local   0.000GB
wetube  0.000GB
> use wetube
switched to db wetube
> show collections
videos
> help
	db.help()                    help on db methods
	db.mycoll.help()             help on collection methods
	sh.help()                    sharding helpers
	rs.help()                    replica set helpers
	help admin                   administrative help
	help connect                 connecting to a db help
	help keys                    key shortcuts
	help misc                    misc things to know
	help mr                      mapreduce

	show dbs                     show database names
	show collections             show collections in current database
	show users                   show users in current database
	show profile                 show most recent system.profile entries with time >= 1ms
	show logs                    show the accessible logger names
	show log [name]              prints out the last segment of log in memory, 'global' is default
	use <db_name>                set current database
	db.mycoll.find()             list objects in collection mycoll
	db.mycoll.find( { a : 1 } )  list objects in mycoll where a == 1
	it                           result of the last line evaluated; use to further iterate
	DBQuery.shellBatchSize = x   set default number of items to display on shell
	exit                         quit the mongo shell
> db.videos.find()
{ "_id" : ObjectId("6210c47fa5610cae69ba8571"), "title" : "First trial", "description" : "This is a first video.", "createdAt" : ISODate("2022-02-19T10:20:47.154Z"), "hashtags" : [ "#first", "#video", "#nice" ], "meta" : { "views" : 0, "rating" : 0 }, "__v" : 0 }
```

## 데이터 생성하기
### new로 생성 후 save 하기
```js
const video = new Video({
  title,
  description,
  createdAt: Date.now(),
  meta: {
    views: 0,
    rating: 0,
  },
  hashtags: hashtags.split(",").filter((word) => {
      if (!word.trim()) {
        return false;
      }
      return true;
    })
      .map(word => word.trim().startsWith("#") ? word.trim() : `#${word.trim()}`)
});

await video.save();
```

### create 하기
```js
await Video.create({
  title,
  description,
  createdAt: Date.now(),
  meta: {
    views: 0,
    rating: 0,
  },
  hashtags: hashtags.split(",").filter((word) => {
    if (!word.trim()) {
      return false;
    }
    return true;
  })
    .map(word => word.trim().startsWith("#") ? word.trim() : `#${word.trim()}`)
});
```
* 여기서는 에러가 쉽게 날 수 있으니 try catch로 묶을 것

### 그런데 매번 데이터 생성할 때마다 저 값을 다 넣어야 하나?
```js
createdAt: {type: Date, required: true, default: Date.now},
meta: {
  views: {type: Number, required: true, default: 0},
  rating: {type: Number, required: true, default: 0},
```
* 늘 값이 똑같은 애들은 schema 자체에 __default__ 를 지정하자
* 그러고 나면 controller에서 매번 지정 안해줘도 돼

## MongoDB 아이디 형식
> 6228286d07457889ee539fe6
> __16진수 24글자 string__
> [0-9a-f]{24}

### 라우트 변경하기
* 기존 ```"/:id(\\d+)"```에서 ```"/:id([0-9a-f]{24})"``` 으로 변경

### 정규식 참고
* 정규식 연습할 수 있는 사이트 <https://regex101.com/>
* 정규식에 대한 MDN의 공식 문서 <https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions>

## Model queries
### findByOne
* search term에 적은 condition을 모두 적용시킨다
  + e.g. 조회수가 25 이상인 영상

### findById / findByIdAndUpdate
* 해당 id 데이터 출력

### findByIdAndDelete와 Remove의 차이점이 뭐야?
* 별로 차이 없는데 remove는 롤백이 안되서 다시 되돌릴 수 없기 때문에 delete 사용을 권장함

### find({조건})
* 안에 필터 조건으로 해당하는 데이터 찾을 수 있다

#### find({}).sort({조건})
* 검색해서 정렬해서 데이터 가져올 수도 있음
```js
const videos = await Video.find({}).sort({createdAt: -1});
```

#### regex 쓰기
```js
const videos = await Video.find({
  title: {
    $regex: new RegExp(keyword, "i"),
  }
});
```
* __i__: 대소문자를 구분하지 않음을 의미

##### 만약에 keyword로 시작하는 애를 찾고 싶으면
>new RegExp(`^${keyword}`, "i")

##### keyword로 끝나는 애를 찾고 싶으면
>new RegExp(`${keyword}$`, "i")

## Model middleware
* model이 생성되기 전에 만들어야 함
```js
videoSchema.pre("save", async function() {
  this.hashtags = this.hashtags[0].split(",").filter((word) => {
    if (!word.trim()) {
      return false;
    }
    return true;
  })
    .map(word => word.trim().startsWith("#") ? word.trim() : `#${word.trim()}`);
})
```
  + 저장되기 전에 (pre) 해당 함수를 실행한다는 의미
    + 여기서 pre 같은 애를 __hook__ 이라고 함
  + __this__ 를 사용할 수 있어
  + 얘가 __create__ 할 때는 도움이 되는데 __findByIdAndUpdate__ 할 때는 도움이 안돼
    + findByIdAndUpdate의 조상인 findByOneAndUpdate에서는 this 사용 X

## Hashtags 처리하기
### 함수로 처리하기
```js
// Model
export const formatHashtags = (hashtags) => hashtags.split(",")
.map((word) => word.trim().startsWith("#") ? word.trim() : `#${word.trim()}`);

// Controller
import Video, { formatHashtags } from "../models/Video";

await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: formatHashtags(hashtags),
  });
```

### Static으로 처리하기
#### static 생성
* static은 Model에서 쓸 수 있는 함수를 생성하는 것
* 그래서 __schema.static(함수 이름, 함수)__ 형태
```js
videoSchema.static('formatHashtags', function(hashtags) {
  return hashtags.split(",").filter((word) => {
    if (!word.trim()) {
      return false;
    }
    return true;
  })
    .map(word => word.trim().startsWith("#") ? word.trim() : `#${word.trim()}`);
});
```

#### static 사용
* ```Video.formatHashtags(hashtags)```
```js
await Video.findByIdAndUpdate(id, {
  title, description,
  hashtags: Video.formatHashtags(hashtags),
});
```

# USER AUTHENTICATION
* Video에서 했던 것처럼 User도 CRUD 진행

## MongoDB 명령어
```bash
> show dbs
admin    0.000GB
config   0.000GB
local    0.000GB
rootube  0.000GB
wetube   0.000GB
> use rootube
switched to db rootube
> show collections
users
videos
> db.users.find()
{ "_id" : ObjectId("6228988fe43bb6a876a4f5a0"), "email" : "ellie@test.com", "username" : "ellie", "password" : "12", "name" : "Ellie", "location" : "Seoul, S. Korea", "__v" : 0 }
> db.users.remove({})
WriteResult({ "nRemoved" : 1 })
> db.videos.remove({})
WriteResult({ "nRemoved" : 3 })
```

## Password Hashing
* 해싱은 __일방향 함수__
> 1212 -------> sdfdf
> sdfdf ---X--> 1212
  + 같은 input으로는 항상 같은 output이 나오지만 그 output으로 input을 유추 할 수 없다.

### bcrypt
#### 설치
```bash
npm i bcrypt
```

#### 사용
* user 정보를 저장하기 전에 __middleware__ 로 password를 hashing 하자
* ```bcrypt.hash(데이터, 횟수, 콜백함수)```의 형태로 쓰는데 async/await으로 쓸거라 CB 안써
```js
userSchema.pre("save", async function() {
  if(this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 3);
  }
});
```
  + 다른 내용 수정 후 저장할 때도 password가 hash 되는 것을 막기 위해 if문 추가

## 중복 체크
```js
const exists = await User.exists({
  $or: [
    {username}, {email}
  ]
});
if (exists) {
  return res.render("join", { pageTitle: "Join", errorMsg: "This username or email is already taken."});
}
```

## Status codes
* 우리가 잘못된 username/password를 입력해서 join이 실패해도 status code 200을 보내서 브라우저는 가입이 성공한 줄 알고 username/password를 저장할 거냐고 묻는다.
> POST /join 200 50.066 ms - 910
  + 그래서 우리는 가입이 성공했을 때만 200을 보내기로 할거야.

### Bad request 400
```js
return res.status(400).render("join", { pageTitle, errorMessage: "This username or email is already taken."});
```

### Not found 404
* video에 적용

## 비밀번호 비교하기
* __bycrypt.compare(a,b)__ 사용
```js
const ok = await bcrypt.compare(password, user.password);
if (!ok) {
  return res.status(400).render("login", { pageTitle, errorMsg: "Wrong password." });
}
return res.redirect("/");
```

## Sessions and Cookies
### 개념
#### Sessions
* Session은 백엔드와 브라우저 사이에 어떤 활동을 했는지 기억하는 것
  + 백엔드와 브라우저 사이의 memory, history
  + 이게 작동하려면 백엔드와 브라우저가 서로에 대한 정보를 갖고 있어야 함
* Session ID는 Cookie에 저장된다.
  + Session 자체가 저장되는 거 아님
  + Session Data는 Server-side에 저장 (DB에 따로 저장)

#### Cookies
### 이게 왜 필요해?
* 로그인 페이지에서 HTTP 요청 -> 요청 처리 -> 끝 => __Stateless__
  + 그 이후로는 __백엔드가 아무 것도 할 수 없어__
  + 백엔드가 html을 rendering 하고나면 연결이 끝남, __연결이 유지되지 않음__
  + wifi 같은 애들은 계속 연결되어 있지 야는 stateless라서 아냐
* 유저가 백엔드에 뭔가 요청할 때마다 누가 요청하는 지 알 수 있도록 해야 함
  + 유저가 로그인 하면 우리가 유저에게 __something__ 을 준다.
  + 유저가 백엔드에 요청날릴 때마다 __something__ 을 우리에게 보여 준다.

### express-session
#### 설치
```bash
npm i express-session
```

#### 설정
```js
import session from "express-session";
// router 앞에 초기화 해주기
app.use(session({
  secret: "Hello!",
  resave: true,
  saveUninitialized: true,
}));
```
* 이제 이 미들웨어가 로그인하지 않은 사용자도 기억함

### Login시 session 저장
```js
// Session에 정보 추가
req.session.loggedIn = true;
req.session.user = user;
```

#### 그런데 template에서 어떻게 session 정보에 접근? __res.locals__
* locals object는 이미 모든 pug template에 import된 object다.

### MongoStore (connect-mongo)
* Session data는 memory에 저장되고 있기 때문에 이를 저장할 session store가 필요하다.
* 우리는 그래서 connect-mongo 사용해서 mongoDB에 저장할거야

#### 설치
```bash
npm i connect-mongo
```

#### 사용
```js
store: MongoStore.create({mongoUrl: "mongodb://127.0.0.1:27017/rootube"})
```
* session data의 store를 지정한다.

### saveUninitialized
* 우리가 세션을 초기화할 때는 로그인할 떄 뿐임 
* 초기화되지 않은 세션을 저장하겠냐는 의미임 -> false (저장안할거야)

### .env
* 관습적으로 모두 대문자로 적음
* 사용은 __process.env.COOKIE_SECRET__

#### 사용법
1. .env 생성 후 .gitignore에 추가
2. string 생성 후 process.env.[변수명]으로 사용
3. 설치
```bash
npm i dotenv
```
4. import
모든 파일의 상단에
```js
require("dotenv").config();
```
라고 적거나 init.js에 import 하기
```js
import "dotenv/config";
```

## Github
### flow
* 참고: https://docs.github.com/en/developers/apps/building-oauth-apps

> Step 1. 사용자를 깃헙으로 보내 (redirect to github)
* <https://github.com/login/oauth/authorize>   
* 해당 내용을 login.pug에 추가함, client_id는 아래 OAuth 생성하기 참고
```pug
a(href="https://github.com/login/oauth/authorize?client_id=fd9709cd4753cc6d8649") Continue with Github &rarr;
```
* 그런데 위에 처럼해서 진행하면 public data만 받아오게 됨. 
  + 우리는 사용자 email 등의 더 많은 데이터를 원해   
  + __scope__ 를 사용할거야. 자세한 내용은 아래 scope 참고

> Step 2. 그럼 사용자는 깃헙에 이메일과 비밀번호를 넣고 우리에게 정보를 공유하는 것을 승인할거야 (Authorize)
> Step 3. 그럼 깃헙은 사용자를 우리 사이트로 돌려보냄 + token과 함께 redirect

### Step 1
#### OAuth 생성하기
* <github.com/settings/apps> > OAuth Apps > Create

>Application name: Retube
>Homepage URL: http://localhost:4000/
>Authorization callback URL: http://localhost:4000/users/github/finish
* URL에 해당 내용은 우리가 저렇게 정한 거임

#### scope
* scope에는 우리가 사용자에 대해 어디까지 알 수 있는지 적으면 된다.   
  + 유저에게서 얼마나 많은 정보를 읽어내고 어떤 정보를 가져올 것에 대한 것
* 참고로 카톡에서는 permission 이라고 표현한다.
* 여러 개의 scope를 입력할 때는 __띄어쓰기__ 로 하면 된다.

* allow_signup: user가 github에 계정이 없다면 생성할 수 있게 할래? 아니면 계정이 이미 있는 사람들만 로그인하게 할래?
  + default: true

>https://github.com/login/oauth/authorize?client_id=fd9709cd4753cc6d8649&allow_signup=false&scope=user:email
url이 너무 길어서 아래처럼 임의로 정함 (login.pub)
```pug
a(href="/users/github/start") Continue with Github &rarr;
```
그리고 router와 controller에 startGithubLogin 생성   
controller에서 *URLSearchParams* 사용

config 오브젝트 생성할 때 key값을 url에 있는 거 그대로 사용해야 함
```js
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: "fd9709cd4753cc6d8649",
    allow_signup: false,
    scope: "read:user user:email",
  }
  const params = new URLSearchParams(config).toString();
  const url = `${baseUrl}?${params}`;
  return res.redirect(url);
}
```

### Step 2
#### authorize
* 사용자가 login > github login > authorize 누르면 ```users/github/finish``` 로 redirect 된다.
  + 그리고 뒤에 __?code=어쩌고__ 도 함께 보내줌
  + 참고로 ```users/github/finish```는 우리가 github에서 oauth 생성할 때 등록한 Authorization callback URL 이다.

#### access_token
* github에서 받은 code를 access 토큰으로 바꿔줘야 해
> POST https://github.com/login/oauth/access_token

* 필요한 것 *required*
  + code: url에 있음
  + client_id: oauth 생성할 때 받음 -> .env에 넣을 거야
  + client_secret: 말 그대로 비밀임. 오로지 backend에만 존재해야 함
    + github에서 generate 할 수 있고 .env에 넣음

* finishGithubLogin 함수 생성
  + __여기서 redirect 안하고 post로 url을 보낼거야__

#### fetch
fetch 뭔가를 하고 싶거나 뭔가를 가져오고 싶을 때 쓴다.   
POST: 우리가 url에 뭔가를 보내고 있다!

##### fetch 할 때 넣는 {} 의 의미
* HTTP headers는 는 클라이언트와 서버가 request(or response)로 부가적인 정보를 전송할 수 있도록 한다.

* Accept
  + 돌려줄 데이터 타입에 대해 서버에게 알려주는 역할
  + MIME 타입입니다
    + MIME type이란 웹에서 사용되는 확장자
    + type/subtype으로 구성

* Authorization
  + 보호된 리소스에 대한 접근을 허용하여 서버로 User agent를 인증하는 자격증명을 보내는 역할

##### fetch 설치 및 사용
* nodejs에서 fetch를 사용하려면 우선 설치부터 해야함
  + fetch는 브라우저에만 있고 서버에는 없다

```bash
npm install node-fetch@2.6.1
```
그리고 아래처럼 추가해야 함
```js
import fetch from "node-fetch";
```

```js
const json = await data.json();
res.send(JSON.stringify(json));
```
* await로 하나씩 값을 기다려서 가져오고 마지막에 res.send를 쓰면 json을 그냥 화면에 뿌려준다.
* 값 확인하기 좋음
  + json 안에 __access_token__ 이 있다.

### Step 3
> Authorization: token OAUTH-TOKEN
> GET https://api.github.com/user

#### json 가져오기
```js
// 위에꺼랑 다르게 아래는 json을 한 번에 가져오겠다.
const {access_token} = json;
const userRequest = await (await fetch("https://api.github.com/user", {
  headers: {
    Authorization: `token ${access_token}`,
  }
})).json();
console.log(userRequest);
```

#### scope에 2개 넣었으니 2번 request 날려야겠지
> 참고: https://docs.github.com/en/rest/reference/users#list-email-addresses-for-the-authenticated-user
> GET /user/emails
* 우리가 위에서 사용한 access_token을 가지고 이번에는 email 값을 가져오자
```js
const apiUrl = "https://api.github.com";
// scope read:user
const userData = await (await fetch(`${apiUrl}/user`, {
  headers: {
    Authorization: `token ${access_token}`,
  }
})).json();
// scope user:email
const emailData = await (await fetch(`${apiUrl}/user/emails`, {
  headers: {
    Authorization: `token ${access_token}`,
  }
})).json();
```

* 이제 여기서 verifed, primary 값을 찾아야 해
```
const email = emailData.find(value => value.primary === true && value.verified === true).email;
```

# Edit Profile
## 사용자의 로그인 하지 않은 상태로 edit 접근하면 undefined object error 발생
```js
res.locals.loggedInUser = req.session.user || {};
```
* undefined 일 경우 빈 오브젝트를 넣도록 middlewares에서 설정
## Middleware
### 로그인 사용자 / 로그인하지 않은 사용자 막는 미들웨어 생성
```js
// 로그인하지 않은 사용자는 로그인 페이지로 보낼 거야
export const loggedInUserOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};

// 로그인 한 사용자만 접근 가능 그 외에는 홈으로
export const publicOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return res.redirect("/");
  } else {
    next(); 
  }
}
```

### 라우트에 적용
```js
userRouter.get("/logout", loggedInUserOnlyMiddleware, logout);
userRouter.route("/edit").all(loggedInUserOnlyMiddleware).get(getEdit).post(postEdit);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
```
* get과 post에 나눠서 적용해야 할 경우에는 ```all()```을 사용한다.

## User Avatar
### Step 1. Input 만들기
```pug
form(method="POST")
  label(for="avatar") Avatar 
  input(name="avatar", id="avatar", type="file", accept="image/*")
```
* __accept__ 를 넣어 Image 파일만 불러올 수 있게 한다.

### Step 2. middleware 사용하기 -> multer
#### 설치
```bash
npm i multer
```

#### 사용
##### form에 enctype 추가
```pug
form(method="POST" enctype="multipart/form-data")
```
* 우리 form이 다르게 encode 된다는 뜻

##### configure a middleware
* middlewares.js에 생성한다
```js
// multer
export const uploadFilesByMulter = multer({
  dest: "uploads/",
});
```
  + multer를 통해 오는 파일을 ```uploads/``` 에 저장하겠다는 뜻
  + 그리고 uploads 파일 내용은 굳이 git에 올릴 필요 없으니 .gitignore에 추가

* router에 적용한다.
> app.post(url, middleware.single(이미지가 오는 곳), controller function)
  + 이미지가 여러개 오면 single X
```js
userRouter.route("/edit").all(loggedInUserOnlyMiddleware).get(getEdit).post(uploadFilesByMulter.single("avatar"), postEdit);
```
  + 미들 웨어는 왼쪽에서 ---> 오른쪽으로 실행된다.
  + single 안에 늫은 이름은 pug의 form의 input 이름이랑 같아야하고 그 내용을 multer에게 넘겨준다
  + 이렇게 하면 __req.file__ 이 생긴다.

* req.file
```bash
{
  fieldname: 'avatar',
  originalname: 'IMG_4143.PNG',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: 'uploads/',
  filename: 'd77bd318085c3e86fcb2ffe031bc5eea',
  path: 'uploads/d77bd318085c3e86fcb2ffe031bc5eea',
  size: 1292080
}
```
  + __DB에는 path를 저장해 절대 file 자체를 저장하지마!__

### Step 3. Avatar 불러오기
#### Template 적용
```pug
img(src="/"+loggedInUser.avatarUrl width="100", height="100")
```

#### static files serving
* 폴더 전체를 브라우저에 노출시킨다는 의미
  + ```~/uploads/44524532525```을 보기 위해서는 ```/uploads```가 활성화 되어 있어야 하니까

* route 등록
```js
app.use("/uploads", express.static("uploads"));
```

### 우리 file upload의 문제점
1. 서버에 저장한다.
  + 서버가 재시작 할 때마다 이전 서버에 있던 내용은 날아갈거야.
  + 서버가 두 개 필요하면 어떡해? 그럼 uploads를 공유하게 할 거야? 아니면 replica를 만들거야?
    + 파일을 우리 서버에 저장하는 게 아니라 다른 곳에 저장한다.
    + 서버가 사라졌다 다시 돌아와도 파일이 안전하게 저장되어 있을 수 있도록.

2. DB에 절대 file을 저장하면 안돼. path를 저장해야해!!
  + 원본은 hard driver나 amazone 같은 데 저장하면 된다.

## 데이터 연결하기
* video와 user 데이터를 mongodb의 _id를 사용해서 연결하자
  + _id는 super unique 하니까
  + user에는 user가 업로드한 모든 영상의 id를 저장하자
  + video에는 업로드한 owner의 id를 저장하자

### Models에 적용하기
* Model.js에 __objectId__ 를 추가하자
  + objectId는 JS에서 제공하는 type이 아니고 mongoose에서 제공하는 type이다.
  + 그리고 어떤 Model의 objectId인지 __ref__ 넣어야 함
```js
owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref:"User" },
```

### Populate 사용하기
```js
const video = await Video.findById(id).populate("owner");
```
* Populate()는 objectId를 참고해서 실제 데이터를 해당 항목에 넣어준다.
```bash
{
  meta: { views: 0, rating: 0 },
  _id: new ObjectId("621afbb4649abcc85a2cb3c1"),
  title: 'Roo',
  description: 'Roo plays with the yellow star.',
  videoUrl: 'uploads/videos/e0263752d59b16886dc247883265e7b8',
  hashtags: [ '#roo', '#dogs', '#cute', '#lovely' ],
  owner: {
    _id: new ObjectId("621afb0d89c41998c51031ae"),
    email: 'polystudio7@gmail.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/84376046?v=4',
    socialOnly: true,
    username: 'polystudio',
    password: '$2b$05$lBDqkxx7Q8iittmFBiPp5.5ipEBNEEYjCkO69YngDWs/RpnshEvpe',
    name: 'polystudio',
    location: null,
    __v: 0
  },
  createdAt: 2022-02-27T04:19:00.852Z,
  __v: 0
}
```

#  WEBPACK - FRONTEND
* 현재 모든 JS는 backend에서 돌아감
  + 이제 browser에서도 JS 돌아가게 할거야

## webpack이 뭔데
* package.json의 scripts 보면 babel-node가 우리가 쓴 js코드를 nodejs가 이해할 수 있도록 번역하고 있지
  + Frontend도 우리가 작성한 js코드를 이해할 수 있도록 js를 번들로 묶는 애 + 번역기가 필요한데 webpack이 우선 번들로 묶는 애임

### 설치
```bash
npm i webpack webpack-cli -D
```
* 우리가 webpack에 알려줄 내용은 __"여기에 source files이 있고 이 곳이 네가 결과물을 보낼 폴더야."__
 + 즉 우리가 코딩 할 곳은 src/client/js 고 browser가 읽을 곳은 assets/js 다.

### webpack.config.js
* 해당 파일 생성
  + 이 파일은 구식 JS 문법만 이해할 수 있어
  + import, export 이런 명령어 이해 못함

* webpack.config에 필요한 내용 2가지
  + entry
    + 우리가 처리하고자 하는 파일을 의미 e.g. Sexy JS
    + entry를 webpack에게 넘겨줘야하는데 src/client 아래에 있는 파일을 entry라고 하자
  + src/client/js/main.js 생성
* output
  + 어디에 결과물이 나올지
  + 무조건 __absolute path__

```js
const path = require("path");

module.exports = {
  entry: "./src/client/js/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "assets", "js"),
  }
}
```
* 그리고 config를 실행시키기 위해 package.json에 스크립트를 추가하자
```js
"scripts": {
  "dev": "nodemon --exec babel-node src/init.js",
  "assets": "webpack --config webpack.config.js"
```
* 실행하고 나면 assets/js/main.js에 우리가 작성한 코드가 압축되어 있는 것을 확인할 수 있다.
```bash
npm run assets
```

### Rules
* rules는 우리가 각각의 파일 종류에 따라 어떤 전환을 할 건지 결정하는 것   
* 그 파일 종류에 따라 적합한 __loader__ 를 찾아 설정하면 된다   
  + 우리는 babel-loader가 필요함

#### babel-loader
* 참고: <https://www.npmjs.com/package/babel-loader>
```bash
npm i -D babel-loader @babel/core @babel/preset-env webpack
```
* 우리 이미 다 설치해서 babel-loader만 설치하면 돼

* 설정
``` js
module: {
  rules: [
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }]
          ]
        }
      }
    }
  ]
}
```
  + 이 상태로 다시 npm run assets 실행시키면 코드가 더 요생해져있는데 babel이 이렇게 만든거야

### mode warning
```bash
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value.
Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
```
* 우선 현재 개발 중이라고 설정하자

```js
mode: "development",
```

### 폴더 구조
* ```src/client/```: 우리가 코딩할 폴더 (webpack 전)
* ```assets/```: 브라우저가 접근해서 볼 폴더 (webpack 후)

#### express에게 assets의 정체를 알려주기
* uploads 하듯이 server.js에 statc으로 설정한다.
```
app.use("/assets", express.static("assets"));
```
  + static? 폴더 전체를 브라우저에 노출시킨다는 의미

### template과 fontend js 연결하기
* base.pug 맨 아래에 스크립트 추가
```pug
script(src="/assets/js/main.js")
```

## SCSS
* Sassy CSS

### scss 폴더 및 파일 생성
* ```src/client/scss/_variables.scss```와 ```styles.scss``` 생성 후 내용을 채우고 ```main.js```에서 ```styles.scss```를 import 한다.
```scss
import "../scss/styles.scss";
```

### loader 설치
* scss를 사용하기 위해서는 loader(파일을 변환하는 장치)를 적용시켜줘야 한다.
* webpack은 뒤에서부터 시작하기 때문에 __역순__ 으로 입력해야 한다.
```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new MiniCssExtractPlugin({
    filename: "css/styles.css",
  })],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
```
  + minicssextraplugin 안에 filename 옵션을 줘서 해당 경로에 해당 파일로 css 파일을 저장할 수 있다.
#### scss-loader
* scss -> 일반 css => sass-loader
```bash
npm i -D sass-loader sass webpack
```

#### css-loader
* font 등을 사용할 때 쓰는 import나 url등을 변환
```bash
npm i -D css-loader
```

#### MiniCssExtractPlugin
* 참고: <https://www.npmjs.com/package/mini-css-extract-plugin>   
* js와 css를 분리
```js
npm i -D mini-css-extract-plugin
```

#### 쓰려고 했던 것들
```js
{
  test: /\.scss$/,
  use: ["style-loader", "css-loader", "sass-loader"],
}
```
* 변환한 css -> website에 적용(DOM) => style-loader
```bash
npm i -D style-loader
```

### 이제 pug에서 css 파일 연결할 거야
```
html(lang="ko")
  head
    title #{pageTitle} | Wetube
    link(rel="stylesheet" href="https://unpkg.com/mvp.css")
    link(rel="stylesheet" href="/assets/css/styles.css")
```
* 명심할 것!
  + client 파일은 webpack에 의해서만 로딩하게 할 거고
  + assets(static) 파일은 pug에서 로딩된다. 즉 사용자와 template은 만들어진 부분만 보게 된다.

## 추가 설정

### frontend도 수정되면 자동으로 npm 실행되게 하기
* config에 *watch*를 추가하면 front-end webpack이 계속 살아있게 된다.
```js
watch: true,
```

### output folder를 *클린*해주는 설정을 추가한다.   
* 근데 이거는 완벽히 webpack을 재시작했을 때만 적용된다.
```js
output: {
  filename: "js/main.js",
  path: path.resolve(__dirname, "assets"),
  clean: true,
},
```

### nodemon.json 생성
front-end가 수정되는데 nodeJS도 자꾸 재실행된다.   
그래서 nodemon 설정을 바꿀거야

#### Before
```json
"scripts": {
  "dev": "nodemon --exec babel-node src/init.js",
  "assets": "webpack --config webpack.config.js"
},
```

#### After
* nodemon.json을 생성 후 설정 내용을 넣는다.
```json
{
  "ignore": ["webpack.config.js", "src/client/*", "assets/*"],
  "exec": "babel-node src/init.js"
}
```
* 그리고 package.json은 아래처럼 수정한다.
```json
"scripts": {
  "dev": "nodemon",
  "assets": "webpack --config webpack.config.js"
},
```

### 최종 package.json 수정
* nodemon은 자동으로 nodemon.json을 부르고 webpack은 자동으로 webpack.config.js를 부르기 때문에 굳이 --config 설정 넣어주지 않아도 된다.
* 그리고 dev, assets 에서 dev:server와 dev:assets으로 좀더 명시적으로 이름을 수정함
```
"scripts": {
  "dev:server": "nodemon",
  "dev:assets": "webpack"
},
```

# STYLES
## Basic structure
### MVP CSS 삭제
* base.pug
* 우리는 pug 기반의 views를 만들었고 MVP css를 사용하고 있었다.

### font-awesome 설치
* <https://cdnjs.com/libraries/font-awesome>로 이동해서 고른다음에 base.pug에 적용
```pug
link(rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css")
```

* pug에서 아래처럼 쓰면 유투브 로고가 나온다
```pug
i.fab.fa-youtube
```

### client/scss 폴더 구성
#### config
* _variaables.scss
* _reset.scss
  + 참고 <https://meyerweb.com/eric/tools/css/reset>
  + 모든 설정을 0으로 바꿔주는 애야 (no padding, no margin, ...)

#### components
* partials(headers, footers, ...)나 mixins을 만들면 여기에 scss를

#### screens
* view template(home, search, ...)를 만들면 여기에 scss를

#### styles.scss에서 import 해서 쓴다.
```scss
// Config
@import "./config/_variables.scss";
@import "./config/_reset.scss";

// Components
@import "./components/header.scss";
@import "./components/footer.scss";

// Screens

```

### partials/header 생성 후 scss 생성
* base.pug에서 header를 분리하고 partials/header 생성
* 그 다음, header와 footer와 이름이 똑같은 scss를 components 아래에 생성한다.

# VIDEO PLAYER
## Dev env 세팅
### js 파일 생성
* src/client.js에 videoPlayer.js 생성
### entry 추가
* webpack.config.js의 entry를 obj로 변경 후 js를 추가한다.
```json
entry: {
  main: "./src/client/js/main.js",
  videoPlayer: "./src/client/js/videoPlayer.js",
},
```
  * 단 output에 js/main.js로 저장하고 있으므로 file의 이름에 따라 저장될 수 있도록 아래처럼 수정한다.
```json
output: {
  filename: "js/[name].js",
  path: path.resolve(__dirname, "assets"),
  clean: true,
},
```

### videoPlayer.js를 비디오 플레이어가 필요한 페이지에 로드하기
* 그건 바로 watch.pug
  + 그런데 watch는 extend base를 하고 있어서 script를 넣을 곳이 없기 때문에 base부터 수정할게

* Before base.pug
```pug
script(src="/assets/js/main.js")
```

* After base.pug
```pug
block scripts
```

* 그리고 watch.pug에서 scripts block 아래에 script를 넣어준다.
```pug
block scripts
  script(src="/assets/js/videoPlayer.js")
```

### pug 주석처리
* ```//```라고 하면 frotnend에서 볼 수 있음
* ```//-```라고 하면 frontend에서 보이지 않음

## videoPlayer.js 설정
### video element와 audio element
* video element와 audio element는 둘다 html media element로부터 상속받는다.   
  + <https://developer.mozilla.org/ko/docs/Web/API/HTMLMediaElement>

### element 설정
```javascript
const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");
```

## play()와 pause()
```javascript
// handle play pause
playBtn.addEventListener("click", (event) => {
  // if the video is playing, pause it
  if (video.paused) {
    video.play();
  } else {
    // else play the video
    video.pause();
  }
});

// Change Innertext
video.addEventListener("pause", (event) => {
  playBtn.innerText="Play";
});
video.addEventListener("play", (event) => {
  playBtn.innerText="Pause";
});
```

## Property muted
* play와 다르게 property로 존재함 (T/F)
```js
video.muted
```

## Volume
* volumeRange는 *change*와 *input*이라는 이벤트를 감지한다.
  + change: 마우스 커서를 놓을 때 값을 받아옴
  + input: 실시간으로 커서를 이동할 때 값을 받아옴
```javascript
volumeRange.addEventListener("input", (event) => {
  console.log(event.target.value);
});
```

## Duration
### loadedmetadata (이벤트)
* 참고: <https://developer.mozilla.org/ko/docs/Web/API/HTMLMediaElement>
* fired when the metadata has been loaded
* meta data는 video를 제외한 모든 데이터
  + e.g. width, height, ...

### 사용
* event handler
```js
video.addEventListener("loadedmetadata", (event) => {
  totalTime.innerText = Math.floor(video.duration);
});
```

### 버그
* vent listner를 추가하기 전에 video가 전부 로딩되서 loadedMetadata가 아예 불러지지 않은 경우에 total time이 출력되지 않음
* ```readyState == 4``` 라는 것은 비디오가 로딩 되었다는 뜻
```js
// handle totalTime
const handleLoadedMetadata = () => {
  totalTime.innerText = Math.floor(video.duration);
}
video.addEventListener("loadedmetadata", handleLoadedMetadata);

if (video.readyState == 4) {
  handleLoadedMetadata();
}
```

## Current Time
### timeupdate (event)
* 참고: <https://developer.mozilla.org/ko/docs/Web/API/HTMLMediaElement>
* current time이 업데이트될 때마다 cureentTime라는 value를 가져옴
```js
// handle currentTime
video.addEventListener("timeupdate", (event) => {
  currentTime.innerText = Math.floor(video.currentTime);
});
```

## Time Formatting
* new Date(우리값*1000).toISOString().subString(11, 19);
  + milleseconds기 때문에 우리가 가진 초 값 * 1000 하면 우리가 아는 시간으로 계산
  + .toISOString()으로 가져오면 앞에 1970-01-01도 같이 오니까 스트링을 잘라내자
  + .subString(시작index, 종료index)를 쓰자. 참고로 index는 0부터 시작
```js
const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substring(14, 19);
};
```

## Timeline
### 기능
* 우리 비디오 시간을 업데이트 해주는 기능
  + 재생바를 움직일 때 아래 표시되는 current Time이 바뀌게

* template 수정 + element 및 변수 추가
  + template에서 timeline ranage를 생성할 때 max를 정해주지 않고
  + loadedMetadata에서 video.duration을 max 값으로 가져오자

### template과 max값 설정
```pug
// template
div 
  input(type="range", step="1", value=0, min="0")#timeline
```
```javascript
// controllers
const timeline = document.getElementById("timeline");

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
}
```

### controller 수정
1. 비디오 시간에 따라 timeline range가 변경되도록 하기
* __timeupdate__ 는 비디오 시간이 변경되는 걸 감지하는 event이기 때문에 그대로 사용하자
```js
video.addEventListener("timeupdate", (event) => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
});
```

2. timeline range를 변경하면 비디오 시간이 변경되게 하기
```js
// handle timeline
timeline.addEventListener("input", (event) => {
  const {
    target: {
      value,
    }
  } = event;
  video.currentTime = value;
})
```

## Fullscreen
### requestFullscreen()
* 위의 다른 속성들처럼 #fullScreen이라는 버튼을 추가한 후 event handler에서 *requestFullscreen* 사용
```js
// handle fullscreen button
fullScreenBtn.addEventListener("click", () => {
  video.requestFullscreen();
});
```

* 그런데 비디오만 확대하는 게 아니라 전체 요소를 다 확대하고 싶다
  + template에 ```div#videoContainer``` 추가
  + 똑같이 ```videoContainer.requestFullscreen()``` 사용 가능

### document.fullscreenElement와 document.exitFullscreen()
* Enter Full Screen <-> Exit Full Screen 버튼 내용 변경
  + ```document.fullscreenElement```는 현재 fullscreen이면 해당 element를 출력함 ( e.g. div)
  + ```document.exitFullscreen()```는 fullscreen을 벗어나게 한다.
```javascript
// handle fullscreen button
fullScreenBtn.addEventListener("click", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    fullScreen.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullScreen.innerText = "Exit Full Screen";
  }
});
```

### fullscreenchange (event)
* esc 키로 창을 벗어났을 때도 버튼명을 변경하고 싶어
```js
videoContainer.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    fullScreen.innerText = "Enter Full Screen";
  }
});
```

## Controls Events
### 구현할 기능
* 마우스가 언제 비디오에 들어가고 언제 비디오 안에서 움직이는지
  + 마우스 커서를 비디오 위에 올리면 컨트롤이 활성화되는 기능
  + 마우스가 움직이면 컨트롤이 활성화되는 기능
* 마우스가 움직임을 멈추면 몇 초 후에 컨트롤러가 사라짐
* 혹은 비디오 위에서 마우스가 사라지면 몇 초 후에 컨트롤러 사라짐

### How to
* controls에 classname을 추가해서 나중에 css에서 처리할 수 있도록 한다.
* 위에서 설정한 상황에 따라 classname을 변경 적용 한다.

### Implementation
1. template 수정
  * 전체 controls를 포함하는 div에 videoControls라고 아이디 추가
  * controller에서 element 가져오기

2. mousemove 이벤트 핸들러 생성
  * video 위에 마우스가 올라가면 videoControls에 classname 생성하기
```js
video.addEventListener("mousemove", () => {
  videoControls.classList.add("showing");
});
```

3. mouseleave 이벤트 핸들러 생성
  * video 위에 마우스 벗어나면 classname 지우기
  * 바로 지우는 게 아니라 3초 후에 지우기 *setTimeout()*
```javascript
video.addEventListener("mouseleave", () => {
  setTimeout(() => {
    videoControls.classList.remove("showing");
  }, 3000);
});
```
  * 마우스가 중간에 다시 들어오면 setTimeout()을 취소해야해
    + mouseleave에서 controlsTimeoutPid를 받고 mouseenter에서 지운다
```javascript
let controlsTimeoutPid = null;

video.addEventListener("mousemove", () => {
  videoControls.classList.add("showing");
  clearTimeout(controlsTimeoutPid);
});

video.addEventListener("mouseleave", () => {
  controlsTimeoutPid = setTimeout(() => {
    videoControls.classList.remove("showing");
  }, 3000);
});
```

4. mouseleave 이벤트 핸들러 생성
  * 마우스가 움직임을 멈추면 3초 후에 classname 지우기
    + 마우스가 움직임을 시작하면 setTimeout을 실행시키면서 지우기
    + 움직임이 멈추면 setTimeout이 clear 되지 않아
```javascript
let controlsMovementTimeoutPid = null;
const hidingControls = () => videoControls.classList.remove("showing");

video.addEventListener("mousemove", () => {
  if (controlsTimeoutPid) {
    clearTimeout(controlsTimeoutPid);
    controlsTimeoutPid = null;
  }
  if(controlsMovementTimeoutPid) {
    clearTimeout(controlsMovementTimeoutPid);
    controlsMovementTimeoutPid = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeoutPid = setTimeout(hidingControls, 3000);
});

video.addEventListener("mouseleave", () => {
  controlsTimeoutPid = setTimeout(hidingControls, 3000);
});
```

# API VIEWS
## 설명
* 영상 조회수를 기록하는 기능
  + 사용자가 영상을 다 보면 db에서 view가 1개 증가해야 함
* __API view__: template을 랜더링하지 않는 뷰
  + 오로지 목적은 백엔드에 정보를 전송하고 처리
    + frontend에서 JS를 호출하는 URL
  + 요청을 보내더라도 url을 바꾸거나 템플릿을 랜더링하지 않음
    + form을 사용하지 않고 post를 구현

## 구조 구축
### apiRouter.js
* videos의 id를 가져온다.
```js
import express from "express";
import { registerView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);

export default apiRouter;
```

* server.js에 추가
```js
app.use("/api", apiRouter);
```

### controller
* 얘는 template을 렌더링하지 않기 때문에 __status__ 만 리턴한다.
* render/redirection을 하지 않고 status만 출력하고 싶으면 __sendStatus()__ 를 써야한다.
  + 404: 비디오가 없을 때
  + 200: 정상일 때
```js
export const registerView = async (req, res) => {
  // get video using id
  const { id } = req.params;
  const video = await Video.findById(id);
  if(!video) {
    return res.sendStatus(404);
  } 
  video.meta.views += 1;
  await video.save();
  return res.sendStatus(200); // OK
};
```

## URL 호출
### Interactivity
* 이 URL은 frontend에서 호출해야해
  + 보통은 해당 url로 페이지 이동하면 백엔드의 controller가 실행
  + 여기서는 페이지 이동 없이 url을 호출하는 방법을 배울거야 => __interactivity__

> Interactivity는 URL이 바뀌지 않아도 페이지에서 변화가 생기는 것을 의미
  + e.g. 강의에 댓글을 달면 url이 바뀌지 않음
  + 우리가 pug 쓰는 건 interactivity 하지 않아 (왜냐면 url을 바꾸니까)

### videoPlayer.js
* 유저가 비디오 시청을 끝냈을 때 생기는 이벤트를 처리하자
  + 그냥 fetch()쓰면 get 요청이기 때문에 post로 바꿔야해
```js
// when user finishes watching video,
video.addEventListener("ended", () => {
  // request to backend
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
});
```

* fetch 하려면 비디오 id를 알아야하는데 그 아이디는 이 템플릿을 랜더링하는 pug에게 정보를 넘기라고 하자
    + 가장 좋은 방법은 우리가 직접 데이터를 만들어서 HTML에 저장하는 것 - *data attribute*

### Data attribute
* data-로 시작하는 attribute를 의미
  + e.g. data-columns, data-index-number, ...
```pug
div#videoContainer(data-id=video._id)
```

# VIDEO RECORDER
## 뼈대 구축
* recorder.js
  + 이 js는 webpack에 처리되어야 하니까 webpack.config.js에 추가
  + webpack 재 실행하면 assets 아래에 js 생성된다

* upload.pug에 script 추가
```pug
block scripts
  script(src="/assets/js/recorder.js")
```

## Stream 추가
### 사용자의 오디오, 비디오 stream 가져오기
> navigator.mediaDevices.getUserMedia({audio: true, video: true})
```js
recordBtn.addEventListener("click", async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true, 
    video: true,
  });
  console.log(stream);
});
```

### error handling
>recorder.js:6 Uncaught ReferenceError: regeneratorRuntime is not defined
* frontend에서 async await를 쓰려면 regeneratorRuntime을 설치해야해 -> 아니면 그냥 promise로 쓰던가
  + ```npm i regenerator-runtime```
  + main.js에 ```import regeneratorRuntime from "regenerator-runtime";```
  + base.pug에 main.js를 import

## stream 보여주기
### srcObject
* *srcObject*는 video가 가질 수 있는 무언가를 의미
```javascript
  video.srcObject = stream;
  video.play();
```

## Record
### MediaRecorder
* MediaRecorder를 사용해서 녹화 할 예정
* __ondataavailable__ event 사용

### URL.createObjectURL()
* __URL.createObjectURL()__: 브라우저 메모리에서만 사용할 수 있는 URL을 생성
```html
<video id="preview" src="blob:http://localhost:4000/6e15e3ef-93a1-41f0-9e7e-136ef2426b5a"></video>
```
* 꼭 우리 웹사이트에서 호스팅되는 것처럼 보여도 실제론 X

## Download the file
* __Fake link__
  + a tag 생성해서 비디오 링크를 걸고 body에 append 한 다음 걔를 클릭했다고 이벤트를 발생시키자
```js
const a = document.createElement("a");
a.href = videoFile;
a.download = "MyRecording.webm";
document.body.appendChild(a);
a.click();
```

* output
```html
<a href="blob:http://localhost:4000/d8b8e836-6d20-4dfe-a773-35099471c6ea" download="MyRecording"></a>
```

* 만약 mp4로 하고 싶으면 아래처럼 recoder 생성할 때 타입 지정하면 된다.
  + 우리 브라우저에서는 안된다.
```js
recorder = new MediaRecorder(stream, {mimeType: "video/mp4"});
```

# WEB ASSEMBLY VIDEO TRANSCODE
## 개요
### FFmpeg
* 비디오/오디오 같은 미디어 파일을 다룰 수 있음
  + 비디오 압축, 오디오 추출, 화면 캡쳐 등
* 여기서는 webm -> mp4로 변환 후 섬네일 추출 할 거야
  + 왜냐면 ios에서 webm 못 읽어
* 백엔드에서 실행해야 해
  + 그런데 누가 1기가 비디오를 업로드하고 내가 그걸 변환해야 한다면? 백엔드 성능이 엄청 좋아야 해 -> 비싸
  + 그래서 __webassembly__ 를 쓸 거야

### Webassembly
* 개발형 표준
  + 기본적으로 웹사이트가 매우 빠른 코드를 실행할 수 있게 함
  + 프론트에서는 세 종류의 코드만 사용할 수 있다
    + HTML / CSS / JS
  + Webassembly는 JS를 쓰지 않고 다른 종류의 프로그램을 사용해서 프론트엔드에서 매우 빠른 코드를 실행할 수 있어

### 우리의 설계
* 유투브는 업로드 된 비디오를 그들의 비싼 서버에서 변환할 거야
* 우리는 사용자의 브라우저에서 비디오를 변환할거야 -> __webassembly를 사용해서 브라우저에서 FFmpeg를 돌릴 거야.__

### 설치
* ffmpeg.wasm (wasm? webassembly라는 뜻)
  + 참고: <https://github.com/ffmpegwasm/ffmpeg.wasm>
```bash
npm install @ffmpeg/ffmpeg @ffmpeg/core
```

## Transcode Video
### 설계
* 현재 우리는 브라우저로부터 마법의 URL을 받고 있다
  + 녹화를 종료하면 영상의 모든 정보를 가진 object url이 생성된다 (recorder.js)
```js
videoFile = URL.createObjectURL(event.data); 
```
* 사용자가 download 버튼을 누르면 영상을 불러서 변환 할 예정

### 1단계
* import 후 ffmpeg instance를 생성, load 해야 해
```js
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({log: true});
await ffmpeg.load();
```
* 왜 load할 때 await 하지? 
  + 사용자가 __software__ 를 사용하기 때문! js가 아닌 코드를 사용하기 위해 무언가를 설치해야하기 때문에
  + 우리 웹사이트에서 다른 소프트웨어를 사용하기 때문, 그런데 그 소프트웨어가 무거울 수 있다
  + 그런데 우리 서버에서 하는 거 아니고 유저의 브라우저에서 처리하기 때문에 컴퓨팅 파워 신경 쓸 필요는 없다

### 2단계
* 눈을 감고 우리가 브라우저 안에 있다는 생각을 멈춰 -> 우리는 폴더와 파일로 가득 찬 컴퓨터 안에 있다.
  + webassembly를 쓰는 순간 우리는 폴더와 파일이 있는 가상의 컴퓨터를 브라우저에서 실행한거야
* ffmpeg에 파일 생성하기
  + 가상 컴퓨터에 파일을 생성하는 거야 -> 컴퓨터 메모리에 저장된다
  + backend에서는 multer가 파일을 생성했지 (avatar, videos, ..)
  + FS == File System
```js
ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
```
  + method name, file name, binary data
  + FS안에 넣을 수 있는 method name은 3가지
    + readFile
    + unlink
    + writeFile: ffmpeg의 가상 세계에 파일 생성

* 파일 변환
```js
await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");
```
  + 명령어, input file name, output file name
    + -i: input
    + 우리가 이미 위에 "recording.webm"를 만들었기 때문에 (FS 명령어로) 여기서 쓸 수 있는 거야
    + -r 60: 초당 60프레임으로 인코딩

### 온갖 에러 핸들링
* ffmpeg core 404 error
  + 해당 모듈의 경로를 express statc 처리해주고 ffmpeg instance 생성할 때 corePath를 임의로 지정
```js
// server.js
app.use("/static", express.static("node_modules/@ffmpeg/core/dist"));

// recorder.js
const ffmpeg = createFFmpeg({
  corePath: "/static/ffmpeg-core.js",
  log: true
});
```

* 그다음 무슨 promise error는 server.js에서
```js
// ffmpeg.wasm을 사용하기 위해 corss-origin- 어쩌구를 위함
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
```

## Download Transcoded Video
### URL 불러오기
* 우리가 위에서 받은 output.mp4는 __브라우저 메모리__ 에 있다.
  + 우선 이 파일을 다시 불러와야 해
```js
const mp4File = ffmpeg.FS("readFile", "output.mp4");
```
* 그러나 받아온 mp4File은 __그냥 array__ 라 할 수 있는 게 없어 -> __Blob을 만들자__

### Blob 만들기
```js
const mp4File = ffmpeg.FS("readFile", "output.mp4");
const mp4Blop = new Blob([mp4File.buffer], { type: "video/mp4" });
const mp4Url = URL.createObjectURL(mp4Blop);
```
* Blob? JS 세계의 파일. 파일 같은 객체
  + recording start할 때 생성한 videoFile에 들어가는 event.data도 Blob임
  + 거기서도 event.data로 URL생성함
* video file에 접근하고 싶으면 __buffer__ 를 사용해야해
  + 그냥 mp4File은 array고 mp4File.buffer는 ArrayBuffer로 실제 파일을 나타내고 있다. (여기선 video file)
  + 즉 binary data에 접근하려면 buffer를 사용해야 해
* Blob 만들 때 배열 안에 배열
  + 만들고나서 JS에게 mp4 type이라는 걸 알려줘야해

### 비디오 저장하기
* Before
```javascript
const a = document.createElement("a");
a.href = videoFile;
a.download = "MyRecording.webm";
document.body.appendChild(a);
a.click();
```

* After
```javascript
const a = document.createElement("a");
a.href = mp4Url;
a.download = "MyRecording.mp4";
document.body.appendChild(a);
a.click();
```

## Thumbnail
### Thumbnail 생성
* 영상 screenshot을 찍는 거야
```js
await ffmpeg.run("-i", "recording.webm", "-ss", "00:00:01", "-frames:v", "1", "thumbnail.jpg");
```
  + -ss: 특정 시간대로 이동
  + -frames:v 1: 한장의 스크린샷 프레임
  + 해당 내용은 브라우저 메모리에 저장된다.

### Blob 만들기
* 동영상 저장할 때 처럼 파일 읽고 Blop 만들고 URL 만들기
```javascript
const thumbFile = ffmpeg.FS("readFile", "thumbnail.jpg");
const thumbBlop = new Blob([thumbFile.buffer], { type: "image/jpg" });
const thumbUrl = URL.createObjectURL(thumbBlop);
```

### Thumbnail 저장
* 동영상처럼 똑같이 저장하면 돼
  + downloadFile이라는 함수를 만들어서 똑같이 저장해줌
```js
downloadFile(mp4Url, "MyRecording.mp4");
downloadFile(thumbUrl, "MyThumbnail.jpg");
```

### Thumbnail 추가 (업로드)
* Video.js의 스키마에 ThumbUrl 추가
```js
thumbUrl: { type: String, required: true },
```

* upload.pug에 관련 input 추가 (Video File이랑 똑같이 하면 돼)
```pug
label(for="thumb") Thumbnail File 
input(name="thumb", id="thumb", type="file", accept="image/*", required)
```

* videoRouter.js는 video를 upload 할 준비가 되어 있지만 thumbnail을 업로드 할 준비 X
  + 기존 video 같은 경우는
    + middlewares.js에서 uploadVideoMiddleware 라는 이름으로 multer를 사용해.
    + 그리고 videoRouter.js에서 ```.post(uploadVideoMiddleware.single("video")```로 video를 가져온다.
  + 그런데 multer는 다행히 single 뿐만 아니라 fileds라고 받고 싶은 파일 이름을 특정 지어서 가져올 수 있어
```javascript
.post(uploadVideoMiddleware.fields([
  {name: "video", maxCount: 1}, {name: "thumb", maxCount: 1},
])
```

* 그런데 postUpload controller는 req.file을 기다리고 있거든. 이제 *req.files* 써야해.
```javascript
const {
  body: {
    title, description, hashtags,
  },
  files: {
    video, thumb,
  },
  session: {
    user: {
      _id,
    }
  }
} = req;

try {
  const createdVideo = await Video.create({
    title,
    description,
    thumbUrl: thumb[0].path,
    videoUrl: video[0].path,
```

* 이제 섬네일이 보이게 하려면 mixins/video.pug에 thumbUrl로 이미지 출력 한다.
```pug
div.video-mixin__thumb(style=`background-image:url(${video.thumbUrl}); background-size: cover; background-position: center`)
```

## 메모리에서 삭제하기
```js
// There are too many things in browser memory, so clean them.
ffmpeg.FS("unlink", files.input);
ffmpeg.FS("unlink", files.output);
ffmpeg.FS("unlink", files.thumbnail);
// 객체 해제
URL.revokeObjectURL(mp4Url);
URL.revokeObjectURL(thumbUrl);
URL.revokeObjectURL(videoFile);
```

# FLASH MESSAGES
## 개요
* 사용자에게 메시지를 전달하고 싶다.
  + 이미 로그인했는데 로그인페이지로 오면 우리가 "/"으로 redirect하는데 적어도 이유는 알려줘야지

## express-flash
* 사용자에게 flash message를 남길 수 있게 함
* 템플릿에 메시지를 남길 수 있게 해주는 middleware
  + this message is based-on __session__, so private.

### 설치
```npm i express-flash```

### 설정
* server.js
```js
import flash from "express-flash";

// flash message
app.use(flash());
```
  + 이제 이 flash()가 session에 연결해서 사용자에게 메시지를 넘길거야
  + 이걸 연결한 순간부터 우리는 __req.flash()__ 라는 함수를 쓸 수 있어

### 메시지 생성
* middlewares.js나 video 혹은 user controller(redirect)에 추가
  + 메시지 타입, 메시지 내용
```javascript
req.flash("error", "Not authorized.");
```

### 메시지 보여주기
* 우리가 flash 미들웨어를 설치 + 사용하면 __messages locals__ 이 생성된다.
  + 즉 pug에서 messages.error 혹은 messages.info 이렇게 내용을 가져올 수 있음
  + 이 메시지는 한 번 보여지고 나면 express가 메시지를 cache에서 지워버림

* mixins/message.pug
```pug
mixin message(kind,text)
  div.message(class=kind)
    span=text
```

* base.pug에 추가
```pug
include mixins/message
//(생략)
if messages.error
  +message("error", messages.error)
if messages.info
  +message("info", messages.info)
if messages.success 
  +message("success", messages.success)
```

  + 그러면 element에 아래처럼 추가 된다
  + 즉 css에서 message class에 css를 추가할 수 있다는 뜻
```js
<div class="message error"><span>Log in first.</span></div>
```

# COMMENT SECTION
## 개요
* 동적 댓글 창을 만들자
* 17에서는 실제 디플로이를 할 거야
  + assets은 절대 서버에 올리면 안되는데 우리는 올리고 있어
* 16은 우리가 지금까지 한 거 최종 복습 시간

## Comment Model
* 모든 건 데이터로부터 시작한다!
* models/Comment.js
```js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type:String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref:"User" },
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
```
* 어떤 비디오의 코멘트인지 알기 위해 video id 데이터를 넣는다 -> 즉 비디오는 여러 개의 코멘트를 가진다는 소리
  + models/Video.js에 아래 내용 추가되어야 함
  + models/User.js도 마찬가지
```js
comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
```

* init.js
```js
import "./models/Comment";
```

## Comment Box (Frontend)
### client/js/commentSection.js
* 파일 생성하면 아직 webpack이 인식못하기 때문에 webpack에 넣어줘야해
  + webpack.confing.js에 ```commentSection: BASE_JS + "/commentSection.js",``` 추가
  + webpack을 수정하면 재시작해줘야해
    + assets/commentSection.js가 있다? -> 잘 뜬 거

### template (watch.pug)
* template과 위에서 생성한 js 연결
```pug
script(src="/assets/js/commentSection.js")
```

* comment box 추가
```pug
if loggedIn
  div.video__add-comments
    form.video__comment-form#commentForm
        textarea(cols="30", rows="10", placeholder="Write a nice commment...")
        button Add Comment
```

### commentSection.js 함수 추가
```js
const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    body: {
      text,
    }
  });
});
```
* form에 있는 버튼을 누르는 순간 form이 제출된다 -> 새로 고침
  + 그래서 우리는 click event를 감지하는 것 대신에 form의 submit event를 감지해야해
    + 그리고 default 동작도 막아야 해 -> event.preventDefault();
  + fetch로 데이터 보낼 때 body에 넣어서 보낸다 (그게 POST method의 특징이잖아)
  + api url은 apiRouter.js에 추가한다

* apiRouter.js
```js
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);
```
  + 위의 내용 추가하려면 videoController에 createComment 함수 있어야 해

* videoController.js
```js
export const createComment = (req, res) => {
  console.log(req.params);
  console.log(req.body);
  return res.end();
};
```
  + output
```bash
{ id: '622318b6f8ceb9b763bb5fcf' }
{}
```
  + 왜 req.body가 넘어오지 않지?
    + 우리가 form 데이터를 req.body로 넘겨줄 때 form의 데이터를 js가 이해할 수 있도록 ```app.use(express.urlencoded({extended: true}));``` *미들웨어*를 사용했었지
    + 이번에는 fetch 데이터를 js가 이해할 수 있게 가르쳐야 해
      + fetch로 받아오는 데이터는 대부분 json이다

* JSON.stringify() 적용
  + commentSection.js
```js
fetch(`/api/videos/${videoId}/comment`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    text,
  }),
});
```
  + header는 기본적오르 Request에 대한 정보를 담고 있다
    + content-type에 우리가 지금 *text지만 사실 json 데이터*을 보내고 있다는 걸 알려줘야해 (그래야 미들웨어가 json()을 실행시키지)
  + stringify를 써서 String으로 변환된 데이터를 넘기면 -> *미들웨어*가 string을 json으로 변환시켜준다.
```js
app.use(express.json());
```

## Rendering Comments
### DB에 넣기
* 우리가 코멘트를 작성했는데 db데이터의 comments는 비어 있어
* 코멘트 생성하고 나서 비디오에 comment id 넣고 user에도 comment id 넣어준다음 db 업데이트 해야해
```js
video.comments.push(comment._id);
user.comments.push(comment._id);
video.save();
user.save();
```

### 댓글 출력하기
* videoController.js의 watch에 __populate__ 추가
```js
const video = await Video.findById(id).populate("owner").populate("comments");
```

* watch에 댓글 view 추가

### 실시간처럼 보이기 --deprecated--
* __form submit handler를 async로 만들고 fetch를 await__ 한 다음 ```window.location.reload();```하면 실시간처럼 보임
* 근데 reload하면 전체 새로고침이라 매번 db에 가서 데이터 가져오는 거임 그래서 이 방법은 안쓸거야

## Realtile Comments
* 우리가 댓글을 써서 submit되면 -> fetch -> backend로 넘어가서 (videoController.js) 작업
  + 그런데 backend에서 status를 404 줄 때도 있고 201 줄 때도 있잖아
  + 그래서 fetch 함수에서는 ```Promise<response>```를 리턴한다

* 우리가 댓글을 뿌릴 때 pug에서 뿌리는데
  + 새로 추가된 댓글을 js로 commentSection.js에서 바로 뿌려주면 새로고침 안해도 돼
  + *addComment()*라는 함수 만들어서 실행시킴
    + *prepend()*는 맨 위에 붙여준다. append()는 맨 뒤에 붙여줌

## Delete Comments
* 댓글을 지우려면 comment id가 필요해서 backend에서 넘겨주자
```js
return res.status(201).json({newCommentId: comment._id}); // Created
```

* 그러면 frontend js에서는 이렇게 받아온다
```js
if (response.status === 201) {
  textarea.value = "";
  const {newCommentId} = await response.json();
  addComment(text, newCommentId);
}
```

# DEPLOYMENT
## Build Backend
### Babel CLI 설치
> npm install --save-dev @babel/core @babel/cli
* 현재는 babel-node 사용하고 있는데 얘가 속도가 느리기 때문에 babel cli 사용해서 코드 변경

### scripts 추가: build:server
```json
"build:server": "babel src -d build",
```
* ```-d build```는 build directory에 저장하겠다는 의미
* ```% npm run build:server``` 실행하면 build 폴더가 생성되는 데 얘는 ```.gitignore```에 넣자

### scripts 추가: start
```json
"start": "node build/init.js",
```
* 실행하면 ```regeneratorRuntime is not defined``` 에러 발생 (async/await 사용 때문에)
  + init.js 맨 위에 ```import "regenerator-runtime";``` 추가 후 ```% npm run build:server``` 한 다음에 ```% npm start``` 하기

## Build Frontend
### scripts 추가: build:server
```json
"build:assets": "webpack --mode=production",
"dev:assets": "webpack --mode=development -w"
```
* webpack.config.js에서 mode 관련 코드를 지우고 webpack build를 할 때 mode를 직접 넘겨주자
* watch 모드도 지우고 같이 넘겨주자 ```-w --watch```