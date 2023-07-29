const express = require("express");
const dotenv = require("dotenv");
const { PORT, MONGO_URI_PASSWORD } = dotenv.config().parsed;
const app = express();
const router = require("./routes/users");
const notFound = require("./middlewares/not-found");
const connectDB = require("./db/users");
const url = `mongodb+srv://nayansinghal393:${MONGO_URI_PASSWORD}@cluster0.lriltuq.mongodb.net/?retryWrites=true&w=majority`;
const cors = require("cors");

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/users", router);

// error-middlewares
app.use(notFound);

const start = async () => {
  try {
    await connectDB(url)
      .then(() => {
        console.log("DB Connected");
      })
      .catch((error) => {
        throw new Error(error.message);
      });
    app.listen(PORT, () => {
      console.log(`Server started on Port ${PORT}`);
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

start();
