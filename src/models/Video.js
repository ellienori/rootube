import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {type: String, required: true, trim: true},
  description: {type: String, required: true},
  createdAt: {type: Date, default: Date.now, required: true},
  hashtags: [{ type: String, required: true }], // array
  meta: {
    views: {type: Number, default: 0, required: true},
    rating: {type: Number, default: 0, required: true},
  },
});

videoSchema.static('formatHashtags', function(hashtags) {
  return hashtags.split(",").filter((word) => {
    if (!word.trim()) {
      return false;
    }
    return true;
  })
    .map(word => word.trim().startsWith("#") ? word.trim() : `#${word.trim()}`);
});
const Video = mongoose.model("Video", videoSchema);

export default Video;