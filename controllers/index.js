module.exports = (router) => {
  return [
    router.use('/resume', require('./resume')(router)),
    router.use('/email', require('./email')(router))
  ];
};