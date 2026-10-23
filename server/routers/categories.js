const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const categoriesPath = path.join(__dirname, '../data/categories.json');
const productsPath = path.join(__dirname, '../data/products.json');

// Helper function to get category name from path
function getCategorySlug(path) {
  return path.split('/').pop();
}

// GET all categories with product counts
router.get('/', async (req, res) => {
  try {
    const [categoriesData, productsData] = await Promise.all([
      fs.readFile(categoriesPath, 'utf8'),
      fs.readFile(productsPath, 'utf8')
    ]);

    const categories = JSON.parse(categoriesData);
    const products = JSON.parse(productsData);

    // Count products for each category
    const categoriesWithCounts = categories.map(category => {
      const slug = getCategorySlug(category.path);
      const count = products.filter(p => p.category === slug).length;
      return {
        ...category,
        count: `${count} ${count === 1 ? 'товар' : count > 1 && count < 5 ? 'товара' : 'товаров'}`
      };
    });

    res.json(categoriesWithCounts);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при чтении категорий' });
  }
});

// GET category by id
router.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(categoriesPath, 'utf8');
    const categories = JSON.parse(data);
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при чтении категории' });
  }
});

// POST create category
router.post('/', async (req, res) => {
  try {
    const data = await fs.readFile(categoriesPath, 'utf8');
    const categories = JSON.parse(data);
    const newCategory = {
      id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
      ...req.body
    };
    // Remove count from request body as it will be calculated dynamically
    delete newCategory.count;
    categories.push(newCategory);
    await fs.writeFile(categoriesPath, JSON.stringify(categories, null, 2));
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании категории' });
  }
});

// PUT update category
router.put('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(categoriesPath, 'utf8');
    const categories = JSON.parse(data);
    const index = categories.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }
    // Remove count from request body as it will be calculated dynamically
    const { count, ...updateData } = req.body;
    categories[index] = { ...categories[index], ...updateData };
    await fs.writeFile(categoriesPath, JSON.stringify(categories, null, 2));
    res.json(categories[index]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении категории' });
  }
});

// DELETE category
router.delete('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(categoriesPath, 'utf8');
    const categories = JSON.parse(data);
    const index = categories.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }
    categories.splice(index, 1);
    await fs.writeFile(categoriesPath, JSON.stringify(categories, null, 2));
    res.json({ message: 'Категория удалена' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении категории' });
  }
});

module.exports = router;
