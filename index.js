var express = require('express');
var cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose');
var app = express();
var multer = require('multer');// Middleware for handling multipart form data
const upload = multer({ dest: 'uploads/' }); // Specify the directory where uploaded 

mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));



app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));



app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // File has been uploaded and stored in the specified directory
  // Access the uploaded file information using req.file object
  const uploadedFile = req.file;
  if (!uploadedFile) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({
    name: uploadedFile.originalname,
    type: uploadedFile.mimetype,
    size: uploadedFile.size
  });
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
