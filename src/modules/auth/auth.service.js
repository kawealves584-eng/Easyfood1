const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../../database/prisma");

const JWT_SECRET = process.env.JWT_SECRET || "troque-por-uma-chave-longa-e-aleatoria";
const JWT_EXPIRES_IN = "1d";

// Cadastra um novo usuário com a senha criptografada
async function register({ name, email, password }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("E-mail já cadastrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return { id: user.id, name: user.name, email: user.email };
}

// Valida credenciais e retorna um token JWT
async function login({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Credenciais inválidas");
  }

  const token = jwt.sign({ sub: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return { token };
}

// Retorna os dados do usuário autenticado
async function me(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return { id: user.id, name: user.name, email: user.email };
}

module.exports = { register, login, me, JWT_SECRET };
