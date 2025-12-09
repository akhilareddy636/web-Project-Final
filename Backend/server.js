import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Needed for ES modules (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve portfolio from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Default route to portfolio homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==== FIXED: No duplicate mongoose import ====
// Use environment variable from Render
const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection (correct for ESM)
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Schema & Model
const weatherSchema = new mongoose.Schema({
  id: Number,
  location: String,
  temperature: Number,
  weatherCondition: String,
  forecast: String
});

const Weather = mongoose.model('Weather', weatherSchema);

// API endpoint
app.get('/api/', async (req, res) => {
  try {
    const data = await Weather.find();
    res.json({ weather: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server (Render uses process.env.PORT)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
