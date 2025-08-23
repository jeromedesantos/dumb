import express from "express";

const app = express();
const router = express.Router();
const PORT = 3000;

type Req = express.Request;
type Res = express.Response;

interface Post {
  id: number;
  title: string;
  content: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: "Post 1",
    content: "This is post 1",
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);
app.use("*catchall", errorRoute);

router.get("/posts", readPosts);
router.post("/posts", createPosts);
router.delete("/posts/:id", deletePosts);

function readPosts(req: Req, res: Res) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return res.status(204).json({
      status: "204 No Content",
      message: "Data masih kosong!",
    });
  }

  res.status(200).json({
    status: "200 OK",
    message: "Data berhasil ditampilkan!",
    posts,
  });
}
function createPosts(req: Req, res: Res) {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Tidak ada Request body!",
    });
  }

  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Title dan Content tidak boleh kosong!",
    });
  }

  if (typeof title !== "string" || typeof content !== "string") {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Title dan Content harus berupa string!",
    });
  }

  const createdPost: Post = {
    id: posts.length + 1,
    title: title.trim(),
    content: content.trim(),
  };
  posts.push(createdPost);

  res.status(201).json({
    status: "201 Created",
    message: "Data berhasil ditambahkan!",
    createdPost,
  });
}

function deletePosts(req: Req, res: Res) {
  if (!req.params) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Tidak ada Request Params!",
    });
  }

  const id = parseInt(req.params.id);
  if (!Number.isFinite(id) || id <= 0) {
    return res
      .status(400)
      .json({ status: "400 Bad Request", message: "Format Post ID salah!" });
  }

  const findPost = posts.find((post) => post.id === id);
  if (!findPost) {
    return res
      .status(404)
      .json({ status: "404 Not Found", message: "Post tidak ditemukan!" });
  }

  const filteredPosts = posts.filter((post) => post.id !== id);
  if (!Array.isArray(posts) || posts.length == 0) {
    return res.status(204).json({
      status: "204 No Content",
      message: "Data masih kosong!",
    });
  }
  posts.splice(0, posts.length, ...filteredPosts);

  res.status(200).json({
    status: "200 OK",
    message: "Data berhasil dihapus!",
    deletedPost: findPost,
  });
}

function errorRoute(req: Req, res: Res) {
  res.status(404).json({
    status: "404 Not Found",
    message: "URL tidak ditemukan!",
  });
}

app.listen(PORT, () =>
  console.log(`
    ░█████╗░██╗░░██╗
    ██╔══██╗██║░██╔╝
    ██║░░██║█████═╝░
    ██║░░██║██╔═██╗░
    ╚█████╔╝██║░╚██╗
    ░╚════╝░╚═╝░░╚═╝`)
);
