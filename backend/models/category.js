const mongoose = require('mongoose');
const slugify = require('slugify'); // Optional: for automatically generating slugs

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

// Optional: Automatically generate slug from name before saving
categorySchema.pre('validate', function(next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);
