const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    date: { type: Date, required: true },
    time: { type: String, default: '' },
    location: { type: String, default: 'Church Premises' },
    category: {
      type: String,
      enum: ['mass', 'festival', 'prayer', 'community', 'other'],
      default: 'other',
    },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
