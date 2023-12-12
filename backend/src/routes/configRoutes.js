const indexR = require("./index");
const userR = require("./userRoutes");

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",userR);
 
  app.use("*",(req,res) => {
    res.status(404).json({msg: "endpoint not found 404", error: 404})
  })
}