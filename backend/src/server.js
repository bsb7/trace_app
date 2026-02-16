import express from "express";

const app = express();
const PORT = 3000;

app.get("/notes", (req, res) => {
  res.status(200).send(`This is the GET ROUTE`);
});
app.post("/notes/", (req, res) => {
  res.status(200).send(`This is the POST ROUTE`);
});
app.put("/notes/:id", (req, res) => {
  res.status(200).send(`This is the UPDATE ROUTE`);
});
app.delete("/notes/:id", (req, res) => {
  res.status(200).send(`This is the DELETE ROUTE`);
});
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
