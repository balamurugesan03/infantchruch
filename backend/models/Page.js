const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const pageSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      enum: ['home', 'about', 'introduction', 'church-intro'],
    },
    heroTitle: { type: String, default: '' },
    heroSubtitle: { type: String, default: '' },
    heroImage: { type: String, default: '' },
    sections: [sectionSchema],
    massTimes: [
      {
        day: String,
        time: String,
        language: String,
      },
    ],
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Page', pageSchema);
