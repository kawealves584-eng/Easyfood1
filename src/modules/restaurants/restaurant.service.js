const prisma = require("../../database/prisma");

// Regras de negócio dos restaurantes (acesso ao banco via Prisma)

async function listRestaurants() {
  return prisma.restaurant.findMany();
}

async function createRestaurant({ name, category, rating }) {
  return prisma.restaurant.create({
    data: {
      name,
      category,
      rating: rating || 0,
    },
  });
}

async function deleteRestaurant(id) {
  return prisma.restaurant.delete({
    where: { id: Number(id) },
  });
}

module.exports = {
  listRestaurants,
  createRestaurant,
  deleteRestaurant,
};
