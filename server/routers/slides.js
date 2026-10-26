const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { requireRole } = require('../auth');

const router = express.Router();
const slidesPath = path.join(__dirname, '../data/slides.json');
const contentAccess = requireRole('owner', 'manager', 'content');

// GET all slides
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(slidesPath, 'utf8');
    const slides = JSON.parse(data);
    res.json(slides);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при чтении слайдов' });
  }
});

// GET slide by id
router.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(slidesPath, 'utf8');
    const slides = JSON.parse(data);
    const slide = slides.find(s => s.id === parseInt(req.params.id));
    if (!slide) {
      return res.status(404).json({ error: 'Слайд не найден' });
    }
    res.json(slide);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при чтении слайда' });
  }
});

// POST create slide
router.post('/', contentAccess, async (req, res) => {
  try {
    const data = await fs.readFile(slidesPath, 'utf8');
    const slides = JSON.parse(data);
    const newSlide = {
      id: slides.length > 0 ? Math.max(...slides.map(s => s.id)) + 1 : 1,
      ...req.body
    };
    slides.push(newSlide);
    await fs.writeFile(slidesPath, JSON.stringify(slides, null, 2));
    res.status(201).json(newSlide);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании слайда' });
  }
});

// PUT update slide
router.put('/:id', contentAccess, async (req, res) => {
  try {
    const data = await fs.readFile(slidesPath, 'utf8');
    const slides = JSON.parse(data);
    const index = slides.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'Слайд не найден' });
    }
    slides[index] = { ...slides[index], ...req.body };
    await fs.writeFile(slidesPath, JSON.stringify(slides, null, 2));
    res.json(slides[index]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении слайда' });
  }
});

// DELETE slide
router.delete('/:id', contentAccess, async (req, res) => {
  try {
    const data = await fs.readFile(slidesPath, 'utf8');
    const slides = JSON.parse(data);
    const index = slides.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'Слайд не найден' });
    }
    slides.splice(index, 1);
    await fs.writeFile(slidesPath, JSON.stringify(slides, null, 2));
    res.json({ message: 'Слайд удален' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении слайда' });
  }
});

module.exports = router;
