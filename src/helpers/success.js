const successHandler = (res, message) => {
  if (!message) {
    message = 'Action Completed Successfully!';
  }

  return res.status(200).json({
    status: 'success',
    statusCode: 200,
    message
  });
};

module.exports = { successHandler };