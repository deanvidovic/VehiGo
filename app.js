// importi
const express = require("express");
const mongoose = require("mongoose");



// routes
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const workerRoutes = require("./routes/workerRoutes");
// middlewares
const cookieParser = require("cookie-parser");
const { checkUser } = require("./middleware/authMiddleware");
const { isAdmin } = require('./middleware/workerMiddleware');

// ============================================================================

const app = express();
const dbURI =
  "mongodb+srv://admin:vehigoadmin@vehigo.yluvl2q.mongodb.net/VehiGo?retryWrites=true&w=majority";

app.use(express.static("public"));
app.use(express.json()); // pretvara json objekt koji dolazi s requestom u js objekt
app.use(cookieParser());

app.set("view engine", "ejs");

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000, () => {
      console.log("server je pokrenut na portu 3000");
    });
    console.log("baza je uspjesno spojena!");
  })
  .catch((err) => {
    console.log(err);
  });

// routes
app.get("*", checkUser);
app.get("/", isAdmin, (req, res) => {
  res.render("index");
});

app.use(authRoutes);
app.use(workerRoutes);
app.use(carRoutes);
app.use(aboutRoutes);
