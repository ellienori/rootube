import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({createdAt: -1});
  return res.render("home", { pageTitle: "Home", videos });
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  if(keyword) {
    const videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      }
    });
    return res.render("search", { pageTitle: "Search", videos });
  }
  return res.render("search", { pageTitle: "Search" });
};

export const getUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch(error) {
    console.log(`postUpdate error: ${error}`);
    return res.render("videos/upload", { pageTitle: "Upload", errorMsg: error._message });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const video = Video.exists({_id: id});
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  await Video.findByIdAndRemove(id);
  return res.redirect("/");
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  return res.render("videos/watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  return res.render("videos/edit", { pageTitle: "Edit video", video })
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = Video.exists({_id: id});
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  await Video.findByIdAndUpdate(id, {
    title, description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect("/");
};