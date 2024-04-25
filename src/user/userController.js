const createUser = (req, res, next) => {
  const { name, password, email } = req.body;

  // validation
  if (!name || !password || !email) {
    const error = new Error("All fields Are REQuired");
    return next(error);
  }
  
  res.json({
    message: "user created",
  });
};

export { createUser };
