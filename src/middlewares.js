

// session을 locals에 저장하는 미들웨어
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Rootube";
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.loggedInUser = req.session.user;
  next();
};