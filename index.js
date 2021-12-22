const dotenv = require("dotenv");
dotenv.config();
require("./passport");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
// const { MONGO_URL, APP_PORT } = process.env;

// middlewares
app.use(express.json());
app.use(morgan("common"));
// app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:5000",
//     method: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );
app.set("trust proxy", true);
app.use(
  cookieSession({
    name: "session",
    keys: ["mykey"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const recordRoutes = require("./routes/records");
const questionRoutes = require("./routes/questions");
const commentRoutes = require("./routes/comments");

// Create mongo connection
mongoose.connect(
  "mongodb+srv://pawan:pawanbhai@cluster0.mqngs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  () => console.log("Connected to DB!")
);

app.get("/", (req, res) => {
  res.send("Hello from My-Health-Solution");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/comments", commentRoutes);

app.listen(8080, "0.0.0.0", () => console.log(`Server started on port 5000`));
