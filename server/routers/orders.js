const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const { requireAuth } = require('../auth');

const router = express.Router();
const ordersPath = path.join(__dirname, '../data/orders.json');
const productsPath = path.join(__dirname, '../data/products.json');

const ORDER_STATUSES = ['new', 'confirmed', 'delivered', 'cancelled'];

async function readJson(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeOrders(orders) {
  await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2), 'utf8');
}

function cleanText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

// POST create order (public - customers are not authenticated)
router.post('/', async (req, res) => {
  try {
    const { productId } = req.body || {};
    const quantity = Number(req.body?.quantity);
    const customerName = cleanText(req.body?.customerName, 100);
    const customerPhone = cleanText(req.body?.customerPhone, 30);
    const comment = cleanText(req.body?.comment, 500);

    if (!productId) {
      return res.status(400).json({ error: 'Не указан товар' });
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ error: 'Некорректное количество' });
    }
    if (customerName.length < 2) {
      return res.status(400).json({ error: 'Укажите имя' });
    }
    if (customerPhone.replace(/\D/g, '').length < 9) {
      return res.status(400).json({ error: 'Укажите корректный номер телефона' });
    }

    const products = await readJson(productsPath);
    const product = products.find((item) => String(item.id) === String(productId));
    if (!product) {
      return res.status(404).json({ error: 'Товар не найден' });
    }

    const stock = Number(product.stock) || 0;
    if (stock <= 0) {
      return res.status(409).json({ error: 'Товара нет в наличии' });
    }
    if (quantity > stock) {
      return res.status(409).json({ error: `В наличии только ${stock} шт.` });
    }

    const orders = await readJson(ordersPath);
    const order = {
      id: crypto.randomUUID(),
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      price: product.price,
      quantity,
      total: product.price * quantity,
      customerName,
      customerPhone,
      comment,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    orders.push(order);
    await writeOrders(orders);

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Не удалось оформить заказ' });
  }
});

// GET all orders
router.get('/', requireAuth, async (req, res) => {
  try {
    const orders = await readJson(ordersPath);
    const { status } = req.query;
    const filtered = status
      ? orders.filter((order) => order.status === status)
      : orders;

    res.json(
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  } catch (error) {
    console.error('Error reading orders:', error);
    res.status(500).json({ error: 'Не удалось загрузить заказы' });
  }
});

// PATCH update order status
router.patch('/:id', requireAuth, async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!ORDER_STATUSES.includes(status)) {
      return res.status(400).json({ error: 'Некорректный статус заказа' });
    }

    const orders = await readJson(ordersPath);
    const index = orders.findIndex((order) => order.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Заказ не найден' });
    }

    orders[index] = { ...orders[index], status };
    await writeOrders(orders);

    res.json(orders[index]);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Не удалось обновить заказ' });
  }
});

// DELETE order
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const orders = await readJson(ordersPath);
    const index = orders.findIndex((order) => order.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Заказ не найден' });
    }

    orders.splice(index, 1);
    await writeOrders(orders);

    res.json({ message: 'Заказ удалён' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Не удалось удалить заказ' });
  }
});

module.exports = router;
