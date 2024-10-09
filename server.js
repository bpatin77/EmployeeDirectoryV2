const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello employees!");
});


//We are making an Express router and exporting it
app.use("/employees", require("./api/employees"));

// 404
app.use((req, res, next) => {
  next({ status: 404, message: "Endpoint not found" });
});

// Default error handler
app.use((err, req, res, next) => {
  res.status(err.status ?? 500);
  res.json(err.message ?? "Sorry, something went wrong!");
});

app.listen(PORT, () => {
  `Listening on port ${PORT}...`;
});
