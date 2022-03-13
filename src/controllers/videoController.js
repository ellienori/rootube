import User from "../models/User";
import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({createdAt: -1}).populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if(keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      }
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const getUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: {
      title, description, hashtags
    },
    file,
    session: {
      user: { _id },
    }
  } = req;
  try {
    const newVideo = await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      fileUrl: file.path,
      owner: _id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch(error) {
    console.log(`postUpdate error: ${error}`);
    return res.render("videos/upload", { pageTitle: "Upload", errorMsg: error._message });
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
    session: { user: { _id } },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  console.log(video.owner, _id);
  if (String(video.owner) !== String(_id)) {
    return res.status(403).render("404", { pageTitle: "You are not the owner of video."});
  }
  await Video.findByIdAndRemove(id);
  return res.redirect("/");
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  return res.render("videos/watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const {
    params: { id },
    session: { user: { _id } },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(400).render("404", { pageTitle: "You are not the owner of video."});
  }
  return res.render("videos/edit", { pageTitle: "Edit video", video })
};

export const postEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, description, hashtags },
    session: { user: { _id } },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(400).render("404", { pageTitle: "You are not the owner of video."});
  }
  await Video.findByIdAndUpdate(id, {
    title, description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect("/");
};