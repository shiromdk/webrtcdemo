
const webRoutes = require("./web");


module.exports = app => {
  app.use("/", webRoutes);
};
