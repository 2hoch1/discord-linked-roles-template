import express from "express";
import cors from "cors";
const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.get("/", (req, res) => {
  res.send("👋");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
