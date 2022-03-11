import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const pageTitle = "join";
  const { name, email, password, password2, username, location } = req.body;
  if(password !== password2) {
    return res.status(400).render("join", { pageTitle, errorMsg: "Password confirmation is not matched."});
  }

  const exists = await User.exists({
    $or: [
      {username}, {email}
    ]
  });
  if (exists) {
    return res.status(400).render("join", { pageTitle, errorMsg: "This username or email is already taken."});
  }

  try {
    await User.create({
      name,
      email,
      password,
      username,
      location
    });
    return res.redirect("login");
  } catch(error) {
    console.log(`postJoin error: ${error}`);
    return res.render("join", { pageTitle, errorMsg: error._message });
  }
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login"});
};

export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  const user = await User.findOne({username});
  if(!user) {
    return res.status(400).render("login", { pageTitle, errorMsg: "An accout with this username doen not exist." });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", { pageTitle, errorMsg: "Wrong password." });
  }
  // Session에 정보 추가
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const logout = (req, res) => res.send("Logout user");

export const profile = (req, res) => res.send("User profile");

export const edit = (req, res) => res.send("Edit user");

export const deleteUser = (req, res) => res.send("Delete user");