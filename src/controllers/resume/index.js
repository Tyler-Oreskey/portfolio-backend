const route = require("../../routes/resume");

module.exports = (router) => {
  return [
    router.get("/getPDF", route.getPDF)
  ];
};