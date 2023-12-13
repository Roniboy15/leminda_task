const indexR = require("./index");
const userR = require("./userRoutes");
const questionsR = require("./questionsRoutes");
const responsesR = require("./responsesRoutes");

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", userR);
  app.use("/questions", questionsR);
  app.use("/responses", responsesR);
 
  app.use("*",(req,res) => {
    res.status(404).json({msg: "endpoint not found 404", error: 404})
  })
}