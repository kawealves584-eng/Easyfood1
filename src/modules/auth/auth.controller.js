const service = require("./auth.service");

// POST /auth/register — cria um novo usuário
async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Nome, e-mail e senha são obrigatórios" });
  }

  try {
    const user = await service.register({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// POST /auth/login — autentica e retorna o token JWT
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
  }

  try {
    const result = await service.login({ email, password });
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

// GET /auth/me — retorna os dados do usuário autenticado
async function me(req, res) {
  try {
    const user = await service.me(req.userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = { register, login, me };
