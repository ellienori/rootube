import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

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
  const user = await User.findOne({username, socialOnly: false});
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

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const profile = (req, res) => res.send("User profile");

export const edit = (req, res) => res.send("Edit user");

export const deleteUser = (req, res) => res.send("Delete user");

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT_ID,
    allow_signup: false,
    scope: "read:user user:email",
  }
  const params = new URLSearchParams(config).toString();
  const url = `${baseUrl}?${params}`;

  return res.redirect(url);
}

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    code: req.query.code,
    client_id: process.env.GH_CLIENT_ID,
    client_secret: process.env.GH_SECRET,
  }
  const params = new URLSearchParams(config).toString();
  const url = `${baseUrl}?${params}`;
  const data = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json"
    }
  });
  const json = await data.json();

  if ("access_token" in json) {
    const {access_token} = json;
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
    const email = emailData.find(value => value.primary === true && value.verified === true).email;
    
    if(!email) {
      return res.redirect("/login");
    }

    let user = await User.findOne({email});
    if(!user) {
      user = await User.create({
        name: userData.name ? userData.name : userData.login,
        email,
        password: "",
        username: userData.login,
        location: userData.location,
        socialOnly: true,
        avatarUrl: userData.avatar_url, 
      });
    }
    // Session에 정보 추가
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");

  } else {
    return res.redirect("/login");
  }
}