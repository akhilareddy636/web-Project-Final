import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// MongoDB connection
const MONGO_URI = 'mongodb+srv://akhilaavuldapuram_db_user:26Qn5OcJNPQujluv@cluster0.ns5hb7y.mongodb.net/?appName=Cluster0';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


const weatherSchema = new mongoose.Schema({
  id: Number,
  location: String,
  temperature: Number,
  weatherCondition: String,
  forecast: String
});

const Weather = mongoose.model('Weather', weatherSchema);


app.get('/api/', async (req, res) => {
  try {
    const data = await Weather.find();
    res.json({ weather: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
