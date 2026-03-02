const Dessert = require('../models/Dessert');
const { processImage } = require('../utils/imageProcessor');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer setup for temporary storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/tmp';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage }).single('image');

const createDessert = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: "Image upload failed" });

    try {
      const { 
        name, description, basePrice, category, 
        ingredients, allergens, servingSize, 
        variants, modifiers, imageUrl 
      } = req.body;

      let finalImage = imageUrl;
      let finalThumbnail = '';

      if (req.file) {
        const processedImages = await processImage(req.file);
        finalImage = processedImages.image;
        finalThumbnail = processedImages.thumbnail;
      }

      if (!finalImage) {
        return res.status(400).json({ message: "Please provide an image file or URL" });
      }

      const newDessert = new Dessert({
        name,
        description,
        basePrice,
        category,
        image: finalImage,
        thumbnail: finalThumbnail || finalImage,
        ingredients,
        allergens,
        servingSize,
        variants: JSON.parse(variants || '[]'),
        modifiers: JSON.parse(modifiers || '[]')
      });

      await newDessert.save();
      res.status(201).json(newDessert);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};

const getDesserts = async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = {};
    if (category) query.category = category;
    if (featured) query.isFeatured = featured === 'true';

    const desserts = await Dessert.find(query).lean();
    res.json(desserts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDessertById = async (req, res) => {
  try {
    const dessert = await Dessert.findById(req.params.id);
    if (!dessert) return res.status(404).json({ message: "Dessert not found" });
    res.json(dessert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateDessert = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: "Image upload failed" });

    try {
      const { 
        name, description, basePrice, category, 
        ingredients, allergens, servingSize, 
        variants, modifiers, imageUrl 
      } = req.body;

      let updateData = {
        name, description, basePrice, category,
        ingredients, allergens, servingSize,
        variants: JSON.parse(variants || '[]'),
        modifiers: JSON.parse(modifiers || '[]')
      };

      if (req.file) {
        const processedImages = await processImage(req.file);
        updateData.image = processedImages.image;
        updateData.thumbnail = processedImages.thumbnail;
      } else if (imageUrl) {
        updateData.image = imageUrl;
        updateData.thumbnail = imageUrl;
      }

      const dessert = await Dessert.findByIdAndUpdate(req.params.id, updateData, { new: true });
      res.json(dessert);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};

const deleteDessert = async (req, res) => {
  try {
    await Dessert.findByIdAndDelete(req.params.id);
    res.json({ message: "Dessert deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createDessert, getDesserts, getDessertById, updateDessert, deleteDessert };
