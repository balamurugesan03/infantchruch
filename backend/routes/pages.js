const express = require('express');
const router = express.Router();
const { getPage, updatePage, getAllPages } = require('../controllers/pageController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAllPages);
router.get('/:slug', getPage);
router.put('/:slug', protect, updatePage);

module.exports = router;
