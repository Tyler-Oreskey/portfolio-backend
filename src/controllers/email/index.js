const route = require("../../routes/email");

module.exports = (router) => {
  return [
    router.get("/sendEmail", route.sendEmail)
  ];
};