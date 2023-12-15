import database from "./database.js";

const signupController = async (req, res) => {
  try {
    const user = req.body;
    const request = await database.createUser(user);
    console.log(request + "1");
    res.status(200).json({...user, success: true});
  } catch (err) {
    res.status(409).json({ error: err });
  }
};

const loginController = async (req, res) => {
  try {
    const user = req.body;
    const isUser = await database.getUserByEmail(user.email);
    await database.comparePassword(
      user.password,
      isUser
    );
      res.status(200).json({ user: isUser, success: true });
  } catch (err) {
    res.status(409).json({ error: err });
  }
};

const controller = {
  signupController,
  loginController,
};

export default controller;
