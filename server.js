const express = require("express");
const dbConnect = require("./dbConnect"); // connection string
const app = express();
app.use(express.json()); // with this we parse the data
// send by user. Helps to destructure the data
const path = require("path");
const userRoute = require("./routes/usersRoute"); // import user routes
const transactionsRoute = require("./routes/transactionsRoute");

app.use("/api/users/", userRoute); // whenever we get requests
// coming to /api/users/ we send them to routes
app.use("/api/transactions/", transactionsRoute);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
