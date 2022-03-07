export const trending = (req, res) => res.send("Home");

export const search = (req, res) => res.send("Search video");

export const upload = (req, res) => res.send("Upload video");

export const deleteVideo = (req, res) => res.send("Delete video");

export const watch = (req, res) => {
  const { id } = req.params;
  console.log(id);
  return res.send("Watch video");
};

export const edit = (req, res) => res.send("Edit video");