const service = require("./restaurant.service");

// GET /restaurants — lista todos os restaurantes
async function index(req, res) {
  try {
    const restaurants = await service.listRestaurants();
    res.json(restaurants);
  } catch (error) {
    console.error("Erro ao buscar restaurantes:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// POST /restaurants — cadastra um novo restaurante
async function store(req, res) {
  const { name, category, rating } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: "Nome e categoria são obrigatórios" });
  }

  try {
    const restaurant = await service.createRestaurant({ name, category, rating });
    res.status(201).json(restaurant);
  } catch (error) {
    console.error("Erro ao cadastrar restaurante:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// DELETE /restaurants/:id — remove um restaurante pelo ID
async function destroy(req, res) {
  try {
    await service.deleteRestaurant(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao remover restaurante:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

module.exports = { index, store, destroy };
