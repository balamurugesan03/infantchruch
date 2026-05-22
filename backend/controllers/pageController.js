const Page = require('../models/Page');

// GET /api/pages/:slug
const getPage = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    res.json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/pages/:slug  [admin]
const updatePage = async (req, res) => {
  try {
    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body, updatedAt: Date.now() },
      { new: true, upsert: true, runValidators: true }
    );
    res.json({ success: true, data: page });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET /api/pages  [admin - list all]
const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find({});
    res.json({ success: true, data: pages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getPage, updatePage, getAllPages };
