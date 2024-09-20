const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const fs = require("fs");
const path = require("path");

const app = new Koa();
app.use(bodyParser());

// 动态加载路由文件
const routesPath = path.join(__dirname, "routes");
fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith(".js")) {
    const route = require(path.join(routesPath, file));
    app.use(route.routes()).use(route.allowedMethods());
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
