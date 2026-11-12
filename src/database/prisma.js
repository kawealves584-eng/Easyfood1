const { PrismaClient } = require("@prisma/client");

// Instância única do Prisma Client reutilizada por toda a aplicação
const prisma = new PrismaClient();

module.exports = prisma;
