const Gallery = require('../models/Gallery');
const fs = require('fs');
const path = require('path');

// GET /api/gallery
const getGallery = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isPublished: true };
    if (category && category !== 'all') filter.category = category;
    const images = await Gallery.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/gallery/admin  [admin - all including unpublished]
const getAllGallery = async (req, res) => {
  try {
    const images = await Gallery.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/gallery  [admin]
const addImage = async (req, res) => {
  try {
    const { title, description, category, order } = req.body;
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    const image = await Gallery.create({ title, description, category, order, imageUrl });
    res.status(201).json({ success: true, data: image });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/gallery/:id  [admin]
const updateImage = async (req, res) => {
  try {
    const image = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!image) return res.status(404).json({ success: false, message: 'Image not found' });
    res.json({ success: true, data: image });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/gallery/:id  [admin]
const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ success: false, message: 'Image not found' });

    // Remove file from disk
    const filePath = path.join(__dirname, '..', image.imageUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await image.deleteOne();
    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getGallery, getAllGallery, addImage, updateImage, deleteImage };
