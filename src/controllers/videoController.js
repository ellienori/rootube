let videos = [
  {
    title: "What a wonderful day 💚",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 0,
  },
  {
    title: "Can you imagine?",
    rating: 3,
    comments: 92,
    createdAt: "7 days ago",
    views: 1059,
    id: 1,
  },
  {
    title: "Dacing with the moonlight",
    rating: 5,
    comments: 825,
    createdAt: "a month ago",
    views: 6577,
    id: 2,
  }
];

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};

export const search = (req, res) => res.send("Search video");

export const getUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: "Upload" });
};

export const postUpload = (req, res) => {
  const { title } = req.body;
  const length = videos.length;
  videos.push({
    title,
    rating: 0,
    comments: 0,
    createdAt: "a minitue ago",
    views: 0,
    id: length,
  });
  return res.redirect("/");
};

export const deleteVideo = (req, res) => res.send("Delete video");

export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("videos/watch", { pageTitle: "Watch", video: videos[id] });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("videos/edit", { pageTitle: "Edit video", video: videos[id] })
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  console.log(title);
  videos[id].title = title;
  return res.redirect("/");
};