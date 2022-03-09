import User from "../models/User";

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

  await User.create({
    name,
    email,
    password,
    username,
    location
  });
  return res.render("join", { pageTitle });
};

export const login = (req, res) => res.send("Login user");

export const logout = (req, res) => res.send("Logout user");

export const profile = (req, res) => res.send("User profile");

export const edit = (req, res) => res.send("Edit user");

export const deleteUser = (req, res) => res.send("Delete user");