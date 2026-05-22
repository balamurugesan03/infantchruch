const express = require('express');
const router = express.Router();
const {
  getGallery,
  getAllGallery,
  addImage,
  updateImage,
  deleteImage,
} = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getGallery);
router.get('/admin', protect, getAllGallery);
router.post('/', protect, upload.single('image'), addImage);
router.put('/:id', protect, updateImage);
router.delete('/:id', protect, deleteImage);

module.exports = router;
