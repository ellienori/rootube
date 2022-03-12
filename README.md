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

### Statics로 처리하기
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
  this.password = await bcrypt.hash(this.password, 3);
});
```

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