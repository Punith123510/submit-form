// server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;


// Connect to MongoDB
mongoose.connect('mongodb+srv://punithbh:dKC2ZgMSJv4PEvwd@cluster0.2ysulg2.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a schema and model for the form data
const formDataSchema = new mongoose.Schema({
  data: String,
});
const FormData = mongoose.model('FormData', formDataSchema);

app.use(express.json());

//var cors = require(cors());
//app.use(cors());
//app.options('*',cors());
var allowCrossDomain = function(req,res,next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();  
}
app.use(allowCrossDomain);

app.post('/submit-form', async (req, res) => {
  try {
    const { data } = req.body;
    const formData = new FormData({ data });
    await formData.save();
    res.status(201).json({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
