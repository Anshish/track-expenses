//connection to db

const mongoose = require("mongoose");

const connect = mongoose.connect(
  "mongodb+srv://admin-anshish:test123@cluster0.2gzry.mongodb.net/dayfi",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

const connection = mongoose.connection;

connection.on("error", (err) => console.log(err));

connection.on("connected", () => {
  console.log("mongodb connection succesfull");
});
