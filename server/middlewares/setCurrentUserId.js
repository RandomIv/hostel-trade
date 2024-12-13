const setCurrentUserId = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

export default setCurrentUserId;
