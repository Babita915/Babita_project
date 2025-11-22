const { registerService,  loginService } = require('../services/auth.service');
const { registerValidator, loginValidator } = require('../validation/auth.validation');

const validate = (schema, obj) => {
  const { error } = schema.validate(obj);
  if (error) throw Object.assign(new Error(error.details[0].message), { status: 400 });
};

const register = async (req, res) => {
  validate(registerValidator, req.body);
  const data = await registerService(req.body);
  res.status(201).json({ user: data.user, token: data.token });
};

const login = async (req, res) => {
  validate(loginValidator, req.body);
  const data = await loginService(req.body);
  res.json({ user: data.user, token: data.token });
};

module.exports = { register, login };
