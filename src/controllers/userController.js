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
    req.flash("info", "Please Log in 😄");
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
    req.flash("error", "An accout with this username doen not exist.");
    return res.status(400).redirect("/login");
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    req.flash("error", "Wrong Password!");
    return res.status(400).redirect("/login");
  }
  // Session에 정보 추가
  req.session.loggedIn = true;
  req.session.user = user;
  req.flash("info", `Hello, ${user.name} 💜`);
  return res.redirect("/");
};

export const logout = (req, res) => {
  // req.session.destroy();
  req.session.loggedIn = false;
  req.session.user = null;
  res.locals.loggedInUser = req.session.user;
  req.flash("info", "Bye bye 🎈");
  return res.redirect("/");
};

export const profile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "videos",
    populate: {
      path: "owner",
      model: "User",
    }
  });
  if (!user) {
    return res.status(404).render("404", { pageTitle: "Error", errorMsg: "User Not Found." });
  }
  return res.render("users/profile", { pageTitle: user.name, user});
};

export const getEdit = (req, res) => {
  return res.render("users/edit", { pageTitle: "Edit" });
};

export const postEdit = async (req, res) => {
  const pageTitle = "Edit";
  const {
    session: { 
      user: {
        _id, avatarUrl,
        username: _username,
        email: _email,
      }
    },
    body: { name, email, username, location },
    file,
  } = req;

  if (email !== _email) {
    const exist = await User.exists({email});
    if (exist) {
      return res.status(400).render("users/edit", { pageTitle, errorMsg: "This email is already taken."});
    }
  }
  if (username !== _username) {
    const exist = await User.exists({username});
    if (exist) {
      return res.status(400).render("users/edit", { pageTitle, errorMsg: "This username is already taken."});
    }
  }
  const user = await User.findByIdAndUpdate(_id, {
    name, email, username, location,
    avatarUrl: file ? file.path : avatarUrl,
  }, { new: true });
  req.session.user = user;
  req.flash("ifno", "Updated!");
  return res.redirect("edit");
};

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

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly) {
    req.flash("error", "You can't change the password because you logged in with github.");
    return res.redirect("/");
  }
  return res.render("users/change-password", { pageTitle: "Change password"});
}

export const postChangePassword = async (req, res) => {
  const pageTitle = "Change Password";
  const {
    session: { 
      user: { _id, }
    },
    body: { currentPassword, password, password2 }
  } = req;

  const user = await User.findById(_id);

  const ok = await bcrypt.compare(currentPassword, user.password);
  if (!ok) {
    return res.status(400).render("users/change-password", { pageTitle, errorMsg: "Current password is incorrect." });
  }
  if (password !== password2) {
    return res.status(400).render("users/change-password", { pageTitle, errorMsg: "Password confirmation is not matched."});
  }

  user.password = password;
  await user.save(); // pre("save)") -> hash in middleware
  req.flash("info", "Your password is updated.");
  return res.redirect("/users/logout");
}