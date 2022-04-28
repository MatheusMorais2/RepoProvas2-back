import app from "./app.js";

app.listen(process.env.PORT, () => {
  console.log("Express server listening on port " + process.env.PORT);
});
