export const trending = (req, res) => {
  const videos = [{
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 3,
    },
    {
      title: "Second Video",
      rating: 3,
      comments: 92,
      createdAt: "7 days ago",
      views: 1059,
      id: 2,
    },
    {
      title: "Third Video",
      rating: 5,
      comments: 825,
      createdAt: "a month ago",
      views: 6577,
      id: 1,
    }];
  return res.render("home", { pageTitle: "Home", videos });
};

export const search = (req, res) => res.send("Search video");

export const upload = (req, res) => res.send("Upload video");

export const deleteVideo = (req, res) => res.send("Delete video");

export const watch = (req, res) => {
  const { id } = req.params;
  console.log(id);
  return res.render("videos/watch.pug", { pageTitle: "Watch" });
};

export const edit = (req, res) => res.send("Edit video");