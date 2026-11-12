const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./auth.service");

// Protege rotas exigindo um token JWT válido no cabeçalho Authorization
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.sub;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}

module.exports = { authenticate };
