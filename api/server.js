const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const worksFilePath = './works.json';
const uploadsDir = path.join(__dirname, 'uploads');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// 🟢 Get all works
app.get('/works', (req, res) => {
    fs.readFile(worksFilePath, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading works file');
        }
        res.send(JSON.parse(data));
    });
});

// 🟢 Upload a Work (With File Upload)
app.post('/upload-work', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const newWork = {
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        category: req.body.category,
        imageUrl: `/uploads/${req.file.filename}`  // Save file path
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
});

// 🟢 Upload a File (Drag & Drop or File Picker)
app.post('/upload-file', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    res.json({ fileUrl: `/uploads/${req.file.filename}` });
});

// 🟢 Delete a Work (Delete Only One Work and Its File)
app.delete('/delete-work', express.json(), (req, res) => {
    const { title } = req.body;

    fs.readFile(worksFilePath, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading works file');
        }

        let works = JSON.parse(data);
        const workToDelete = works.find(work => work.title === title);

        if (!workToDelete) {
            return res.status(404).send('Work not found');
        }

        // Remove the work from the JSON file
        works = works.filter(work => work.title !== title);

        fs.writeFile(worksFilePath, JSON.stringify(works, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing to works file');
            }

            // Delete the associated file (if exists)
            if (workToDelete.imageUrl) {
                const filePath = path.join(__dirname, workToDelete.imageUrl);
                fs.unlink(filePath, (err) => {
                    if (err && err.code !== 'ENOENT') {
                        console.error('Error deleting file:', err);
                    }
                });
            }

            res.send('Work deleted successfully');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
