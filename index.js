const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
// const { MONGO_URL, APP_PORT } = process.env;
const Grid = require("gridfs-stream");
const path = require("path");

// middlewares
app.use(express.json());
app.use(morgan("common"));
app.use(cors());

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

app.listen(5000, () => console.log(`Server started on port 5000`));
