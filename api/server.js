require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer Storage Setup (Uploads to Cloudinary)
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio_uploads',
        resource_type: 'auto',  // ✅ Allows both images & videos
        allowed_formats: ['jpg', 'jpeg', 'png', 'mp4', 'mov', 'avi']
    }
});
const upload = multer({ storage });


// Define MongoDB Schema & Model
const WorkSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String,
    category: String,
    imageUrl: String
});
const Work = mongoose.model('Work', WorkSchema);

// 🟢 Get All Works
app.get('/works', async (req, res) => {
    try {
        const works = await Work.find();
        res.json(works);
    } catch (err) {
        res.status(500).send('Error fetching works');
    }
});

// 🟢 Upload Work (Image Goes to Cloudinary)
app.post('/upload-work', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        const newWork = new Work({
            title: req.body.title,
            description: req.body.description,
            link: req.body.link,
            category: req.body.category,
            imageUrl: req.file.path // ✅ Cloudinary URL
        });

        await newWork.save();
        res.send('Work uploaded successfully');
    } catch (err) {
        res.status(500).send('Error uploading work');
    }
});


// 🟢 Delete a Work and Its Image
app.delete('/delete-work', async (req, res) => {
    try {
        const { title } = req.body;
        const work = await Work.findOneAndDelete({ title });

        if (work) {
            // Delete image from Cloudinary
            const publicId = work.imageUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        res.send('Work deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting work');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
