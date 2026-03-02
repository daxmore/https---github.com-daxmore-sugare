const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

const processImage = async (file) => {
  const fileName = path.parse(file.filename).name;
  const uploadDir = path.join(__dirname, '../uploads');
  const heroPath = path.join(uploadDir, `${fileName}-hero.webp`);
  const thumbPath = path.join(uploadDir, `${fileName}-thumb.webp`);

  // Ensure upload directory exists
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (err) {
    console.error('Error creating upload directory', err);
  }

  // Create Hero Image (High Quality WebP)
  await sharp(file.path)
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .toFormat('webp')
    .webp({ quality: 80 })
    .toFile(heroPath);

  // Create Thumbnail (Small WebP)
  await sharp(file.path)
    .resize(400, 400, { fit: 'cover' })
    .toFormat('webp')
    .webp({ quality: 60 })
    .toFile(thumbPath);

  // Clean up original file
  try {
    await fs.unlink(file.path);
  } catch (err) {
    console.error('Error deleting original file', err);
  }

  return {
    image: `/uploads/${fileName}-hero.webp`,
    thumbnail: `/uploads/${fileName}-thumb.webp`
  };
};

module.exports = { processImage };
