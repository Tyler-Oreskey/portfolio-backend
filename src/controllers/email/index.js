const route = require("../../routes/email");

module.exports = (router) => {
  return [
    router.post("/sendEmail", route.sendEmail)
  ];
};