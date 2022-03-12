// session을 locals에 저장하는 미들웨어
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Rootube";
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.loggedInUser = req.session.user || {};
  next();
};

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