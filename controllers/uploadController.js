const fs = require('fs');
const path = require('path');
const multer = require('multer');

const worksFilePath = path.join(__dirname, '../works.json');
const uploadsDir = path.join(__dirname, '../uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = {
    upload,

    getAllWorks: (req, res) => {
        fs.readFile(worksFilePath, (err, data) => {
            if (err) {
                return res.status(500).send('Error reading works file');
            }
            res.send(JSON.parse(data));
        });
    },

    uploadWork: (req, res) => {
        const newWork = {
            title: req.body.title,
            description: req.body.description,
            link: req.body.link,
            category: req.body.category,
            imageUrl: req.body.imageUrl
        };

        fs.readFile(worksFilePath, (err, data) => {
            if (err) {
                return res.status(500).send('Error reading works file');
            }
            const works = JSON.parse(data);
            works.push(newWork);
            fs.writeFile(worksFilePath, JSON.stringify(works, null, 2), (err) => {
                if (err) {
                    return res.status(500).send('Error writing to works file');
                }
                res.send('Work uploaded successfully');
            });
        });
    },

    uploadFile: (req, res) => {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        res.json({ fileUrl: `/uploads/${req.file.filename}` });
    },

    deleteWork: (req, res) => {
        const { title } = req.body;
        fs.readFile(worksFilePath, (err, data) => {
            if (err) {
                return res.status(500).send('Error reading works file');
            }
            let works = JSON.parse(data);
            works = works.filter(work => work.title !== title);
            fs.writeFile(worksFilePath, JSON.stringify(works, null, 2), (err) => {
                if (err) {
                    return res.status(500).send('Error writing to works file');
                }
                res.send('Work deleted successfully');
            });
        });
    }
};