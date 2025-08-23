// const express = require("express"); // node manggil express
import express from "express"; // node manggil express (ES6)

const app = express(); // manggil fungsi express
const port = 3000; // port 3000

// http method -> get
// req: client
// res: server
app.get("/", (req, res) => {
  // route get untuk manggil data
  res.send("Halo Welt! Freut Mich! Ich bin Jeremy, Wie haisse du?"); // respond dari server
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // manggil port
}); // localhost:3000
