require("./DB/config");
const express = require("express");
const cors = require("cors");
const User = require("./DB/User");

const app = express();

app.use(express.json());

app.use(cors());

app.post("/reserve", async (req, resp) => {
  const user = new User(req.body);
  let data = await user.save();
  resp.send(data);
});

app.get("/bookings", async (req, resp) => {
  let user = await User.find();
  if (user.length) {
    resp.send(user);
  } else {
    resp.send({ result: "NO BOOKING !!!" });
  }
});

app.delete("/delete/:id", async (req, resp) => {
  const result = await User.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.listen(4000);
